import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";
import { TrendingUp, Users } from "lucide-react";

export type HustleTypeData = {
  id: number;
  title: string;
  student: string;
  year: string;
  category: string;
  imageUrl: string;
  description: string;
  featured: boolean;
};

const Card = ({
  imageUrl,
  title,
  year,
  category,
  student,
  description,
  featured,
}: HustleTypeData) => {
  return (
    <div className="p-4 max-w-sm bg-white transition duration-300 ease-in-out hover:scale-105 ">
      <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden ">
        {featured && (
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-gradient-to-r from-orange to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Featured
            </div>
          </div>
        )}
        <Image
          className="object-cover border rounded-lg"
          src={imageUrl}
          alt={title}
          fill
        />
      </div>
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm flex gap-2">
          <Users className="w-4 h-4" />
          {student} • <span className="font-medium">{year}</span>
        </p>
        <p className="text-sm mt-2 text-gray-700">{description}</p>
        <Badge variant="outline" className="mt-3 bg-yellow-50 text-amber-800">
          {category}
        </Badge>
      </div>
    </div>
  );
};

export default Card;
