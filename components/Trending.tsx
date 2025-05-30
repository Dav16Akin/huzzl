import React from "react";
import Card from "./shared/Card";
import { HustleData } from "@/constants";

const Trending = () => {
  return (
    <>
      <div className="w-11/12 mx-auto flex flex-col pb-12">
        <div className="mx-auto space-y-8">
          <h1 className="text-4xl font-semibold">Trending Hustles</h1>
          <section className="grid lg:grid-cols-3 gap-8 w-full mx-auto">
            {HustleData.map((hustle) => (
              <Card key={hustle.id} {...hustle} />
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default Trending;
