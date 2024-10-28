"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Toaster, toast } from 'sonner'
import { apiRequest } from '@/api/auth/login'; // Import the API request function

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = React.useState({
      email: "",
      password: "",
    })

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
          const response = await apiRequest('/auth/login', { 
            method: 'POST',
            data: { email: user.email, password: user.password }
          });
          console.log("Login Success", response);
          toast.success("Login Success");
          router.push("/dashboard");
        } catch (error) {
            toast.error(`${error}`);
        } finally {
          console.log("in final");
        }
              
    };
    


    return (
        <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        
        {/* Centered sign-up form container */}
        <div className="relative z-30 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Log in to your account
            </h2>
            <form className="my-8" onSubmit={onLogin}>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address<span className="text-red-500"> *</span></Label>
                <Input id="email" placeholder="" type="email" required value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password<span className="text-red-500"> *</span></Label>
                <Input id="password" placeholder="••••••••" type="password" required value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
            </LabelInputContainer>
            <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                Login &rarr;
                <BottomGradient />
            </button>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8">
            Dont have an account?
            <a href="/signup" className="text-blue-600 dark:text-blue-400 underline ml-1">Sign Up!</a> 
            </div>

            </form>
        </div>
        </div>
      );
    }
    
    const BottomGradient = () => {
        return (
          <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
          </>
        );
      };
      
      const LabelInputContainer = ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className?: string;
      }) => {
        return (
          <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
          </div>
        );
  }