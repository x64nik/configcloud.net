"use client";

import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation"; // Assuming you're using Next.js
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { userInfo } from "@/api/userInfo";
import { logout } from "@/api/Login";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  const [breadcrumbs, setBreadcrumbs] = useState<
    { label: string; href: string | null }[]
  >([]);
  
  const pathname = usePathname(); // Next.js router to track page route

  useEffect(() => {
    fetchUserData();
    updateBreadcrumbs();
  }, [pathname]); // Update breadcrumbs whenever the route changes

  const fetchUserData = async () => {
    try {
      const response = await userInfo();
      setUser({
        name: response.data.username,
        email: response.data.email,
        avatar: "path-to-image.png", // Replace with actual avatar if available
      });
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  const updateBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter(Boolean); // Split the route and filter empty segments

    const breadcrumbItems = pathSegments.map((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
      const label = decodeURIComponent(segment.replace(/-/g, " "));
      return { label, href: index < pathSegments.length - 1 ? href : null };
    });

    setBreadcrumbs(breadcrumbItems);
  };

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login"; // Redirect to login after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar user={user} onLogout={handleLogout} />
      <SidebarInset>
        <header className="flex h-14 shrink-0 border-b items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
            <BreadcrumbList className="text-base">
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={index}>
                  {crumb.href ? (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  )}
                  {/* Add a separator unless it is the last item */}
                  {index < breadcrumbs.length - 1 && (
                    <li>
                      <BreadcrumbSeparator />
                    </li>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
