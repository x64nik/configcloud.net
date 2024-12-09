"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, Plus, RotateCw } from "lucide-react";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fetchVMData,
  loading,
  error,
}: DataTableProps<TData, TValue> & { 
  fetchVMData: () => Promise<void> 
  loading: boolean;
  error: string | null;
  }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
      columnFilters,
    },
  });

  return (
    <div className="auto-rows-min md:grid-cols-1">
      <div className="space-y-2">
        <div className="flex items-center">
          <Input
            placeholder="Filter Machine Name..."
            value={(table.getColumn("vm_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("vm_name")?.setFilterValue(event.target.value)
            }
            className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]"
          />
          <div className="flex ml-auto gap-2">
            <Button variant="outline" onClick={fetchVMData}><RotateCw /></Button>
            <Link href={"/dashboard/vm/create"}>
              <Button variant="outline" >Create<Plus /></Button>
            </Link> 
          </div>
        </div>
        {/* Table Container */}
        <div className="overflow-auto rounded-lg border bg-card text-card-foreground shadow">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-4 py-2 text-sm font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 px-4 py-2 text-sm">
                  <div className="flex justify-center items-center">
                    <Loader2 className="animate-spin text-blue-500" />
                    <span className="text-center text-muted-foreground">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 px-4 py-2 text-center text-red-500"
                  >
                    <div className="flex flex-col items-center">
                      <span className="font-medium">Error fetching Virtual Machines <br/>{error}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-muted/50 data-[state=selected]:bg-muted">
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4 py-2 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-12 px-4 py-2 text-center text-muted-foreground"
                >
                  No Virtual Machines.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          </Table>
        </div>
        {/* Pagination Controls */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>


  );
}
