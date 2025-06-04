import DashboardHome from "@/components/DashboardHome";
import React from "react";

const page = ({ params }: ParamProps) => {
  const userId = params.userId;

  return (
    <div className="w-full">
      <DashboardHome userId={userId} />
    </div>
  );
};

export default page;
