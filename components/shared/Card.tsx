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
import { Button } from "../ui/button";
import Link from "next/link";

export type HustleTypeData = {
  _id: string;
  title: string;
  owner: { fullname: string; year: string };
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
    <div
      className={`rounded-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group ${
        featured ? "ring-4 ring-yellow-400 ring-opacity-50" : ""
      }`}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            Featured
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 rounded-md overflow-hidden">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
            {title}
          </h3>
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <Heart className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-orange text-orange" />
            <span className="font-semibold text-gray-800">
              {/* {rating} */}
            </span>
            {/* <span className="text-gray-500">({reviews})</span> */}
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-blue-500 font-semibold space-x-2">
            
            ₦{price[0].min} - ₦{price[0].max}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{owner.fullname}</span>
          <span className="text-gray-300">•</span>
          <MapPin className="w-4 h-4 text-gray-400" />
          {/* <span className="text-sm text-gray-600">{university}</span> */}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="px-3 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Action Button */}
        <Link href={`/details/${_id}`}>
          {" "}
          <Button className="w-full  text-white py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            View Details
            <ExternalLink className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
