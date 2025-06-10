import DashboardHome from "@/components/DashboardHome";
import { fetchUserHustles } from "@/lib/actions/hustle.action";
import { fetchUser } from "@/lib/actions/user.actions";
import React from "react";


export default async function page({ params }: ParamProps) {
  const userId = params.userId;

  const userData = await fetchUser(userId);
  const hustleData = await fetchUserHustles(userId);

  return (
    <div className="w-full">
      <DashboardHome userData={userData} hustleData={hustleData} />
    </div>
  );
}
