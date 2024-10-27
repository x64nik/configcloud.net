"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { cn } from "@/utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { FlipWords } from "@/components/ui/flip-words";


export default function SignupPage() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    })

    const onSignup = async () => {
        
    }

    const words = ["Virtual Machines", "Docker Containers", "Databases"];
    return (
        <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Deploy
        <FlipWords words={words} /> <br />
        within few clicks on ConfigCloud
      </div>


        {/* Centered sign-up form container */}
        <div className="relative z-30 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Create your account
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Manage virtual machines with ease and scale your resources as needed.
            </p>

            <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                <Label htmlFor="username">Username<span className="text-red-500"> *</span></Label>
                <Input id="username" placeholder="" type="text" />
                </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address<span className="text-red-500"> *</span></Label>
                <Input id="email" placeholder="" type="email" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password<span className="text-red-500"> *</span></Label>
                <Input id="password" placeholder="••••••••" type="password" />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="confirmpassword">Confirm Password<span className="text-red-500"> *</span></Label>
                <Input id="confirmpassword" placeholder="••••••••" type="password" />
            </LabelInputContainer>

            <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                Sign up &rarr;
                <BottomGradient />
            </button>
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8">
            Already have an account?
            <a href="/login" className="text-blue-600 dark:text-blue-400 underline ml-1">Login</a> 
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

            {/* <div className="flex flex-col space-y-4">
                <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
                >
                <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    GitHub
                </span>
                <BottomGradient />
                </button>
                <button
                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                type="submit"
                >
                <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Google
                </span>
                <BottomGradient />
                </button>
            </div> */}
            </form>

            {/* Footer with Terms and Privacy Policy */}
            <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8">
            By signing up you agree to the 
            <a href="/terms" className="text-blue-600 dark:text-blue-400 underline ml-1">Terms of Service </a> 
            and 
            <a href="/privacy" className="text-blue-600 dark:text-blue-400 underline ml-1">Privacy Policy</a>.
            </div>
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