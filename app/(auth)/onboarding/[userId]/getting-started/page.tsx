import CategoryForm from "@/components/forms/CategoryForm";
import React from "react";

const page = async  ({ params: { userId } }: ParamProps) => {
  
  return (
    <div className="w-full flex flex-col p-4 pt-14  gap-4 items-center lg:pt-14">
      <CategoryForm userId={userId} />
    </div>
  );
};

export default page;
