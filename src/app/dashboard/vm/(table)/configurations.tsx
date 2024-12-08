import { Card } from "@/components/ui/card";
import { VirtualMachine } from "./columns";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2, ClockIcon, Copy, XCircle } from "lucide-react";

// Main Component
export default function ConfigurationsContent({ selectedVM }: { selectedVM?: VirtualMachine }) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getValueOrDash = (value: string | undefined) => value ?? "-";

  return (
    <div>
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Configuration</h2>
        <Separator />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Left Column */}
          <div className="space-y-6">
            <InfoRow label="Machine Name" value={getValueOrDash(selectedVM?.vm_name)} />
            <InfoRow
              label="Username"
              value={getValueOrDash(selectedVM?.ip)}
              copyable
              onCopy={() => copyToClipboard(selectedVM?.ip || "-", "vm-ip")}
              copied={copiedField === "vm-ip"}
            />
            <InfoRow
              label="Password"
              value={getValueOrDash(selectedVM?.ip)}
              copyable
              onCopy={() => copyToClipboard(selectedVM?.ip || "-", "vm-ip")}
              copied={copiedField === "vm-ip"}
            />            
          </div>

          {/* mid Column */}
          <div className="space-y-6">
          <InfoRow label="Instance Type" value={selectedVM?.instance_type ? `${selectedVM.instance_type}` : "-"} />
            <InfoRow label="CPU Cores" value={selectedVM?.cpu ? `${selectedVM.cpu} vCPU` : "-"} />
            <InfoRow label="Memory" value={selectedVM?.cpu ? `${selectedVM.cpu} vCPU` : "-"} />
            <InfoRow
              label="Storage Type"
              value={getValueOrDash(selectedVM?.storage)}
            />
          </div>

          {/* right column */}
          <div className="space-y-6">
            <InfoRow label="Public Hostname" value={selectedVM?.cpu ? `${selectedVM.cpu} vCPU` : "-"} />
            <InfoRow
              label="PrivateIP"
              value={getValueOrDash(selectedVM?.ip)}
              copyable
              onCopy={() => copyToClipboard(selectedVM?.ip || "-", "vm-ip")}
              copied={copiedField === "vm-ip"}
            />
            <InfoRow
              label="Bandwidth"
              value={getValueOrDash(selectedVM?.storage)}
            />
            <InfoRow
              label="SSH Key"
              value={getValueOrDash(selectedVM?.storage)}
            />
          </div>
          
        </div>
      </Card>
    </div>
  );
}

// InfoRow Component
interface InfoRowProps {
  label: string;
  value: string;
  valueClass?: string;
  copyable?: boolean;
  onCopy?: () => void;
  copied?: boolean;
  isStatus?: boolean;
  statusType?: string;
}

function InfoRow({ label, value, valueClass, copyable, onCopy, copied, isStatus, statusType }: InfoRowProps) {
  
  // Function to determine icon color
  const getIconColor = (statusType: string | undefined) => {
    if (!statusType) return "text-gray-400";

    return statusType === "available"
      ? "text-blue-500"
      : statusType === "pending"
      ? "text-yellow-500"
      : statusType === "running"
      ? "text-green-500"
      : statusType === "stopped"
      ? "text-red-500"
      : "text-gray-400";
  };

  const renderStatusIcon = (statusType: string | undefined) => {
    switch (statusType) {
      case "available":
        return <CheckCircle2 className={`h-5 w-4 ${getIconColor(statusType)}`} /> ;
      case "pending":
        return <ClockIcon className={`h-5 w-4 ${getIconColor(statusType)}`} />;
      case "stopped":
        return <XCircle className={`h-5 w-4 ${getIconColor(statusType)}`} />;
        case "running":
          return <CheckCircle2 className={`h-5 w-4 ${getIconColor(statusType)}`} />;
      default:
        return <span className="text-gray-400">-</span>;
    }
  };

  return (
    <div className="flex flex-col">
      {/* Label */}
      <Label className="text-gray-700 font-semibold text-sm">{label}</Label>
      {/* Value with Icon */}
      <div className="flex items-center space-x-1">
        {isStatus ? (
          <div className="flex items-center">
            {renderStatusIcon(statusType)}<p className={`text-sm px-1 ${getIconColor(statusType)}`}>{statusType}</p>
          </div>
        ) : (
          <span className={`text-sm text-white ${valueClass || ""}`}>{value}</span>
        )}
        {copyable && value !== "-" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onCopy}
                  className="h-6 w-6 text-white hover:text-gray-300"
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
