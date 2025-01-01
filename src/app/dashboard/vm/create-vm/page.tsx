"use client"

import { listDistros, listInstances } from "@/api/listDistros"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createVm } from "@/api/userVm"
import { userSSHKeys } from "@/api/userVm"
import { CreateSSHKeyDialog } from "./create-sshkey-dialog"
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"

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

type SSHKeys = {
  name: string;
}

export default function CreateVMPage() {
  const router = useRouter();
  const [distros, setDistros] = useState<Distro[]>([]);
  const [instances, setInstances] = useState<Instance[]>([]);
  const [sshkeys, setSSHKeys] = useState<SSHKeys[]>([]);
  const [installVSCodeServer, setInstallVSCodeServer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  
  const [vmData, setVmData] = useState({
    vm_name: undefined as string | undefined,
    distro: undefined as string | undefined,
    instance_type: undefined as string | undefined,
    keypair: undefined as string | undefined,
    username: undefined as string | undefined,
  });

  

  const canSubmit = Boolean(vmData.vm_name && vmData.distro && vmData.instance_type && vmData.keypair);

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
      distro: value,
    }));
  };

  const handleSelectChangeIT = (value: string) => {
    setVmData((prevData) => ({
      ...prevData,
      instance_type: value,
    }));
  };

  const handleSelectChangeSSHKey = (value: string) => {
    setVmData((prevData) => ({
      ...prevData,
      keypair: value,
    }));
  };

  
  useEffect(() => {
    async function loadDistros() {
      try {
        const response = await listDistros();
        setDistros(response.data || []); // Update state with VM data
        console.log(response.data)
      } catch (err) {
        setErrors((prev) => ({ ...prev, distros: "Error loading distros" }));
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
        setErrors((prev) => ({ ...prev, instances: "Error loading instances" }));
        toast.error(`Failed to fetch Instances: ${err}`);
      } finally {
        setLoading(false);
      }
    }
    loadinstances();
  }, []);

  useEffect(() => {
    loadSSHKeys();
  },[])

  async function loadSSHKeys() {
    try {
      const response = await userSSHKeys();
      
      if (response.data === "No Keypairs") {
        setSSHKeys([]);  // If no keypairs, set an empty array or just show the message
        setErrors((prev) => ({ ...prev, sshkeys: "No SSH keys found." }));
      } else {
        setErrors((prev) => ({ ...prev, sshkeys: null }));
        setSSHKeys(response.data || []); // Update state with actual SSH keys data
        console.log(response.data);
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, sshkeys: "Error fetching SSH keys" }));
      toast.error(`Failed to fetch SSH keys: ${err}`);
    } finally {
      setLoading(false);
    }
  }
  
  async function deployVm() {
    try {
      const response = await createVm(vmData)
      toast.info(`VM creation is in queue`)
    } catch (err) {
      console.log("error in vm creation")
      toast.error(`${err}`)
    } finally {
      console.log("going back to vm table")
    }
    router.push('/dashboard/vm');
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
          <Label htmlFor="vm_name">VM Name</Label>
          <Input required
            id="vm_name"
            name="vm_name"
            value={vmData.vm_name || ''}
            onChange={handleChange}
          />
          <p className="text-xs text-muted-foreground">
          Provide a unique name for your Virtual Machine to easily identify and manage it in your system. Make sure the name is distinct to avoid conflicts with other VMs.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input required
            id="username"
            name="username"
            value={vmData.username || ''}
            onChange={handleChange}
          />
          </div>
          <div className="space-y-1">
          <Label htmlFor="distro">Operating System</Label><br/>
          <Select
            onValueChange={handleSelectChangeOS}
            required
          >
            <SelectTrigger id="distro">
              <SelectValue placeholder="Select a operatng system"/>
            </SelectTrigger>
            <SelectContent>
              {loading && <p>Loading...</p>}
              {errors.distros && <p className="text-red-500 size-1">{errors.distros}</p>}
              {!loading &&
                distros.map((distro) => (
                  <SelectItem
                    key={`${distro.name}-${distro.version}`}                 
                    value={`${distro.name}`}
                  >
                    {`${distro.name}-${distro.version}`}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          </div>
          <br/>
        </div>          
        <div className="space-y-2">
          <Label htmlFor="instance_type">Instance Type</Label>
          <Select
            onValueChange={handleSelectChangeIT}
            required
          >
            <SelectTrigger id="instance_type">
              <SelectValue placeholder="Select a instance type"/>
            </SelectTrigger>
            <SelectContent>
              {loading && <p>Loading...</p>}
              {errors.instances && <p className="text-red-500 size-1">{errors.instances}</p>}
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
          <p className="text-xs text-muted-foreground">
          Select the instance type based on your resource requirements. Different types offer varying CPU, memory, and storage options.
          </p>
        </div>
        <div className="space-y-2 grid grid-cols-2">
          <Label htmlFor="keypair">SSH Key</Label><br/>
          <Select
            onValueChange={handleSelectChangeSSHKey}
            required
          >
            <SelectTrigger id="keypair">
              <SelectValue placeholder="Select your SSH key"/>
            </SelectTrigger>
            <SelectContent>
              {loading && <p>Loading...</p>}
              {errors.sshkeys && <p className="text-red-500 text-sm">{errors.sshkeys}</p>}
              {!loading &&
                sshkeys.map((sshkey) => (
                  <SelectItem
                    key={`${sshkey}`}                 
                    value={`${sshkey}`}
                  >
                    {`${sshkey}`}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          <div className="ml-1">
          <CreateSSHKeyDialog fetchSSHKeys={loadSSHKeys}/>
          </div>
          <p className="text-xs text-muted-foreground">
          This key will be used for authentication to ensure a safe connection.
          </p>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox id="vscode"/>
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="vscode"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Install VSCode Server
            </label>
          </div>
        </div>
      </div>
      {!canSubmit ? (
        <Button disabled size="sm">
          Deploy
        </Button>
      ) : (
        <Button size="sm" onClick={deployVm}>
          Deploy
        </Button>
      )}
    </div>
  )
}
