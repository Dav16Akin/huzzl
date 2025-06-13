import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

// interface HeroButtonProps {
//   label: string;
//   type: string;
//   url: string;
// }

const data = [
  { label: "Explore Hustles", type: "base", url: "/categories" },
  {
    label: "Become a hustler",
    type: "outline",
    url: "/register",
  },
];

const HeroButton = () => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row md:flex-row lg:flex-row gap-4 justify-center">
      {data.map((btn, index) => {
        return (
          <Link key={index} href={btn.url}>
            <Button
              className={`${
                btn.type === "outline" ? "text-black" : " text-white"
              } py-6 px-8`}
              variant={btn.type === "outline" ? "outline" : undefined}
            >
              {btn.label}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default HeroButton;
