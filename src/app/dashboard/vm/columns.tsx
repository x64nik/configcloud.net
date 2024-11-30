"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight, MoreHorizontal, Settings2, SettingsIcon, ArrowUpDown, TrendingUpDownIcon, ChevronsUpDown, Trash2, CirclePlay, Ban, Play, RotateCcw, Check, StopCircle, Timer, CircleCheck, CircleX, Clock } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import ConfigurationsContent from "./configurations"
import { cn } from "@/utils/cn"
import { vmDelete, vmState } from "@/api/vmActions"
import { toast } from "sonner"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VirtualMachine = {
  vm_id: string
  vm_name: string
  status: string
  memory: number
  cpu: number
  disk: string
  ip: string
  storage: string
}


const useTableColumns = ({setSelectedRow} : {setSelectedRow : React.Dispatch<React.SetStateAction<VirtualMachine | undefined>>}) => {

  async function vmActions(vm_id: string, action: string) {
    try {
      const response = await vmState(vm_id, action)
      console.log(response)
    } catch (err) {
      console.log(`error while ${action} vm`)
      toast.error(`${err}`)
    } finally {
      console.log("finally here")
    }
  }

  async function DeleteVM (vm_id: string) {
    try {
      const response = await vmDelete(vm_id)
      console.log(response)
    } catch (err) {
      console.log(`error while deleting  vm: ${vm_id}`)
    } 
    finally {
      console.log("delete final")
    }
  }
  
const columns: ColumnDef<VirtualMachine>[] = [
  
  {
    id: "select",
    cell: ({ row, table }) => {
      // Access the row data
      const rowData = row.original;
      
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {

            if (value) {
              // If this row is being checked, uncheck all other rows
              table.toggleAllRowsSelected(false);
              setSelectedRow(rowData);
            } else {
              setSelectedRow(undefined);
            }
            // Toggle selection for this row
            row.toggleSelected(!!value)
          }}
          aria-label="Select row"
        />
      );
    },
  },
  {
    accessorKey: "vm_name",
    header: "Machine Name",
  },
  {
    accessorKey: "vm_id",
    header: "MachineID",
  },
  {
    accessorKey: "ip",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="font-semibold">PrivateIP</p> 
          <ChevronsUpDown/>
        </Button>
      )
    },
  },
  {
    accessorKey: "distro",
    header: "Operating System",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const type = row.getValue("status"); // Retrieve the status value
      return (
        <div className="flex w-[100px] items-center">
          <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              type === 'available' ? 'bg-blue-900 text-blue-200' :
              type === 'pending' ? 'bg-yellow-900 text-yellow-200' :
              type === 'running' ? 'bg-green-900 text-green-200' :
              type === 'stopped' ? 'bg-red-900 text-red-200' :
              'bg-gray-700 text-gray-200'
            }`}>
            {row.getValue("status")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "creation_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="font-semibold">CreatedOn</p>
          <ChevronsUpDown/>
        </Button>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const vm = row.original
 
      return (
        <div className="flex gap-4">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0" size="icon">
                <span className="sr-only">Open menu</span>
                <SettingsIcon className="h-4 w-4"/>
              </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => vmActions(vm.vm_id, "start")}
                disabled={vm.status === "pending" || vm.status === "running"}
                ><Play />Start
              </DropdownMenuItem>

              <DropdownMenuItem 
                onClick={() => vmActions(vm.vm_id, "shutdown")}
                disabled={vm.status === "pending" || vm.status === "stopped" || vm.status === "available" || vm.status === "unavailable"}
                ><Ban />Shutdown
              </DropdownMenuItem>

              <DropdownMenuItem 
                onClick={() => vmActions(vm.vm_id, "reboot")}
                disabled={vm.status === "pending" || vm.status === "stopped" || vm.status === "available" || vm.status === "unavailable"}
                ><RotateCcw />Reboot
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button 
            variant="destructive" 
            className="h-8 w-8 p-0" 
            size="icon"
            disabled={vm.status == "running" || vm.status === "pending" || vm.status === "unavailable"}
            onClick={() => DeleteVM(vm.vm_id)}
            >
            <Trash2/>
          </Button>
        </div>
      )
    },
  },

] 

return {columns};

}

export default useTableColumns;