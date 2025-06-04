"use client";

import { fetchUserHustles } from "@/lib/actions/hustle.action";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const PostComponent = ({ userId }: { userId: string }) => {
  const [hustleData, setHustleData] = useState<any[]>([]);

  useEffect(() => {
    const getHustleData = async () => {
      try {
        const data = await fetchUserHustles(userId);
        setHustleData(data);
      } catch (error) {
        console.error("Error in fetching hustle user data from dashboardHome");
      }
    };

    getHustleData();
  }, [userId]);


  return (
    <div className="space-y-12">
      <section className="w-full">
        <h1>Your Active Posts</h1>
      </section>
      <div className="p-12">
        {hustleData && hustleData.length > 0
          ? hustleData.map((hustle, idx) => (
              <div
                className="flex justify-between gap-4 p-8 items-center border rounded-md"
                key={idx}
              >
                <div>
                  {hustle.images && (
                    <Image
                      src={hustle.images[0]}
                      alt="hustle image"
                      width={150}
                      height={150}
                    />
                  )}
                </div>
                <div>
                  <h4>Title: {hustle.title}</h4>
                  <p>
                    Price: {hustle.price[0].min} - {hustle.price[0].max}
                  </p>
                  <p>Description: {hustle.description}</p>
                </div>

                <div className="flex gap-4">
                  <Button>Edit</Button>
                  <Button variant="destructive">Delete</Button>
                </div>
              </div>
            ))
          : "No posts yet"}
      </div>
    </div>
  );
};

export default PostComponent;
