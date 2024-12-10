import { Card } from "@/components/ui/card"
import { VirtualMachine } from "./columns"
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Input2 } from "@/components/ui/input2";
import { Button } from "@/components/ui/button";


export default function NetworkingContent ({ selectedVM }: { selectedVM: VirtualMachine | undefined }){
  

  useEffect(() => {
    console.log(`trigger a netdata api call here ${selectedVM?.vm_id}`)
  }, [selectedVM?.vm_id])

  return (

  <div>
    <Card className="p-6">
    <h2 className="text-2xl font-bold mb-4">Networking</h2>
    <Separator />
    <div>
      {selectedVM ? (
      <div className="mt-4 grid gap-2 grid-cols-[1fr_3fr_1fr_1.2fr_1fr_4fr]">
        <>
          {/* <div>
          <p>Selected VM: {selectedVM.vm_name}</p>
          <p>Selected VM: {selectedVM.cpu}</p>
          </div> */}

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
            <Input type="email" placeholder="service specific subdomain" className="h-9"/>
          </div>
          
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="domain" className="font-semibold">Domain</Label>
            <Select>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select your domain name" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="hostname">{selectedVM.hostname}</SelectItem>

                {/* this section of dropdown will be used when we will add custom domain feature */}
                {/* {selectedVM ? (
                  <>
                  <SelectItem value="c">{selectedVM.hostname}</SelectItem>
                  <SelectItem value="s">{selectedVM.hostname}</SelectItem>
                  </>
                ) : (
                  <SelectItem value="hostname"></SelectItem>
                )} */}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col space-y-1">
            <Label htmlFor="internalport" className="font-semibold">Port</Label>
            <Input type="number" placeholder="0-65535" className="h-9"/>
          </div>
          
          <div className="py-4">
          <Button variant="outline">Forward</Button>
          </div>
        </>
        </div>
      ) : (
        <div className="col-span-3 flex justify-center items-center h-full">
          <p className="p-2 text-sm align-middle h-24 py-10 text-center text-muted-foreground">
            No Virtual Machine selected
          </p>
        </div>
      )}
    </div>
    </Card>
  </div>
);
}

