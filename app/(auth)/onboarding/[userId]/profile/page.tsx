import ProfileForm from "@/components/forms/ProfileForm";
import React from "react";

const page = ({ params: { userId } }: ParamProps) => {
  return (
    <div className="w-full flex flex-col pt-14 px-4 gap-4 items-center py-8">
      <ProfileForm userId={userId} />
    </div>
  );
};

export default page;
