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

import { getSession, signOut } from "next-auth/react";

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
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
   try {
    const getId = async () => {
      const session = await getSession()
      setUserId(session?.user?.id)
    }

    getId();
   } catch (error) {
    console.error("Error in getting session id", error)
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
      <Link href={`/dashboard/${userId}`}>
        {" "}
        <SidebarHeader className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Huzzl Dashboard
        </SidebarHeader>
      </Link>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-4">
              {DashboardOptions.map((options) => (
                <SidebarMenuItem key={options.label}>
                  <SidebarMenuButton
                    className={`${
                      pathname.startsWith(options.url)
                        ? "bg-black text-white hover:bg-black/90 hover:text-white"
                        : ""
                    }`}
                    asChild
                  >
                    <Link
                      href={options.url}
                      className="flex items-center gap-2"
                    >
                      <options.icon className="w-4 h-4" />
                      <span>{options.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <Button onClick={() => signOut({ callbackUrl: "/sign-in" })}>
          <LogOut />
          Signout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
