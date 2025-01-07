"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, KeyRound, Loader2, Plus } from "lucide-react";
import { createSSHKey } from "@/api/userVm";
import { toast } from "sonner";

interface CreateSSHKeyDialogProps {
  fetchSSHKeys: () => Promise<void>; // Prop to fetch SSH keys
}

export function CreateSSHKeyDialog({ fetchSSHKeys }: CreateSSHKeyDialogProps) {
  const [keyName, setKeyName] = useState<string>(""); // Renamed state for consistency
  const [isOpen, setIsOpen] = useState(false); // Manage dialog open state
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(false); // Initially false since no operation is happening

  const validateKeyName = (name: string) => {
    const errors: string[] = [];
    const regex = /^[a-zA-Z0-9_]+$/; // Only alphanumeric characters are allowed
    if (!name.match(regex)) {
      errors.push("Key name should only contain letters and numbers.");
    }
    if (name.length < 5 || name.length > 18) {
      errors.push("Key name must be between 5 and 18 characters.");
    }
    if (name.startsWith("_") || name.endsWith("_")) {
      errors.push("Key name cannot start or end with an underscore.");
    }
    if (!name.match(/^[a-zA-Z]/)) {
      errors.push("Key name must start with a letter.");
    }
    return errors;
  };

  async function handleSubmit() {
    const validationErrors = validateKeyName(keyName);
    if (validationErrors.length > 0) {
      setErrors({ sshkey: validationErrors.join(" ") });
      return;
    }

    setLoading(true); // Set loading to true when operation begins

    try {
      const response = await createSSHKey(keyName);
      // Trigger the download of the private key (response.data is the Blob)
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(response); // Create a download link
      downloadLink.download = `${keyName}_private_key.pem`; // Name the file
      downloadLink.click(); // Trigger the download
      toast.info("SSH Key created successfully");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        sshkey: "Error occurred while creating sshkey",
      }));
      toast.error(`Error occurred while creating sshkey: ${err}`);
    } finally {
      setLoading(false); // Stop loading once operation is done
      resetForm(); // Reset form data
      fetchSSHKeys();
    }
  }

  function resetForm() {
    setKeyName(""); // Clear input field
    setErrors({}); // Clear errors
    setIsOpen(false); // Close the dialog
  }

  const isFormValid = Boolean(keyName) && Object.keys(errors).length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) resetForm(); // Reset form on dialog close
      setIsOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default" onClick={() => setIsOpen(true)}>
          <Plus /> Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create SSH Key</DialogTitle>
          <DialogDescription>
            Give your SSH key an identifier
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="space-y-2">
            <Label htmlFor="keyName" className="text-right w-1/8">
              Key Name
            </Label>
            <Input
              id="keyName"
              className="flex-1"
              value={keyName}
              onChange={(e) => {
                setKeyName(e.target.value); // Update input value
                const validationErrors = validateKeyName(e.target.value);
                if (validationErrors.length > 0) {
                  setErrors({ sshkey: validationErrors.join(" ") });
                } else {
                  setErrors({});
                }
              }}
            />
            {errors.sshkey && (
              <p className="text-red-500 text-sm">{errors.sshkey}</p>
            )}
            <DialogDescription className="text-xs">
              This SSH key is generated only once and not stored. Please download it now, as it won't be available later. The download will start automatically.
            </DialogDescription>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isFormValid || loading} // Disable button if form is incomplete or loading
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating</span>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
