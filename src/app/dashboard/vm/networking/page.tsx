"use client"

import { listDistros, listInstances } from "@/api/listDistros"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@radix-ui/react-separator"

const protocols = [
  { value: "http", label: "HTTP" },
  { value: "https", label: "HTTPS" },
  { value: "wss", label: "WSS" },
  { value: "tcp", label: "ANY TCP" },
];

export default function CreateNetworkingRules() {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  
  useEffect(() => {
    console.log("api call here")
  }, []);

    
  return (
    <div className="space-y-4 p-4 md:p-6 lg:p-8 max-w-full">
      <h1 className="text-2xl font-semibold tracking-tight">Networking Rules</h1>
    <Card>
    <CardHeader className="">
      <div className="grid flex-1 gap-1 text-center sm:text-left">
        <CardTitle>Expose your Application on Public Subdomain</CardTitle>
        <CardDescription>
        Create a forwarding for for your virtual mahcines internal ip and service runnin in it, it will be accessable over a subdomain
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent>
    <div className="mt-4 mb-4 grid gap-3 grid-cols-[2fr_1fr_6fr]">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="domain" className="font-semibold">Virtual Machine</Label>
        <Select>
          <SelectTrigger id="domain">
            <SelectValue placeholder="select your vm"/>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value={"asas"}></SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1">
        <Label htmlFor="internalport" className="font-semibold">Internal Port</Label>
        <Input
          type="text"
          placeholder="0-65535"
        />
        {errors.port && <small className="text-red-500">{errors.port}</small>}
      </div>
    </div>
    <div className="mt-4 grid gap-3 grid-cols-[1fr_2fr_4fr_1.2fr_1fr_4fr]">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="protocol" className="font-semibold">Protocol</Label>
        <Select>
          <SelectTrigger id="protocol">
            <SelectValue placeholder="HTTP" />
          </SelectTrigger>
          <SelectContent position="popper">
            {protocols.map((protocol) => (
              <SelectItem key={protocol.value} value={protocol.value} defaultValue="http">
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
          placeholder="app1"
          />
        {errors.subdomain && <small className="text-red-500">{errors.subdomain}</small>}
      </div>

      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="domain" className="font-semibold">Domain</Label>
        <Select>
          <SelectTrigger id="domain">
            <SelectValue placeholder="Select your domain name"/>
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value={"asas"}></SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="grid grid-cols-[1fr_16fr] py-4">
    <div className="items-top flex space-x-2">
      <Checkbox id="tls"/>
      <div className="gap-1.5 leading-none">
        <label
          htmlFor="tls"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          TLS 
        </label>
      </div>
    </div>
    <div className="items-top flex space-x-2">
      <Checkbox id="tls"/>
      <div className="gap-1.5 leading-none">
        <label
          htmlFor="tls"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          HTTP to HTTPS redirection 
        </label>
      </div>
    </div>
    </div>

    <Button className="mt-10" disabled>
      Apply Rule
    </Button>

    {/* <Separator orientation="vertical"  className="mr-2 h-6 border-b"/> */}

    </CardContent>
    </Card>
    </div>
    
  )
}
