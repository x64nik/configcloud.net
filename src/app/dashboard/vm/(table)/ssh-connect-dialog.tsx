"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Terminal, CloudFog } from 'lucide-react'


interface sshCommandProp {
    ssh_command: string
}

export default function SSHGuideDialog({ ssh_command }: sshCommandProp) {
  const [isOpen, setIsOpen] = useState(false)

  const steps = [
    {
        title: "Start SSH Connection",
        content: "Copy the following command & directly run it on your terminal, for scp file transfers you can create ssh config file",
        command: ssh_command
    },
    {
      title: "Install Cloudflared**",
      content: "First, install Cloudflared on your local machine. You can download it from the official Cloudflare website or use a package manager.",
      command: "# For Debian/Ubuntu\nsudo apt-get update && sudo apt-get install cloudflared\n\n# For macOS\nbrew install cloudflare/cloudflare/cloudflared"
    },
    
  ]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="h-8 w-8 p-0">
        <Button 
        variant="outline"
        disabled={!ssh_command}
        >
          <Terminal/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-white">
            <CloudFog className="mr-2 h-6 w-6" />
            SSH with Cloudflared Guide
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Follow these steps to SSH into your server using Cloudflared.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-medium text-white">{`${step.title}`}</h3>
              <p className="text-sm text-gray-300">{step.content}</p>
              <pre className="rounded-md overflow-x-auto">
                <code className="text-sm text-green-400 whitespace-pre-wrap">{step.command}</code>
              </pre>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

