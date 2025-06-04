"use client";

import { fetchUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "./shared/Loading";
import { fetchUserHustles } from "@/lib/actions/hustle.action";
import { getAccountAgeInDays } from "@/lib/utils";

const DashboardHome = ({ userId }: { userId: string }) => {
  const [userData, setUserData] = useState<UserType | null>(null);

  const [hustleData, setHustleData] = useState<any[]>([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUser(userId);
        setUserData(userData);
      } catch (error) {
        console.error("Error in fetching user data from dashboardHome");
      }
    };

    const getHustleData = async () => {
      try {
        const data = await fetchUserHustles(userId);
        setHustleData(data);
      } catch (error) {
        console.error("Error in fetching hustle user data from dashboardHome");
      }
    };

    getUserData();
    getHustleData();
  }, [userId]);

  console.log(userData);
  console.log(hustleData);

  if (!userData) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-6 w-full space-y-8">
        {/* Header */}
        <section className="flex justify-between items-center bg-gray-50 p-4 rounded-xl shadow">
          <div className="flex items-center gap-4">
            <Image
              src={userData.profileImage || "/default-avatar.png"}
              alt={`${userData.businessname} image`}
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold">
                Welcome back, {userData.businessname} 👋
              </h1>
              <p className="text-sm text-gray-500">
                Here’s a quick look at your hustle.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="Total Hustles"
            value={userData.hustles?.length || 0}
          />
          <StatCard label="Inquiries" value={userData.inquiries?.length || 0} />
          <StatCard label="Profile Views" value={userData.profileViews || 0} />
          <StatCard
            label="Account Age"
            value={`${getAccountAgeInDays(userData.createdAt) || 0} days`}
          />
        </section>

        {/* Recent Activity */}
        <section className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
          {hustleData && hustleData.length > 0 ? (
            <ul className="space-y-2">
              {hustleData.slice(0, 3).map((post: any) => (
                <li
                  key={post._id}
                  className="p-3 border rounded-md hover:bg-gray-50"
                >
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-gray-500">
                    {post.description.slice(0, 80)}...
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No hustles yet.</p>
          )}
        </section>
      </div>
    </Suspense>
  );
};

export default DashboardHome;

const StatCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-white p-4 rounded-xl shadow text-center">
    <p className="text-2xl font-bold text-black">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);
