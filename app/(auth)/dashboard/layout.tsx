import type { Metadata } from "next";
import "../../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import { getServerSession } from "next-auth"; // ✅ use this
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Huzzl Dashboard page",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "hustler") {
    return redirect("/categories");
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full ">
        <SidebarTrigger/>
        <Suspense fallback={<Loading />}>
          <div className="w-full h-screen flex flex-col">{children}</div>
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
