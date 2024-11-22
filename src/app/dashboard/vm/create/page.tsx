"use client"

import { listDistros } from "@/api/listDistros"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createVm } from "@/api/userVm"

type Distro = {
  name: string;
  version: string;
}


export default function CreateVMPage() {

  const [distros, setDistros] = useState<Distro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [vmData, setVmData] = useState({
    vmName: null as string | null,
    osType: null as string | null,
    sshKeypair: null as string | null,
    cores: null as number | null,
    memory: null as number | null,
    storage: null as number | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;  
    // Handle number values properly
    setVmData((prevData) => ({
      ...prevData,
      [name]: value === '' ? null : (name === 'cores' || name === 'memory' || name === 'storage') && !isNaN(Number(value)) ? Number(value) : value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setVmData((prevData) => ({
      ...prevData,
      osType: value,
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
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  async function deployVm() {
    // try {
    //   const response = await createVm()
    // }
    console.log(vmData.vmName);
    console.log(vmData.osType);
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
        <div className="space-y-2">
          <Label htmlFor="distro">Operating System</Label>
          <Select
            onValueChange={handleSelectChange}
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
          
        </div>

      </div>
      <Button size="sm" onClick={deployVm}>Deploy</Button>
    </div>

    
  )
}

