import type { Metadata } from "next";
import "../../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Huzzl Dashboard page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full ">
        <SidebarTrigger />
        <Suspense fallback={<Loading/>}>
          <div className="w-full h-screen flex flex-col">{children}</div>
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
