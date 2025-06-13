import InformationForm from "@/components/forms/InformationForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="w-full flex flex-col p-4 pt-14  gap-4 items-center lg:pt-14">
      <InformationForm />
      <p className="text-gray-600">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default page;
