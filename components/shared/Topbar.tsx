"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify } from "lucide-react";

const Topbar = () => {
  const path = usePathname();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        const session = await getSession();
        setData(session);
      };
      getUser();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-8">
        <Link className="flex items-center" href="/">
          <h3>Huzzl</h3>
        </Link>

        <div className="flex gap-4">
          {NavLinks.map((data, index) => {
            return (
              <Link
                className={`${
                  path === data.link
                    ? "text-orange underline underline-offset-4 transition-colors delay-75"
                    : ""
                }`}
                key={index}
                href={data.link}
              >
                {data.name}
              </Link>
            );
          })}
        </div>
      </div>

      {data ? (
        <div className="flex gap-4">
          <Image
            src={data?.user?.image}
            alt="user image"
            width={100}
            height={100}
            className="rounded-full w-10 h-10"
          />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AlignJustify />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  onClick={() => signOut({ callbackUrl: "/sign-in" })}
                  variant="outline"
                >
                  Log out
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/dashboard/${data.user.id}`}>
                  <Button>Dashboard</Button>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <Link href="/register">
          <Button className="text-white">Join Now</Button>
        </Link>
      )}
    </div>
  );
};

export default Topbar;
