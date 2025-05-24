import Image from "next/image";
import React from "react";
import { Badge } from "../ui/badge";

export type HustleTypeData = {
  id: number;
  title: string;
  student: string;
  year: string;
  category: string;
  imageUrl: string;
  description: string;
};

const Card = ({ imageUrl, title, year, category, student, description }: HustleTypeData) => {
  return (
    <div className="p-4  max-w-sm bg-white">
      <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
        <Image className="object-cover border rounded-lg" src={imageUrl} alt={title} fill />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">
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
