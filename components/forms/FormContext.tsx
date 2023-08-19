import { db } from '@/lib/db';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface IFormContext {
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
  onHandleBack: () => void;
  onHandleNext: () => void;
  addUserToDB: (username: string) => Promise<any>;
  step: number;
}

const FormContext = createContext<IFormContext>({
  formData: {},
  onHandleBack: () => {},
  onHandleNext: () => {},
  setFormData: () => {},
  addUserToDB: () => Promise.resolve(),
  step: 0,
});

interface IProps {
  children: ReactNode;
}

export function FormProvider({ children }: IProps) {
  const [formData, setFormData] = useState();
  const [step, setStep] = useState(1);

  function onHandleNext() {
    setStep((prev) => prev + 1);
  }

  function onHandleBack() {
    setStep((prev) => prev - 1);
  }

  async function addUserToDB(username) {
    try {
      const user = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          username,
        }),
      });
      return user;
    } catch (error) {
      console.error('Error adding user to database:', error);
      throw error;
    }
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        addUserToDB,
        setFormData,
        onHandleBack,
        onHandleNext,
        step,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormState() {
  return useContext(FormContext);
}
