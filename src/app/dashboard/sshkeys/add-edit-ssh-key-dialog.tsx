import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SSHKey } from "./ssh-key"

interface AddEditSSHKeyDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (SSHKey: Omit<SSHKey, "fingerprint" | "creation_date">) => void
  initialData?: SSHKey
}

export function AddEditSSHKeyDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
}: AddEditSSHKeyDialogProps) {
  const [key_name, setName] = React.useState(initialData?.key_name || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ key_name })
    setName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit SSH Key" : "Add SSH Key"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Edit your SSH key details here. Click save when you're done."
              : "Add a new SSH key to your account. The public key will be used to authenticate your access."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-right w-1/8">
                Name
              </Label>
              <Input
                id="name"
                value={key_name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-8"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

