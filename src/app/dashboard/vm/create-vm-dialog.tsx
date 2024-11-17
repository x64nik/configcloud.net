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
import { Eye, EyeOff } from 'lucide-react'
import { DistroSelector } from "./distro-selector"
import VMResourceSlider from "./vm-resource-slider"

export function CreateVMDialog() {
  const [showPassword, setShowPassword] = useState(false)
  const [vmName, setVmName] = useState("")
  const [vmUsername, setVmUsername] = useState("")
  const [vmPassword, setVmPassword] = useState("")
  const [selectedDistro, setSelectedDistro] = useState("")
  const [cores, setCores] = useState(1)
  const [memory, setMemory] = useState(2)
  const [disk, setDisk] = useState(8)

  const handleSubmit = () => {
    console.log("VM Name:", vmName)
    console.log("Username:", vmUsername)
    console.log("Password:", vmPassword)
    console.log("Distro:", selectedDistro)
    console.log("Cores:", cores)
    console.log("Memory:", memory)
    console.log("Disk:", disk)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create VM</DialogTitle>
          <DialogDescription>
            Please enter your VM configurations here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Label htmlFor="vmname" className="w-1/4 text-right">
              VM Name
            </Label>
            <Input 
              id="vmname" 
              className="flex-1"
              value={vmName}
              onChange={(e) => setVmName(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="vmusername" className="w-1/4 text-right">
              Username
            </Label>
            <Input 
              id="vmusername" 
              className="flex-1"
              value={vmUsername}
              onChange={(e) => setVmUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="vmpassword" className="w-1/4 text-right">
              Password
            </Label>
            <div className="relative flex-1">
              <Input
                id="vmpassword"
                type={showPassword ? "text" : "password"}
                className="pr-10"
                value={vmPassword}
                onChange={(e) => setVmPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>    
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="vmdistro" className="w-1/4 text-right">
              Distro
            </Label>
            <DistroSelector setSelectedDistro={setSelectedDistro} />
          </div>
          <VMResourceSlider
            label="CPU Cores"
            min={1}
            max={8}
            step={1}
            defaultValue={cores}
            onChange={setCores}
          />
          <VMResourceSlider
            label="Memory"
            min={1}
            max={32}
            step={2}
            defaultValue={memory}
            unit="GB"
            onChange={setMemory}
          />
          <VMResourceSlider
            label="Disk Space"
            min={8}
            max={32}
            step={4}
            defaultValue={disk}
            unit="GB"
            onChange={setDisk}
          />
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>Deploy</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}