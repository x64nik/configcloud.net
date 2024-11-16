"use client";
import { userInfo } from "@/api/userInfo";
import { logout } from "@/api/Login";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation";

type UserInfo = {
  creation_date: string;
  email: string;
  user_uuid: string;
  username: string;
  verified: boolean;
};

export default function DashboardPage() {

  const [data, setData] = useState<UserInfo | null>(null);
  const [error, setError] = useState(false)
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const response = await userInfo();
      console.log(response.data)
      setData(response.data)
    } catch (error) {
      setError(true);
      toast.error(`${error}`)
    } finally {
      setError(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      setError(true);
      toast.error(`${error}`)
    }
  }

  return (
    // <div className="flex flex-col items-center justify-center relative">
    //   <h1>here wlc</h1>
    //   <p>Your profile data goes here.</p>
    //   <Button variant="destructive">Logout</Button>
    //   {data && (
    //     <>
    //       <p>Username: {data.username}</p>
    //       <p>Email: {data.email}</p>
    //       <p>User UUID: {data.user_uuid}</p>
    //       <p>Verified: {data.verified ? 'Yes' : 'No'}</p>
    //       <p>Creation Date: {new Date(data.creation_date).toLocaleString()}</p>
    //     </>
    //   )}
    // </div>

    <SidebarProvider>
      <AppSidebar 
        user={
          data
            ? {
                name: data.username,
                email: data.email,
                avatar: "path-to-image.png", // Replace with a dynamic avatar if available
              }
            : null
        }
        onLogout={handleLogout}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div> */}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}