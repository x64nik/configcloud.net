"use client"

import * as React from "react"
import {
  Command,
  KeyRound,
  Settings2,
  SquareTerminal,
  CircleHelp,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Virtual Machines",
      url: "/dashboard/vm",
      icon: SquareTerminal,
    },
    {
      title: "SSH Keys",
      url: "/dashboard/sshkeys",
      icon: KeyRound,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
    },
    {
      title: "Help",
      url: "/dashboard/help",
      icon: CircleHelp,
    },
  ]
}

export function AppSidebar({ user, onLogout, ...props }: {
  user: { name: string; email: string; avatar: string } | null;
  onLogout: () => void;  // Add the logout function as a prop
} & React.ComponentProps<typeof Sidebar>) {


  const [activeItem, setActiveItem] = React.useState<string>("")
  const handleNavClick = (title: string) => {
    setActiveItem(title)
  }

  const updatedNavItems = data.navMain.map(item => ({
    ...item,
    isActive: item.title === activeItem
  }))


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">ConfigCloud</span>
                  <span className="truncate text-xs">v0.0.1</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={updatedNavItems}/>
      </SidebarContent>
      <SidebarFooter>
      {user ? (
          <NavUser user={user} onLogout={onLogout} />
        ) : (
          <p className="px-4 py-2 text-sm text-muted-foreground">
            Loading user info...
          </p>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
