'use client';
import { UserNameForm } from '@/components/forms/UserNameForm';
import { useFormState } from '@/components/forms/FormContext';
import { PlaidLink } from '@/components/PlaidLink';
import { useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null;
  }
  useEffect(() => {
    const checkIfUserHasUsername = async () => {
      if (userId) {
        try {
          // Fetch the user's data from your database. Adjust the endpoint as needed.
          const response = await fetch(`/api/user`);
          const userData = await response.json();

          // If the user has a username, redirect to the dashboard.
          if (userData && userData.name) {
            router.push('/dashboard');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    checkIfUserHasUsername();
  }, [userId, router]);

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
