// app/dashboard/vm/page.tsx
"use client"

import { userInfo } from "@/api/userInfo";
import { userVm } from "@/api/userVm";
import { useEffect } from "react";
import { toast } from "sonner";


export default function SSHKeysPage() {

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await userVm();
  //       console.log(response)
  //     } catch (error) {
  //       toast.error(`Failed to fetch user info: ${error}`);
  //     }
  //   };

  //   fetchData();
  // }, []);

    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">SSH Keys</h1>
        <p>Manage your SSH Keys here</p>
      </div>
    );
  }
  