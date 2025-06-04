"use client"

import React, { useEffect, useState } from "react";
import Card from "./shared/Card";
import { getAllHustles } from "@/lib/actions/hustle.action";

const Trending = () => {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(()=> {
    const fetchAllPosts = async () => {
      const data = await getAllHustles()
      setPosts(data)
    }

    fetchAllPosts()
  }, [])
  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col pb-12">
        <div className="mx-auto space-y-8">
          <h1 className="text-4xl font-semibold">Trending Hustles</h1>
          <section className="grid lg:grid-cols-3 gap-8 w-full mx-auto">
            {posts.map((hustle) => (
              <Card key={hustle._id} {...hustle} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Trending;
