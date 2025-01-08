"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, RotateCw, Upload } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SSHKey } from "./ssh-key"
import { AddEditSSHKeyDialog } from "./add-edit-ssh-key-dialog"
import { useEffect, useState } from "react"
import { deleteSSHKey, userSSHKeys } from "@/api/userVm"
import { toast } from "sonner"
import { CreateSSHKeyDialog } from "../vm/create-vm/create-sshkey-dialog"
import { ConfirmationDialog } from "@/components/confirm-delete"

export function SshKeyManager() {
  const [data, setSSHKeys] =  useState<SSHKey[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null)

  const columns: ColumnDef<SSHKey>[] = [
        {
        accessorKey: "key_name",
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                className="ml-5"
                >
                Key Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
            },
            cell: ({ row }) => <div className="ml-5">{row.getValue("key_name")}</div>,
        
        },
        {
        accessorKey: "fingerprint",
        header: "Fingerprint",
        cell: ({ row }) => <div>{row.getValue("fingerprint")}</div>,
        },
        {
        accessorKey: "creation_date",
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                Created At
                <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
            },
            cell: ({ row }) => <div>{row.getValue("creation_date")}</div>,
        },
        {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const sshKey = row.original
    
            return (
              <div>
                <ConfirmationDialog
                  open={confirmDialogOpen}
                  onClose={() => setConfirmDialogOpen(false)}
                  onConfirm={() => handelDeleteSSHKey(keyToDelete!)}
                  message="Are you sure you want to delete this SSH key?"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {/* When "Delete" is clicked, set the key and open the dialog */}
                    <DropdownMenuItem onClick={() => {
                      setKeyToDelete(sshKey.key_name);
                      setConfirmDialogOpen(true);
                    }}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
        },
        },
    ]
  
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  async function handelDeleteSSHKey(key_name: string) {
    if (!keyToDelete) return
    //   setLoading(true);
    try {
      const response = await deleteSSHKey(key_name);
      console.log(response.data)
      if (response.data === 'deleted') {
        setSSHKeys((presshKeys) => presshKeys.filter((key) => key.key_name !== key_name));
        toast.success("Key successfully deleted!");
        setConfirmDialogOpen(false);
        return;
      }
    } catch (err) {
      toast.error(`${err}`);
    } finally {
    //   setLoading(false);
    }
  }

  async function loadSSHKeys() {
    try {
      const response = await userSSHKeys();
      setSSHKeys(response.data || []);
    } catch (err) {
    //   setErrors((prev) => ({ ...prev, sshkeys: "Error fetching SSH keys" }));
      toast.error(`Failed to fetch SSH keys: ${err}`);
    } finally {
    //   setLoading(false);
    console.log(data)
    }
  }

    useEffect(() => {
      loadSSHKeys();
    },[])

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter SSH keys..."
          value={(table.getColumn("key_name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("key_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex ml-auto gap-2">
        <Button variant="outline" onClick={loadSSHKeys}><RotateCw /></Button>
        <CreateSSHKeyDialog fetchSSHKeys={loadSSHKeys}/>
        </div>
        <Button disabled variant="secondary" className="ml-2">
            Upload <Upload className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No SSH keys found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}