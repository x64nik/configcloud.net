"use client"

import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
// import { columns } from "./columns";
import { userVm } from "@/api/userVm";
import { toast } from "sonner";
import { CreateVMDialog } from "./create-vm-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HostsGrid  from './host-grid';
import { NavigationTabs } from "./navigation-panel";
import { Separator } from "@/components/ui/separator";
import useTableColumns, { VirtualMachine } from "./columns";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, { withCredentials: true });

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams(); // To access query params
  const [status, setStatus] = useState<string>("");
  const [data, setData] = useState<VirtualMachine[]>([]); // Specify type for VM data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<VirtualMachine | undefined>(undefined);

  const { columns } = useTableColumns({ setSelectedRow });

  // Function to fetch VM data from the API
  const fetchData = async () => {
    try {
      const response = await userVm();
      setData(response.data || []);
    } catch (err) {
      setError("Error fetching VM data");
      toast.error(`Failed to fetch user VMs: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle socket updates (task status change)
  const handleSocketUpdate = (data: any) => {
    const { vm_id, status } = data;

      // Check if the action is 'delete'
    if (status === 'deleted') {
      // Remove the specific VM from the state
      setData((prevVms: VirtualMachine[]) =>
        prevVms.filter((vm) => vm.vm_id !== vm_id)
      );

      toast.success("VM successfully deleted")
    } 

    // Update the specific VM's status in the state
    setData((prevVms: VirtualMachine[]) =>
      prevVms.map((vm) =>
        vm.vm_id === vm_id ? { ...vm, status } : vm
      )
    );

    console.log(data.vm_id)
    console.log(data.status)
    
  };

  useEffect(() => {
    // Connect to the socket on mount
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server.");
    });

    // Listen for task status updates
    socket.on("task_status", (newStatus) => {
      console.log("Task status updated:", newStatus); // Debug log
      setStatus(newStatus);
      handleSocketUpdate(newStatus);
    });
    
  }, []);

  useEffect(() => {
    fetchData();
    const reloadFlag = searchParams.get("reload");
    // If the `reload` flag is present, fetch the data again
    if (reloadFlag === "true") {
      fetchData();
      console.log("reload vm page")
    }
  }, [searchParams]); // Adding searchParams as dependency to reload data when params change

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      {/* DataTable with loading state inside */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : (
          <DataTable data={data} columns={columns} />
        )}
      </div>
      <Separator className="my-3" />
      <NavigationTabs selectedRow={selectedRow}/>      
    </div>
  );
}
