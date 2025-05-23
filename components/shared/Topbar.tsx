"use client"

import { NavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const Topbar = () => {
  const path = usePathname();
  console.log(path);

  return (
    <div className="flex items-center justify-between px-8 py-4">
      <div>HustleO</div>

      <div className="flex gap-4">
        {NavLinks.map((data, index) => {
          return (
            <Link className={`${path === data.link ? "text-orange-600 underline underline-offset-4 transition-colors delay-75" : "text-black"}`} key={index} href={data.link}>
              {data.name}
            </Link>
          );
        })}
      </div>

      <Button>Join Now</Button>
    </div>
  );
};

export default Topbar;
