"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { Search, ShoppingBagIcon } from "lucide-react";
import { Button } from "../ui/button";
import { getSession, signOut } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";


const Topbar = () => {
  const path = usePathname();
  const [data, setData] = useState<any | null>(null);
  const [id, setUserID] = useState<any | null>(null);
  const [role, setRole] = useState<any | null>(null);

  useEffect(() => {
    try {
      const getUser = async () => {
        const session = await getSession();
        setData(session?.user?.name);
        setUserID(session?.user?.id);
        setRole(session?.user?.role)
      };
      getUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="flex items-center fixed top-0 w-full z-50 bg-white justify-between gap-20 px-16 py-4">
      <div className="flex items-center gap-8">
        <Link className="flex items-center" href="/">
          <h1 className="m-0 text-left font-general leading-none uppercase text-3xl">
            Hustle <span>.</span> <br /> Connect
          </h1>
        </Link>
      </div>

      <div className="rounded-full outline flex items-center w-full">
        <Input className="outline-none h-14 shadow-none flex-grow border-0 focus-visible:ring-0" />
        <Button className="flex items-center rounded-full bg-mygreen h-11 m-1">
          <Search className="text-white" />
        </Button>
      </div>

      <div className="flex gap-8 items-center">
        <div className="flex gap-4">
          {NavLinks.map((d, index) => {
            return (
              <Link
                className={`${
                  path === d.link
                    ? "text-orange underline underline-offset-4 transition-colors delay-75"
                    : ""
                }`}
                key={index}
                href={d.link}
              >
                {d.name}
              </Link>
            );
          })}
        </div>

        <div>
          <ShoppingBagIcon />
        </div>

        {data ? (
          role === "hustler" ? (
            <Link href={`/dashboard/${id}`}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="rounded-full uppercase" asChild>
                    <Button variant="outline">{data[0]}</Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Profile</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          ) : (
            <>

            </>
          )
        ) : (
          <Link href="/register">Signup</Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
