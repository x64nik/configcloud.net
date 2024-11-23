"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight, MoreHorizontal, Settings2, SettingsIcon, ArrowUpDown, TrendingUpDownIcon, ChevronsUpDown } from "lucide-react"


import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
    cell: ({ row }) => {
      const payment = row.original
 
      return (
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
            <DropdownMenuItem>Start</DropdownMenuItem>
            <DropdownMenuItem>Stop</DropdownMenuItem>
            <DropdownMenuItem>Destroy</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  
]
