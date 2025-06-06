import { fetchHustle } from "@/lib/actions/hustle.action";
import Image from "next/image";

export default async function page ({ params }: { params: { _id: string } }) {
  const hustle = await fetchHustle(params._id)

  return (
    <div className="flex flex-col lg:flex-row gap-12 px-8 py-10 max-w-6xl mx-auto">
      {/* Left Section */}
      <div className="flex flex-col flex-1 gap-6">
        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {Array.isArray(hustle.tags) &&
            hustle.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight">{hustle.title}</h1>

        {/* Owner Info */}
        <div className="flex items-center gap-4">
          {hustle.owner?.profileImage && (
            <Image
              src={hustle.owner.profileImage}
              alt={hustle.owner.fullname + " image"}
              width={70}
              height={70}
              className="rounded-full object-cover border"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold">{hustle.owner?.fullname}</h2>
            <h3 className="text-sm text-gray-600">
              {hustle.owner?.businessname}
            </h3>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xl font-medium mb-2">About this hustle</h3>
          <p className="text-gray-700">{hustle.description}</p>
        </div>

        {/* Image gallery */}
        {hustle.images?.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {hustle.images.map((img: string, index: number) => (
              <Image
                key={index}
                src={img}
                alt={`Hustle Image ${index + 1}`}
                width={300}
                height={200}
                className="rounded-md object-cover border max-h-[200px]"
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Section – Pricing */}
      <div className="w-full lg:w-1/3">
        <div className="sticky top-24 border rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold">Price Range</h3>
          {hustle.price && (
            <p className="text-lg">
              ₦{hustle.price[0]?.min?.toLocaleString()} - ₦
              {hustle.price[0]?.max?.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};


