import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { VirtualMachine } from "./columns";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, ClockIcon, Copy, SquareArrowOutUpRight, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

// Main Component
export default function ConfigurationsContent({ selectedVM }: { selectedVM?: VirtualMachine }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getValueOrDash = (value: string | undefined) => value ?? "–";

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Configuration</CardTitle>
          <CardDescription>
            Showing Virtual Machine's Details
          </CardDescription>
        </div>
      </CardHeader>
      <div>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedVM ? (
            <>
              {/* Left Column */}
              <div className="space-y-6">
                <InfoRow label="Machine Name" value={getValueOrDash(selectedVM?.vm_name)} />
                <InfoRow
                  label="Username"
                  value={getValueOrDash(selectedVM?.username)}
                  copyable
                  onCopy={() => copyToClipboard(selectedVM?.username || "–", "username")}
                  copied={copiedField === "username"}
                />
                <InfoRow
                  label="SSH Key"
                  value={`${getValueOrDash(selectedVM?.keypair)} - default pair`}
                />
                {/* <InfoRow
                  label="Password"
                  value="•••••••"
                  copyable
                  onCopy={() => copyToClipboard(selectedVM?.password || "–", "password")}
                  copied={copiedField === "password"}
                  isHidden
                /> */}
              </div>
              {/* Mid Column */}
              <div className="space-y-6">
                <InfoRow
                  label="Instance Type"
                  value={selectedVM?.instance_type ? `${selectedVM.instance_type}` : "–"}
                />
                {/* <InfoRow
                  label="CPU Cores"
                  value={selectedVM?.cpu ? `${selectedVM.cpu} vCPU` : "–"}
                />
                <InfoRow
                  label="Memory"
                  value={selectedVM?.memory ? `${selectedVM.memory} GB` : "–"}
                />
                <InfoRow
                  label="Storage Type"
                  value={getValueOrDash(selectedVM?.storage)}
                /> */}
                <InfoRow
                  label="Operating System"
                  value={`${getValueOrDash(selectedVM?.distro)}-${getValueOrDash(selectedVM?.os_version)}`}
                />
                <InfoRow
                  label="Kernel Version"
                  value={getValueOrDash(selectedVM?.os_kernel_version)}
                />
              </div>
              {/* Right Column */}
              <div className="space-y-6">
                <InfoRow
                  label="Public Hostname"
                  value={selectedVM?.hostname || "–"}
                  isLink
                  link={`http://${selectedVM?.hostname}`}
                />
                <InfoRow
                  label="Private IP"
                  value={getValueOrDash(selectedVM?.ip)}
                  copyable
                  onCopy={() => copyToClipboard(selectedVM?.ip || "–", "vm-ip")}
                  copied={copiedField === "vm-ip"}
                />
                <InfoRow
                  label="Bandwidth"
                  value="45Mbps"
                />
              </div>
            </>
          ) : (
            <div className="col-span-3 flex justify-center items-center h-full">
              <p className="p-2 text-sm align-middle h-24 py-10 text-center text-muted-foreground">
                No Virtual Machine selected
              </p>
            </div>
          )}
        </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Updated InfoRow Component
interface InfoRowProps {
  label: string;
  value: string;
  valueClass?: string;
  copyable?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  isLink?: boolean;
  link?: string;
  isHidden?: boolean;
}

function InfoRow({
  label,
  value,
  valueClass,
  copyable,
  onCopy,
  copied,
  isLink,
  link,
  isHidden,
}: InfoRowProps) {
  return (

    <div className="flex flex-col">
      <Label className="text-gray-700 font-semibold text-sm">{label}</Label>
      <div className="flex items-center space-x-2">
        {isLink ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline flex items-center text-sm hover:text-blue-400"
          >
          {value}
          <SquareArrowOutUpRight className="ml-1 h-4 w-4 hover:text-blue-400"/>
          </a>
        ) : (
          <span className={`text-sm ${valueClass || ""}`}>
            {isHidden ? "•••••••" : value}
          </span>
        )}
        {copyable && value !== "–" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCopy}
                  className="h-6 w-6 text-gray-500 hover:text-gray-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{copied ? "Copied!" : "Copy to clipboard"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  );
}

