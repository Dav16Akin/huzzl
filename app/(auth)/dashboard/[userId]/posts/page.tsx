import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostComponent from "@/components/PostComponent";
import Loading from "@/components/shared/Loading";
import { fetchUserHustles } from "@/lib/actions/hustle.action";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export default async function posts({ params }: ParamProps) {
  const userId = params.userId;
  
   const data = await fetchUserHustles(userId);

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PostComponent data={data}/>
      </Suspense>
    </div>
  );
}
