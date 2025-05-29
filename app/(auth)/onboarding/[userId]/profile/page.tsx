import ProfileForm from "@/components/forms/ProfileForm";
import React from "react";

const page = ({ params: { userId } }: ParamProps) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center pt-8">
      <ProfileForm userId={userId} />
    </div>
  );
};

export default page;
