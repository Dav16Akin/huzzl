"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useStep } from "@/context/StepContext";
import Image from "next/image";

const stepsData = [
  {
    label: 1,
  },
  {
    label: 2,
  },
  {
    label: 3,
  },
];

const Steps = () => {
  const path = usePathname();
  const { steps, toggleStep } = useStep();
  console.log(steps);

  if (path === "/onboarding") return null;
  return (
    <div className="flex items-center justify-center gap-12 mt-12">
      {stepsData.map((data, index) => (
        <section key={index} className="flex gap-2">
          <div className={`w-14 h-14 z-10 rounded-full border-2 ${steps[data.label] ? "border-green-600" :  "border-black"} font-bold text-2xl flex items-center justify-center`}>
            {steps[data.label] ? (
              <Image
                src="/assets/icons/check.svg"
                alt="check"
                width={20}
                height={20}
              />
            ) : (
              <div>{data.label}</div>
            )}
          </div>

          <div className="flex items-center">
            {path === `/onboarding/${data.label}` && (
              <span className="block">Step {data.label} of 3</span>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Steps;
