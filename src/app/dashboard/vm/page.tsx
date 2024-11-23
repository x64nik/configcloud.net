"use client"

import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { userVm } from "@/api/userVm";
import { toast } from "sonner";
import { CreateVMDialog } from "./create-vm-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HostsGrid  from './host-grid'

export default function Page() {
  // State to hold the VM data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track errors

  // UseEffect hook for fetching data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await userVm();
        setData(response.data || []); // Update state with VM data
      } catch (err) {
        setError("Error fetching VM data");
        toast.error(`Failed to fetch user vms: ${err}`);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    }

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">User VMs here</p>
        {/* <CreateVMDialog /> */}
        <Link href={"/dashboard/vm/create"}>
          <Button variant="outline" >Create +</Button>
        </Link>
        </div>
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

    </div>
  );
}
