"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Toaster, toast } from 'sonner'
import { login, socialLogin } from '@/api/Login'; // Import the API request function
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { IconBrandGithub, IconBrandGoogle, IconBrandOnlyfans } from "@tabler/icons-react";
import GitHubIcon from "@/components/icons/GitHubIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const [user, setUser] = React.useState({
      email: "",
      password: "",
    })

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await login({ 
          email: user.email, 
          password: user.password 
        });

        console.log("Login Success", response);
        toast.success("Login Success");
        router.push("/dashboard");
 
      } catch (error) {

          console.log("Login Failed", error);
          toast.error(`${error}` || "An error occurred during Login.");
        
        } finally {
          setLoading(false);
        }    
    };
    
    const githubLogin = async (event: any) => {
      console.log(event.target.value);
      setLoading(true);
      try {
        socialLogin(event.target.value);
      } catch (error) {
        console.error("Error during social login:", error);
      } finally {
        setLoading(false);
      }

    };


    return (
      <div className="h-[50rem] w-full dark:bg-black bg-white dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative flex items-center justify-center">          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          {/* Centered sign-up form container */}
          <div className="relative z-30 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
              <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
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
                  <div className="flex items-center">
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
              </LabelInputContainer>
              <Button
                  className="w-full font-semibold"
                  type="submit"
                  disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Loading...</span>
                    </> 
                  ) : ("Login")}
                  <BottomGradient />
              </Button>
              <div className="bg-gradient-to-br from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
              </form>
              <div className="grid gap-6">
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full" onClick={githubLogin} value="github" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Loading...</span>
                    </> 
                  ) : (
                          <>
                            <GitHubIcon size={20} className="text-current" />
                            <span>Login with Github</span>
                          </>
                        )}
                      <BottomGradient />
                </Button>
                <Button variant="outline" className="w-full" onClick={githubLogin} value="github" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Loading...</span>
                    </> 
                  ) : (
                          <>
                            <GoogleIcon size={20} className="text-current" />
                            <span>Login with Google</span>
                          </>
                        )}
                      <BottomGradient />
                </Button>
              </div>
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