import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VirtualMachine } from "./columns"
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Input2 } from "@/components/ui/input2";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react";


export default function NetworkingContent ({ selectedVM }: { selectedVM: VirtualMachine | undefined }){
  
  const invoices: any[] = [
    {
      ruleid: 1,
      invoice: "HTTP",
      paymentStatus: "HEALTHY",
      totalAmount: "http://10.90.1.7:8080",
      paymentMethod: "https://asdw-kbmgk6i9-10-90-1-7.vps.configcloud.net/",
      uptime: "8 hours",
    },
    {
      ruleid: 2,
      invoice: "HTTP",
      paymentStatus: "HEALTHY",
      totalAmount: "http://10.90.1.7:8081",
      paymentMethod: "https://asdw-kbmgk6i9-10-90-1-7.vps.configcloud.net/",
      uptime: "8 hours",
    },
    
  ];

  useEffect(() => {
    if (selectedVM) {
      console.log(`Trigger a netdata API call here ${selectedVM.vm_id}`);
    }
  }, [selectedVM?.vm_id]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Networking</CardTitle>
          <CardDescription>
            Showing Virtual Machine's Networking Details
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
      <div className="mt-4 mb-2 grid gap-2 grid-cols-[1fr_3fr_1fr_1.2fr_1fr_4fr]">
        <>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="protocol" className="font-semibold">Protocol</Label>
            <Select>
              <SelectTrigger id="protocol">
                <SelectValue placeholder="Type..." />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="next">HTTP</SelectItem>
                <SelectItem value="sveltekit">HTTPS</SelectItem>
                <SelectItem value="astro">WSS</SelectItem>
                <SelectItem value="nuxt">ANY TCP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="protocol" className="font-semibold">Subdomain</Label>
            <Input type="email" placeholder="Service-specific subdomain" className="h-9" />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="domain" className="font-semibold">Domain</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select your domain name" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="hostname">{selectedVM?.hostname || "No hostname available"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1">
            <Label htmlFor="internalport" className="font-semibold">Port</Label>
            <Input type="number" placeholder="0-65535" className="h-9" />
          </div>
          <div className="py-4">
            <Button variant="outline" disabled={!selectedVM} >Forward</Button>
          </div>
        </>
      </div>
      <div>
        <Separator />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Protocol</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uptime</TableHead>
              <TableHead>Public Hostname</TableHead>
              <TableHead className="text-start">Internal Service</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedVM ? (
              invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <TableRow key={invoice?.ruleid}>
                    <TableCell className="font-medium">{invoice?.invoice}</TableCell>
                    <TableCell>{invoice?.paymentStatus}</TableCell>
                    <TableCell>{invoice?.uptime}</TableCell>
                    <TableCell><a 
                      href={invoice?.paymentMethod} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center font-semibold text-sm hover:text-blue-400"
                      > 
                      {invoice?.paymentMethod}
                    </a>
                    </TableCell>
                    <TableCell className="text-start">{invoice?.totalAmount}</TableCell>
                    <TableCell className="text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                          <DropdownMenuItem disabled>Configure</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                    No forwarding rule for this VM
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                  No Virtual Machine selected
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      </CardContent>
    </Card>
  );
}

