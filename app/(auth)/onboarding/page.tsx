'use client';
import { UserNameForm } from '@/components/forms/UserNameForm';
import { useFormState } from '@/components/forms/FormContext';
import { PlaidLink } from '@/components/PlaidLink';

function ActiveStepFormComponent() {
  const { step } = useFormState();
  switch (step) {
    case 1:
      return <UserNameForm />;
    case 2:
      return <PlaidLink />;
    default:
      return null;
  }
}

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="p-6 w-full max-w-2xl  border  rounded-xl bg-white">
        <h1 className="text-center text-2xl font-semibold py-4">Onboarding</h1>
        <div className="space-y-6">
          <ActiveStepFormComponent />
        </div>
      </div>
    </main>
  );
}
