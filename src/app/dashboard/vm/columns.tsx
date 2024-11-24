"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight, MoreHorizontal, Settings2, SettingsIcon, ArrowUpDown, TrendingUpDownIcon, ChevronsUpDown, Trash2, CirclePlay, Ban, Play, RotateCcw } from "lucide-react"


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

export const columns: ColumnDef<VirtualMachine>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={
    //       table.getIsAllPageRowsSelected() ||
    //       (table.getIsSomePageRowsSelected() && "indeterminate")
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
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

              // Log the IP address when the checkbox state changes
              console.log(rowData.ip);
            } else {
              // Log the row being unchecked
              console.log("unchecked");
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
    accessorKey: "ip",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          IP 
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
    accessorKey: "memory",
    header: "Memory",
  },
  {
    accessorKey: "cores",
    header: "Cores",
  },
  {
    accessorKey: "storage",
    header: "Storage",
  },
  {
    accessorKey: "status",
    header: "Status",
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
