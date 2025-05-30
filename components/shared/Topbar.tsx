"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const path = usePathname();

  // const user =
  //   typeof window !== "undefined" ? localStorage.getItem("user") : null;

  // if (path.startsWith("/onboarding")) return null;

  return (
    <div className="flex items-center justify-between px-8 py-4">
      <div>HustleO</div>

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

      <Link href="/register">
        <Button className="text-white">Join Now</Button>
      </Link>
    </div>
  );
};

export default Topbar;
