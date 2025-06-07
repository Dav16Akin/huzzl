"use client";

import { NavLinks } from "@/constants";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Asterisk } from "lucide-react";

const students = [
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9",
];

const bounceTransition = {
  y: {
    duration: 1.5,
    yoyo: Infinity,
    ease: "easeInOut",
  },
};

const Topbar = () => {
  const path = usePathname();

  return (
    <div className="flex items-center justify-between px-8 py-4">

      
      <div className="flex items-center gap-8">
        <Link className="flex items-center" href="/">
          <h3>Huzzl</h3>
          <Asterisk />
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

      <Link href="/register">
        <Button className="text-white">Join Now</Button>
      </Link>
    </div>
  );
};

export default Topbar;
