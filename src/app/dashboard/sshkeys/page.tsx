// app/dashboard/vm/page.tsx
import { SshKeyManager } from "./ssh-key-manager"

export default function SSHKeysPage() {
    return (
      <div className="space-y-6 p-4 md:p-6 lg:p-8 max-w-full">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">SSH Keys</h1>
          <p className="text-sm text-muted-foreground">
          Create and Manage your ssh keys 
          </p>
        </div>
        <SshKeyManager />
      </div>
    );
  }