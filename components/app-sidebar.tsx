"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  ChartNetwork,
  LogOut,
  Mail,
  PenLine,
  Settings,
  StickyNote,
  UserPen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function AppSidebar() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserId(parsed._id); // or parsed.id depending on your structure
      } catch (err) {
        console.error("Invalid user data in localStorage");
      }
    }
  }, []);

  const DashboardOptions = [
    {
      label: "My hustles / Posts",
      url: `/dashboard/${userId}/posts`,
      icon: StickyNote,
    },
    {
      label: "Create New Hustle",
      url: `/dashboard/${userId}/create`,
      icon: PenLine,
    },
    // {
    //   label: "Messages / Inquiries",
    //   url: `/dashboard/${userId}/messages`,
    //   icon: Mail,
    // },
    {
      label: "Analytics",
      url: `/dashboard/${userId}/analytics`,
      icon: ChartNetwork,
    },
    {
      label: "Profile",
      url: `/dashboard/${userId}/profile`,
      icon: UserPen,
    },
    {
      label: "Settings",
      url: `/dashboard/${userId}/settings`,
      icon: Settings,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Huzzl Dashboard
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {DashboardOptions.map((options) => (
                <SidebarMenuItem key={options.label}>
                  <SidebarMenuButton className="gap-4" asChild>
                    <a href={options.url} className="flex items-center gap-2">
                      <options.icon className="w-4 h-4" />
                      <span>{options.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Button>
          <LogOut />
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
