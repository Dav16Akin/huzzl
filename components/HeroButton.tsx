import React from "react";
import { Button } from "./ui/button";

const data = [
  { label: "Explore Hustles", type: "base" },
  { label: "Become a hustler", type: "outline" },
];

const HeroButton = () => {
  return (
    <div className="space-x-4 mt-8">
      {data.map((btn, index) => {
        return (
          <Button
            className={`${btn.type === "outline" ? "text-black" : " text-white"} py-6 px-8`}
            variant={btn.type === "outline" ? "outline" : undefined}
            key={index}
          >
            {btn.label}
          </Button>
        );
      })}
    </div>
  );
};

export default HeroButton;
