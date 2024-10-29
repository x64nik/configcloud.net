"use client";
import React, { useEffect } from "react";
import { signup } from '@/api/Signup'; // Import the API request function
import { Toaster, toast } from 'sonner'
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { cn } from "@/utils/cn";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation";

export default function SignupPage() {

    const router = useRouter();

    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
    });

    const [loading, setLoading] = React.useState(false);
    const [passwordMatch, setPasswordMatch] = React.useState(true);
    const [strongPassword, setStrongPassword] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));

        // Check password match
        if (name === "confirmpassword") {
            setPasswordMatch(value === user.password);
        }

        // Check strong password criteria
        if (name === "password") {
            setStrongPassword(validateStrongPassword(value));
        }
    };

    const validateStrongPassword = (password: string) => {
        // Simple strong password validation: at least 8 characters, including a number and a special character
        const strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validate confirm password and strong password
        if (user.password !== user.confirmpassword) {
            toast.error("Passwords do not match.");
            return;
        }
        if (!strongPassword) {
            toast.error("Password must be at least 8 characters long and include a number and a special character.");
            return;
        }

        setLoading(true); // Set loading state

        try {
            const response = await signup({ 
                username: user.username, 
                email: user.email, 
                password: user.password 
            });

            console.log("Signup successful", response);
            router.push("/login");
            toast.success("Signup successful!");
            
        } catch (error) {
            console.log("signup error", error);
            toast.error(`${error}` || "An error occurred during signup.");
            
        } finally {
            setLoading(false); // Reset loading state
        }

    };

    const words = ["Virtual Machines", "Docker Containers", "Databases"];
    
    return (
        <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
                Deploy
                <FlipWords words={words} /> <br />
                within few clicks on ConfigCloud
            </div>

            <div className="relative z-30 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">Create your account</h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                    Manage virtual machines with ease and scale your resources as needed.
                </p>

                <form className="my-8" onSubmit={onSignup}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="username">Username<span className="text-red-500"> *</span></Label>
                        <Input
                            id="username"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            placeholder=""
                            type="text"
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address<span className="text-red-500"> *</span></Label>
                        <Input
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            placeholder=""
                            type="email"
                            required
                        />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password<span className="text-red-500"> *</span></Label>
                        <Input
                            id="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            type="password"
                            required
                            className={cn(strongPassword ? "border-green-500" : "border-red-500", "border")}
                        />
                        {!strongPassword && user.password && (
                            <p className="text-red-500 text-sm">Password must be at least 8 characters long and include a number and a special character.</p>
                        )}
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="confirmpassword">Confirm Password<span className="text-red-500"> *</span></Label>
                        <Input
                            id="confirmpassword"
                            name="confirmpassword"
                            value={user.confirmpassword}
                            onChange={handleChange}
                            placeholder="••••••••"
                            type="password"
                            required
                            className={cn(passwordMatch ? "border-green-500" : "border-red-500", "border")}
                        />
                        {!passwordMatch && (
                            <p className="text-red-500 text-sm">Passwords do not match!</p>
                        )}
                    </LabelInputContainer>

                    <Button 
                        className="flex items-center justify-center bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                          <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Loading...</span>
                          </>
                        ) : (
                            "Sign Up"
                        )}
                        <BottomGradient />
                    </Button>
                    <div className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-8">
                        Already have an account?
                        <a href="/login" className="text-blue-600 dark:text-blue-400 underline ml-1">Login</a> 
                    </div>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </form>

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
        <div className={cn("flex flex-col space-y-1", className)}>
            {children}
        </div>
    );
};

function setButtonDisaled(arg0: boolean) {
  throw new Error("Function not implemented.");
}

