"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Plus, SquarePlus } from 'lucide-react'
import { createSSHKey } from "@/api/userVm"
import { toast } from "sonner"

export function CreateSSHKeyDialog() {
  const [keyName, setVmName] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false) // Manage dialog open state
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(true);

  async function handleSubmit () {
    console.log("Keyname :", keyName)

    try {
      const response = await createSSHKey(keyName);
      toast.info(response.data)
      // setInstances(response.data || []); // Update state with VM data
      console.log(response.data)
    } catch (err) {
      setErrors((prev) => ({ ...prev, sshkey: "Error occured while creating sshkey" }));
      toast.error(`Error occured while creating sshkey: ${err}`);
    } finally {
      setLoading(false);
    }
  
    setIsOpen(false)
  }
  const isFormValid = keyName;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create SSK Key</DialogTitle>
          <DialogDescription>
            Please enter your SSH key Name
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4 ">
            <Label htmlFor="keyName" className="text-right w-1/8 ">
              Key Name
            </Label>
            <Input 
              id="keyName" 
              className="flex-1"
              value={keyName}
              onChange={(e) => setVmName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
            type="button" 
            onClick={handleSubmit} 
            disabled={!isFormValid} // Disable button if form is incomplete
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
