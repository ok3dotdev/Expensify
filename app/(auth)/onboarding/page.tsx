'use client';
import { UserNameForm } from '@/components/forms/UserNameForm';
import { useFormState } from '@/components/forms/FormContext';
import { PlaidLink } from '@/components/PlaidLink';
import { useAuth } from '@clerk/nextjs';

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
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }

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
