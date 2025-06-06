"use client";
import Image from "next/image";
import { Button } from "./ui/button";

const PostComponent = ({ data }: { data: any }) => {
  return (
    <div className="space-y-12">
      <section className="w-full">
        <h1>Your Active Posts</h1>
      </section>
      <div className="p-12 flex flex-col gap-4">
        {data && data.length > 0 ? (
          data.map((hustle: any, idx: any) => (
            <div
              className="flex justify-between gap-4 p-8 items-center border rounded-md"
              key={idx}
            >
              <div>
                {hustle.images[0] && (
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
        ) : (
          <p className="text-gray-500 text-center">
            You haven’t posted any hustle yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostComponent;
