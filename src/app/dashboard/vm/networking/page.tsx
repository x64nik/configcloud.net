"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { addNetRule, netRulesAll, userVm } from "@/api/userVm";
import { VirtualMachine } from "../(table)/columns";
import { Checkbox } from "@/components/ui/checkbox";

const protocols = [
  { value: "http", label: "HTTP" },
  { value: "https", label: "HTTPS" },
  { value: "wss", label: "WSS" },
  { value: "tcp", label: "ANY TCP" },
];

// Subdomain and port validation
const validateSubdomain = (subdomain: string) => {
  const regex = /^(?![0-9])[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/;
  return regex.test(subdomain);
};

const validatePort = (port: string) => {
  const numPort = parseInt(port, 10);
  return !isNaN(numPort) && numPort > 0 && numPort <= 65535;
};

export default function CreateNetworkingRules() {
  const [vmdata, setVMData] = useState<VirtualMachine[]>([]);
  const [selectedVm, setSelectedVm] = useState<VirtualMachine | null>(null);
  const [domains, setDomains] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    internal_port: null,
    subdomain: null,
    domain: null,
  });

  const [ruleData, setRuleData] = useState({
    vm_id: "",
    internal_port: "",
    subdomain: "",
    protocol: "",
    domain: "",
    tls: false,
    httpToHttps: false,
  });

  const router = useRouter();

  const fetchVMData = async () => {
    setLoading(true);
    try {
      const response = await userVm();
      setVMData(response.data);
    } catch (err) {
      toast.error(`Failed to fetch user VMs: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVmSelection = (vmId: string) => {
    const selectedVM = vmdata.find((vm) => vm.vm_id === vmId);
    if (selectedVM) {
      setSelectedVm(selectedVM);
      setDomains([selectedVM.hostname]);  // Assuming VM only has 1 domain.
      setRuleData({
        ...ruleData,
        vm_id: selectedVM.vm_id,
        internal_port: "",
        subdomain: "",
        domain: selectedVM.hostname || "",
        protocol: "",
        tls: false,
        httpToHttps: false,
      });
      setErrors({
        internal_port: null,
        subdomain: null,
        domain: null,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'internal_port') {
      // Allow only numbers
      const numericValue = value.replace(/[^0-9]/g, '');
      setRuleData(prev => ({
        ...prev,
        [name]: numericValue,
      }));
      setErrors(prev => ({
        ...prev,
        internal_port: validatePort(numericValue) ? null : "Port must be a number between 1 and 65535.",
      }));
    } else if (name === 'subdomain') {
      setRuleData(prev => ({
        ...prev,
        [name]: value.toLowerCase(),
      }));
      if (value.length > 0) {
        if (/^[0-9]/.test(value)) {
          setErrors(prev => ({
            ...prev,
            subdomain: "Subdomain cannot start with a number.",
          }));
        } else if (!/^[a-z0-9-]+$/.test(value)) {
          setErrors(prev => ({
            ...prev,
            subdomain: "Subdomain can only contain lowercase letters, numbers, and hyphens.",
          }));
        } else if (!/^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/.test(value)) {
          setErrors(prev => ({
            ...prev,
            subdomain: "Subdomain must be between 1 and 63 characters and cannot start or end with a hyphen.",
          }));
        } else {
          setErrors(prev => ({
            ...prev,
            subdomain: null,
          }));
        }
      } else {
        setErrors(prev => ({
          ...prev,
          subdomain: null,
        }));
      }
    } else {
      setRuleData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setRuleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean, name: string) => {
    setRuleData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    const errors: { [key: string]: string | null } = {};

    // Validate internal port
    if (!validatePort(ruleData.internal_port)) {
      errors.internal_port = "Port must be a number between 1 and 65535.";
    }

    // Validate subdomain
    if (ruleData.subdomain && !validateSubdomain(ruleData.subdomain)) {
      errors.subdomain = "Subdomain must be alphanumeric, may include hyphens, and cannot start or end with a hyphen.";
    }

    // Validate domain
    if (!ruleData.domain) {
      errors.domain = "Domain is required.";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function createRule() {
    setLoading(true);
    try {
      const response = await addNetRule(ruleData.vm_id, ruleData.protocol, ruleData.subdomain, ruleData.internal_port)
      console.log(response)
      toast.success(`${response.data.message}`)

      setRuleData({
        ...ruleData,
        vm_id: "",
        internal_port: "",
        subdomain: "",
        domain: "",
        protocol: "",
        tls: false,
        httpToHttps: false,
      });

    } catch(err: any) {
      console.log(err)
      toast.error(`Failed to create Rule: ${err.data.message}`)
    } finally {
      setLoading(false);
    }
  }

  const handleApplyRule = () => {
    if (validateForm()) {
      createRule()
    }
  };

  useEffect(() => {
    fetchVMData();
  }, []);

  const isFormValid = 
    ruleData.vm_id &&
    ruleData.internal_port &&
    ruleData.subdomain &&
    ruleData.domain &&
    ruleData.protocol &&
    validatePort(ruleData.internal_port) &&
    validateSubdomain(ruleData.subdomain) &&
    !Object.values(errors).some((error) => error !== null);

  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8 max-w-full">
      <h1 className="text-2xl font-semibold tracking-tight">Networking Rules</h1>
      <Card>
        <CardHeader>
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Expose your Application on Public Subdomain</CardTitle>
            <CardDescription>
              Create a forwarding for your virtual machine's internal IP and service running in it; it will be accessible over a subdomain.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4 mb-4 grid gap-3 grid-cols-[2fr_1fr_6fr]">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="vm_id" className="font-semibold">Virtual Machine</Label>
              <Select onValueChange={(vmId) => handleVmSelection(vmId)} disabled={loading}>
                <SelectTrigger id="vm_id">
                  <SelectValue placeholder="Select your VM" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {vmdata.map((vm) => (
                    <SelectItem key={vm.vm_id} value={vm.vm_id}>
                      {vm.ip} - {vm.vm_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="internalport" className="font-semibold">Internal Port</Label>
              <Input
                type="text"
                name="internal_port"
                value={ruleData.internal_port}
                placeholder="1-65535"
                onChange={handleChange}
                disabled={!selectedVm}
                className={`border ${errors.internal_port ? "border-red-500" : "border-gray-300"}`}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              {errors.internal_port && <small className="text-red-500">{errors.internal_port}</small>}
            </div>
          </div>

          <div className="mt-4 grid gap-3 grid-cols-[1fr_2fr_4fr_1.2fr_1fr_4fr]">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="protocol" className="font-semibold">Protocol</Label>
              <Select
                name="protocol"
                value={ruleData.protocol || ""}
                onValueChange={(value) => handleSelectChange('protocol', value)}
                disabled={!selectedVm}
              >
                <SelectTrigger id="protocol">
                  <SelectValue/>
                </SelectTrigger>
                <SelectContent position="popper">
                  {protocols.map((protocol) => (
                    <SelectItem key={protocol.value} value={protocol.value}>
                      {protocol.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1">
              <Label htmlFor="subdomain" className="font-semibold">Subdomain</Label>
              <Input
                type="text"
                name="subdomain"
                value={ruleData.subdomain}
                placeholder="app1"
                onChange={handleChange}
                disabled={!selectedVm}
                className={`border ${errors.subdomain ? "border-red-500" : "border-gray-300"}`}
                pattern="^(?![0-9])[a-z0-9-]+$"
              />
              {errors.subdomain && <small className="text-red-500">{errors.subdomain}</small>}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="domain" className="font-semibold">Domain</Label>
              <Select
                name="domain"
                value={ruleData.domain || ""}
                onValueChange={(value) => handleSelectChange('domain', value)}
                disabled={!selectedVm}
              >
                <SelectTrigger id="domain">
                  <SelectValue placeholder="Select your domain name" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {domains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_16fr] py-4">
            <div className="items-top flex space-x-2">
              <Checkbox
                id="tls"
                checked={ruleData.tls}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'tls')}
                disabled={!selectedVm}
              />
              <label htmlFor="tls" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                TLS
              </label>
            </div>
            <div className="items-top flex space-x-2">
              <Checkbox
                id="http-to-https"
                checked={ruleData.httpToHttps}
                onCheckedChange={(checked) => handleCheckboxChange(checked as boolean, 'httpToHttps')}
                disabled={!selectedVm}
              />
              <label htmlFor="http-to-https" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                HTTP to HTTPS redirection
              </label>
            </div>
          </div>

          <Button
            className="mt-10"
            onClick={handleApplyRule}
            disabled={!isFormValid || loading || !selectedVm}
          >
            Apply Rule
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

