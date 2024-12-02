"use client";

import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { userVm } from "@/api/userVm";
import { toast } from "sonner";
import { NavigationTabs } from "./navigation-panel";
import { Separator } from "@/components/ui/separator";
import useTableColumns, { VirtualMachine } from "./columns";
import { usePathname } from "next/navigation";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, { withCredentials: true });

export default function Page() {
  const pathname = usePathname();
  const [vmdata, setVMData] = useState<VirtualMachine[]>([]);
  const [socketStatuses, setSocketStatuses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<VirtualMachine | undefined>(undefined);

  const { columns } = useTableColumns({ setSelectedRow });

  // Function to fetch VM data from the API
  const fetchVMData = async () => {
    try {
      const response = await userVm();
      setVMData(response.data || []);
    } catch (err) {
      setError("Error fetching VM data");
      toast.error(`Failed to fetch user VMs: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle socket updates
  const handleSocketUpdate = (data: any) => {
    const { vm_id, status } = data;

    // Handle 'deleted' action
    if (status === "deleted") {
      setVMData((prevVms) => prevVms.filter((vm) => vm.vm_id !== vm_id));
      toast.success("VM successfully deleted");
      return;
    }

    // Update the transient state
    setSocketStatuses((prevStatuses) => ({
      ...prevStatuses,
      [vm_id]: status,
    }));
  };

  // Merge transient and persistent states
  const mergedVMData = vmdata.map((vm) => ({
    ...vm,
    status: socketStatuses[vm.vm_id] || vm.status, // Prefer socket status if available
  }));

  useEffect(() => {
    // Socket event listeners
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server.");
    });

    socket.on("task_status", (newStatus) => {
      console.log("Task status updated:", newStatus);
      handleSocketUpdate(newStatus);
    });

    socket.on("disconnect", () => {
      console.warn("Disconnected from Socket.IO server.");
    });

    return () => {
      socket.off("connect");
      socket.off("task_status");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchVMData();
  }, [pathname]);

  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : (
          <DataTable data={mergedVMData} columns={columns} />
        )}
      </div>
      <Separator className="my-3" />
      <NavigationTabs selectedRow={selectedRow} />
    </div>
  );
}
