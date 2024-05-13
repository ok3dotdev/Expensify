import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

const SignUpPage = () => {
  return ( 
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">
            Welcome Back!
          </h1>
          <p className="text-[#7E8CA0] text-base">
            Log in or Create account to get back your account!
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp
              appearance={{
                elements: {
                  card: {
                    boxShadow: "none",
                    border: "1px solid #E5E7EB",
                  }
                }
              }}
            />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:block relative">
        <Image src="/login-hero.svg" fill alt="Hero" />
      </div>
    </div>
  );
};

export default SignUpPage;
