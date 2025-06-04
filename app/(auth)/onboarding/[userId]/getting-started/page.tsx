import CategoryForm from "@/components/forms/CategoryForm";
import { unstable_cache } from "next/cache";
import React from "react";

const page = async  ({ params: { userId } }: ParamProps) => {

  const getCachedUser = unstable_cache(
    async () => {
      return { id: userId }
    },
    [userId], // add the user ID to the cache key
    {
      tags: ['user'],
      revalidate: 60,
    }
  );

  console.log(getCachedUser());
  

  return (
    <div className="w-full flex flex-col gap-4 items-center pt-14">
      <CategoryForm userId={userId} />
    </div>
  );
};

export default page;
