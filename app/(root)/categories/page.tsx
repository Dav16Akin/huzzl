"use client";

import Card from "@/components/shared/Card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllHustles } from "@/lib/actions/hustle.action";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useId, useMemo, useState } from "react";

const categories = [
  "all",
  "design",
  "fashion",
  "food",
  "tech",
  "art",
  "craft",
  "other",
  "tutoring",
  "photography",
];

const page = () => {
  const id = useId();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hustles, setHustle] = useState<any[]>([]);

  useEffect(() => {
    const getAllHustlesData = async () => {
      try {
        const data = await getAllHustles();
        setHustle(data);
      } catch (error) {
        console.error(`Error in fetching all hustle data: ${error}`);
      }
    };

    getAllHustlesData();
  }, []);

  const filteredHustles = useMemo(() => {
    let filtered = hustles.filter((hustle) => {
      const matchesSearch =
        hustle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hustle.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" ||
        hustle.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    return filtered;
  }, [searchTerm, hustles, selectedCategory]);

  return (
    <div className="w-full flex flex-col gap-8 items-center">
      <div className="w-full justify-between gap-4 px-8 py-2 flex items-center">
        {/* searchbar */}
        <SearchIcon />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
      </div>

      <div className="flex gap-4 p-4">
        {categories.map((category, index) => (
          <Badge
            variant="outline"
            className={`cursor-pointer ${
              selectedCategory === category ? "bg-primary text-white" : ""
            } p-2 rounded-md`}
            onClick={() => setSelectedCategory(category)}
            key={index}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>
        ))}
      </div>
      <div className="lg:grid-cols-3 grid gap-8">
        {filteredHustles.map((hustle) => (
          <Card key={hustle._id} {...hustle} />
        ))}
      </div>
    </div>
  );
};

export default page;
