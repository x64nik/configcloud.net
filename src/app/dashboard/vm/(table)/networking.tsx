import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VirtualMachine } from "./columns";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal } from "lucide-react";
import { netRules } from "@/api/userVm";
import { toast } from "sonner";

type NetworkingRules = {
  internal_ip: string;
  internal_port: number;
  protocol: string;
  subdomain: string;
  svc_public_domain: string;
  vm_id: string;
};

export default function NetworkingContent({ selectedVM }: { selectedVM: VirtualMachine | null }) {
  const [allnetrules, setNetworkingRules] = useState<NetworkingRules[]>([]);
  const [networkingRule, setNewNetworkingRule] = useState({
    internal_ip: "",
    internal_port: null as number | null,
    protocol: "",
    subdomain: "",
    domain: "",
    vm_id: "",
  });
  const [errors, setErrors] = useState<{ port: string; subdomain: string }>({
    port: "",
    subdomain: "",
  });

  // Fetch Networking Rules when selectedVM changes
  const fetchNetRules = async () => {
    if (selectedVM?.vm_id) {
      try {
        const response = await netRules(selectedVM.vm_id);
        setNetworkingRules(response.data);
      } catch (err) {
        toast.error(`Failed to fetch net rules: ${err}`);
      }
    }
  };

  // Initialize NetworkingRule for selected VM
  const initializeNetworkingRule = () => {
    if (selectedVM) {
      setNewNetworkingRule({
        internal_ip: selectedVM.ip,
        internal_port: null,
        protocol: "",
        subdomain: "",
        domain: "",
        vm_id: selectedVM.vm_id,
      });
    } else {
      setNewNetworkingRule({
        internal_ip: "",
        internal_port: null,
        protocol: "",
        subdomain: "",
        domain: "",
        vm_id: "",
      });
    }
  };

  const createNetRule = async () => {
    console.log(networkingRule);
    // Add functionality to create a new networking rule (for now, we just log the networking rule)
  };

  const isFormValid = () => {
    const { protocol, subdomain, internal_port } = networkingRule;
    return (
      protocol !== "" &&
      subdomain !== "" &&
      internal_port !== null &&
      internal_port >= 1 &&
      internal_port <= 65535 &&
      !errors.port && !errors.subdomain
    );
  };

  const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const portValue = e.target.value;

    if (!/^\d+$/.test(portValue) && portValue !== '') {
      e.preventDefault();
      return;
    }

    const portNumber = parseInt(portValue, 10);
    setNewNetworkingRule((prev) => ({
      ...prev,
      internal_port: !isNaN(portNumber) ? portNumber : null,
    }));

    // Validate the port when changed
    if (portValue && (portNumber < 1 || portNumber > 65535)) {
      setErrors((prev) => ({
        ...prev,
        port: "Invalid port", // Invalid port error
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        port: "", // Reset error on valid input
      }));
    }
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const subdomain = e.target.value;

    // Regular expression: start with letter, contain letters/numbers/hyphen, end with letter/number
    const regex = /^[a-zA-Z][a-zA-Z0-9-]*[a-zA-Z0-9]$/;

    setNewNetworkingRule((prev) => ({ ...prev, subdomain }));

    // Validate subdomain input
    if (!regex.test(subdomain)) {
      setErrors((prev) => ({
        ...prev,
        subdomain: "Invalid subdomain",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        subdomain: "",
      }));
    }
  };

  useEffect(() => {
    initializeNetworkingRule(); // Reset or initialize networking rule based on selected VM
  }, [selectedVM]);  // Re-run this effect whenever selectedVM changes

  useEffect(() => {
    if (selectedVM) {
      fetchNetRules();  // Fetch net rules if a VM is selected
    }
  }, [selectedVM]);

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
        <div className="mt-4 mb-2 grid gap-2 grid-cols-[1fr_1fr_1fr_1.2fr_1fr_4fr]">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="protocol" className="font-semibold">Protocol</Label>
            <Select disabled={!selectedVM?.hostname}
              onValueChange={(value) =>
                setNewNetworkingRule((prev) => ({ ...prev, protocol: value }))
              }
              value={networkingRule.protocol} // Bind value for proper reset
            >
              <SelectTrigger id="protocol">
                <SelectValue placeholder="Select protocol" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="http">HTTP</SelectItem>
                <SelectItem value="https">HTTPS</SelectItem>
                <SelectItem value="wss">WSS</SelectItem>
                <SelectItem value="tcp">ANY TCP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1">
            <Label htmlFor="subdomain" className="font-semibold">Subdomain</Label>
            <Input
              type="text"
              placeholder="app1"
              className={`h-9 ${errors.subdomain ? 'border-red-500' : ''}`}
              value={networkingRule.subdomain}
              onChange={handleSubdomainChange}
              disabled={!selectedVM}
            />
            {errors.subdomain && <small className="text-red-500">{errors.subdomain}</small>}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="domain" className="font-semibold">Domain</Label>
            <Select
              onValueChange={(value) =>
                setNewNetworkingRule((prev) => ({ ...prev, domain: value }))
              }
            >
              <SelectTrigger id="domain" disabled={!selectedVM?.hostname}>
                <SelectValue placeholder="Select your domain name"/>
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value={selectedVM?.hostname ?? "default-placeholder"}>{selectedVM?.hostname ?? "Select a domain"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col space-y-1">
            <Label htmlFor="internalport" className="font-semibold">Port</Label>
            <Input
              type="text"
              placeholder="0-65535"
              className={`h-9 ${errors.port ? 'border-red-500' : ''}`}
              value={networkingRule.internal_port ?? ""}
              onChange={handlePortChange}
              disabled={!selectedVM}
            />
            {errors.port && <small className="text-red-500">{errors.port}</small>}
          </div>

          <div className="py-4">
            <Button
              variant="outline"
              disabled={!isFormValid()}
              onClick={createNetRule}
            >
              Forward
            </Button>
          </div>
        </div>
        <div>
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] font-semibold">Protocol</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">Uptime</TableHead>
                <TableHead className="font-semibold">Public Hostname</TableHead>
                <TableHead className="text-start font-semibold">Internal Service</TableHead>
                <TableHead className="text-center font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedVM ? (
                allnetrules?.length ? (
                  allnetrules.map((netrule) => (
                    <TableRow key={netrule?.subdomain}>
                      <TableCell className="font-medium">{netrule?.protocol.toLocaleUpperCase()}</TableCell>
                      <TableCell>{netrule?.protocol}</TableCell>
                      <TableCell>{netrule?.protocol}</TableCell>
                      <TableCell>
                        <a
                          href={netrule?.protocol + "://" + netrule?.svc_public_domain}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center font-semibold text-sm hover:text-blue-400"
                        >
                          {netrule?.svc_public_domain}
                        </a>
                      </TableCell>
                      <TableCell className="text-start">
                        {netrule?.protocol + "://" + netrule?.internal_ip + ":" + netrule?.internal_port}
                      </TableCell>
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
                      No forwarding rule available
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>Loading...</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
