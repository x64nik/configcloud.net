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

import { MoreHorizontal, Plus, RotateCw } from "lucide-react";
import { netRules, netRulesAll, removeNetRule } from "@/api/userVm";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ConfirmationDialog } from "@/components/confirm-delete"

type NetworkingRules = {
  internal_ip: string;
  internal_port: number;
  protocol: string;
  subdomain: string;
  svc_public_domain: string;
  vm_id: string;
};

export default function NetworkingContent({ 
    selectedVM,
  }: { 
    selectedVM?: VirtualMachine,
  }) {
  const router = useRouter();
  const [allnetrules, setNetworkingRules] = useState<NetworkingRules[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [ruleToDelete, setruleToDelete] = useState<string | null>(null)

  const fetchAllNetRules = async () => {
    setLoading(true);
    try {
      const response = await netRulesAll();
      setNetworkingRules(response.data);
      console.log(allnetrules)
      setLoading(false);
    } catch (err) {
      toast.error(`Failed to fetch net rules: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handelDeleteNetRules = async (vm_id: string, subdomain: string) => {
    if (!ruleToDelete) return
    try {
      const response = await removeNetRule(vm_id, subdomain);
      if (response.data === 'deleted') {
        setNetworkingRules((preNetworkingRules) => preNetworkingRules.filter((rule) => rule.subdomain !== subdomain));
        toast.success("Rule deleted!");
        setConfirmDialogOpen(false);
        return;
      }
    } catch (err) {
      toast.error(`Failed to delete rule: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNetRules();
  }, []);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Networking</CardTitle>
          <CardDescription>
            Showing Virtual Machine's Networking Details
          </CardDescription>
        </div>
          <Button 
            variant="outline" 
            onClick={fetchAllNetRules}
            disabled={!selectedVM}
          >
              <RotateCw />
          </Button>
          <Button 
            variant="outline" 
            disabled={!selectedVM}
            onClick={() => selectedVM && router.push("/dashboard/vm/networking")}
          >
            Expose a service<Plus />
          </Button> 
      </CardHeader>  
      
      <CardContent className="px-2 pt-4 sm:px-3 sm:pt-2">
          <>
            <Table>
            <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  <div className="flex justify-center items-center">
                    <Loader2 className="animate-spin text-blue-500" />
                    <span className="text-center text-muted-foreground">Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : selectedVM ? (
              Array.isArray(allnetrules) && allnetrules.filter((netrule) => netrule.vm_id === selectedVM.vm_id).length ? (
                allnetrules
                  .filter((netrule) => netrule.vm_id === selectedVM.vm_id) // Filter rules for the selected VM
                  .map((netrule: any) => (
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
                        <ConfirmationDialog
                          open={confirmDialogOpen}
                          onClose={() => setConfirmDialogOpen(false)}
                          onConfirm={() => handelDeleteNetRules(selectedVM.vm_id, netrule.subdomain)}
                          message="Are you sure you want to delete this SSH key?"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="bg-transparent"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" forceMount>
                            <DropdownMenuItem onClick={() => {
                              setruleToDelete(netrule.subdomain);
                              setConfirmDialogOpen(true);
                            }}>
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No forwarding rule for this VM
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  Select a VM to see networking rules
                </TableCell>
              </TableRow>
            )}
            </TableBody>

            </Table>
          </>
      </CardContent>
    </Card>
  );
}
