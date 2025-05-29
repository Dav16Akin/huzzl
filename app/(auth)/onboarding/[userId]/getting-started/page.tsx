import CategoryForm from "@/components/forms/CategoryForm";
import React from "react";



const page = ({ params: { userId } }: ParamProps) => {
  return (
    <div className="w-full flex flex-col gap-4 items-center pt-14">
      <CategoryForm userId={userId} />
    </div>
  );
};

export default page;
