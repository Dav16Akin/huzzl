import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import {
  ExternalLink,
  Heart,
  MapPin,
  Star,
  Tags,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export type HustleTypeData = {
  _id: string;
  title: string;
  owner: { fullname: string; year: string; profileImage: string };
  price: [{ min: number; max: number }];
  tags: string[];
  category: string;
  images: string[];
  fullname: string;
  description: string;
  featured: boolean;
};

const Card = ({
  _id,
  images,
  title,
  owner,
  category,
  tags,
  description,
  price,
  featured,
}: HustleTypeData) => {
  return (
    <Link
      href={`/details/${_id}`}
      className={`hover:shadow-2xl border transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group`}
    >
      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-xl group-hover:text-mygreen underline font-bold transition-colors line-clamp-2">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* <div className="flex items-center gap-1">
            <span className="font-semibold text-gray-800">
              {rating} 
            </span>
            <span className="text-gray-500">({reviews})</span> 
          </div> */}
            <p className=" font-semibold space-x-2">from ₦{price[0].min}</p>
          </div>
        </div>

        <div className="flex items-center p-4 gap-2 border-t">
          <Image src={owner.profileImage} alt={owner.fullname + "image"} width={50} height={50} className="object-cover w-11 h-11 rounded-full"/>
          <span className="text-sm text-gray-600">{owner.fullname}</span>
          <MapPin className="w-4 h-4 text-gray-400" />
          {/* <span className="text-sm text-gray-600">{university}</span> */}
        </div>
      </div>
    </Link>
  );
};

export default Card;
