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

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type VirtualMachine = {
  vm_name: string
  status: string
  memory: number
  cpu: number
  disk: string
  ip: string
  storage: string
}

const useTableColumns = ({setSelectedRow} : {setSelectedRow : React.Dispatch<React.SetStateAction<VirtualMachine | undefined>>}) => {

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
    header: "Machine ID",
  },
  {
    accessorKey: "ip",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="font-semibold">IP</p> 
          <ChevronsUpDown className="ml-2 h-4 w-4" />
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
        <div className="flex w-[100px] items-center space-x-2">
          {/* Conditionally render icons based on status */}
          {type === "created" && <CircleCheck className="text-blue-500 h-4 w-4" strokeWidth={3}/> }
          {type === "pending" && <Clock className="text-yellow-500 h-4 w-4" strokeWidth={3}/>}
          {type === "running" && <CirclePlay className="text-green-500 h-4 w-4" strokeWidth={3}/>}
          {type === "stopped" && <CircleX className="text-red-500 h-4 w-4" strokeWidth={3}/>}
          
          {/* Display the status text */}
          <span
            className={cn(
              "capitalize font-bold",
              type === "created"
              ? "text-blue-500"
              : type === "pending"
              ? "text-yellow-500"
              : type == "running"
              ? "text-green-500"
              : type == "stopped"
              ? "text-red-500"
              : "text-red-500"
            )}
          >
            {" "}
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
          <p className="font-semibold">Created On</p>
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const payment = row.original
 
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
              {/* <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem><Play />Start</DropdownMenuItem>
              <DropdownMenuItem><Ban />Stop</DropdownMenuItem>
              <DropdownMenuItem><RotateCcw />Reboot</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="destructive" className="h-8 w-8 p-0" size="icon">
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