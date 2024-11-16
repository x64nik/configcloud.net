// app/dashboard/vm/page.tsx
"use client"

import { userVm } from "@/api/userVm";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UserVMInfo = {
  creation_date: string;
  email: string;
  user_uuid: string;
  username: string;
  verified: boolean;
};


export default function VirtualMachinesPage() {

  const [data, setData] = useState<UserVMInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userVm();
        setData(response.data);
      } catch (error) {
        setError(true);
        toast.error(`Failed to fetch Virtual Machines: ${error}`);
      }
    };
    fetchData();
  }, []);

  

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Virtual Machines</h1>
      <p>Manage your virtual machines here.</p>
   
    </div>
  );
}
  