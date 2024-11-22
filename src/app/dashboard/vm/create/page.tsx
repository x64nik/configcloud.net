"use client"

import { listDistros, listInstances } from "@/api/listDistros"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createVm } from "@/api/userVm"
import Component from "../vm-resource-slider"

type Distro = {
  name: string;
  version: string;
}

type Instance = {
  bandwidth: number,
  cpu_cores: number,
  disk_size: number,
  instance_type: string,
  memory: number,
}


export default function CreateVMPage() {

  const [distros, setDistros] = useState<Distro[]>([]);
  const [instances, setInstances] = useState<Instance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [vmData, setVmData] = useState({
    vmName: null as string | null,
    osType: null as string | null,
    instanceType: null as string | null,
    sshKeypair: null as string | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;  
    // Handle number values properly
    setVmData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChangeOS = (value: string) => {
    setVmData((prevData) => ({
      ...prevData,
      osType: value,
    }));
  };

  const handleSelectChangeIT = (value: string) => {
    setVmData((prevData) => ({
      ...prevData,
      instanceType: value,
    }));
  };
  
  useEffect(() => {
    async function loadDistros() {
      try {
        const response = await listDistros();
        setDistros(response.data || []); // Update state with VM data
        console.log(response.data)
      } catch (err) {
        setError("Error fetching Distros");
        toast.error(`Failed to fetch Distros: ${err}`);
      } finally {
        setLoading(false);
      }
    }

    loadDistros();
  }, []);

  useEffect(() => {
    async function loadinstances() {
      try {
        const response = await listInstances();
        setInstances(response.data || []); // Update state with VM data
        console.log(response.data)
      } catch (err) {
        setError("Error fetching Instances");
        toast.error(`Failed to fetch Instances: ${err}`);
      } finally {
        setLoading(false);
      }
    }
    loadinstances();
  }, []);


  async function deployVm() {
    // try {
    //   const response = await createVm()
    // }
    console.log(vmData.vmName);
    console.log(vmData.osType);
    console.log(vmData.instanceType);
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Create your own Virtual Machine</h1>
        <p className="text-sm text-muted-foreground">
        Create your personalized virtual machine effortlessly. Choose your specifications, select your OS, and launch in just a few clicks!
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="vmName">VM Name</Label>
          <Input required
            id="vmName"
            name="vmName"
            value={vmData.vmName || ''}
            onChange={handleChange}
          />
          <p className="text-xs text-muted-foreground">
            Unique name for your Virtual Machine 
          </p>
        </div>
        <div className="space-y-3 grid grid-cols-2">
          <Label htmlFor="distro">Operating System</Label><br/>
          <Select
            onValueChange={handleSelectChangeOS}
            required
          >
            <SelectTrigger id="osType">
              <SelectValue placeholder="Select a operatng system"/>
            </SelectTrigger>
            <SelectContent>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500 size-1">{error}</p>}
              {!loading &&
                distros.map((distro) => (
                  <SelectItem
                    key={`${distro.name}-${distro.version}`}                 
                    value={`${distro.name}-${distro.version}`}
                  >
                    {`${distro.name}-${distro.version}`}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>       
        <div className="space-y-2">
          <Label htmlFor="instanceType">Instance Type</Label>
          <Select
            onValueChange={handleSelectChangeIT}
            required
          >
            <SelectTrigger id="instanceType">
              <SelectValue placeholder="Select a instance type"/>
            </SelectTrigger>
            <SelectContent>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500 size-1">{error}</p>}
              {!loading &&
                instances.map((instances) => (
                  <SelectItem
                    key={`${instances.instance_type}`}                 
                    value={`${instances.instance_type}`}
                  >
                    {`${instances.instance_type} [${instances.memory / 1024 + 'GB Memory'}, ${instances.cpu_cores + 'vCPU'}, ${instances.disk_size + 'GB Storage'}, ${instances.bandwidth + 'Mbps'}]`}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>      
      </div>
      <Button size="sm" onClick={deployVm}>Deploy</Button>
    </div>

    
  )
}

