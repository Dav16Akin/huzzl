"use client";

import Card from "@/components/shared/Card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hustles, setHustle] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    const getAllHustlesData = async () => {
      try {
        const data = await getAllHustles();

        if (!data) {
          console.error("Failed to fetch data");
        }

        setHustle(data);
        setIsLoading(false);
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

      <div className="flex flex-wrap gap-4 p-4 ">
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
      <div className="lg:grid-cols-4 grid gap-8 p-24">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="flex flex-col space-y-3">
                <Skeleton key={idx} className="h-[45vh]" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))
          : filteredHustles.map((hustle) => (
              <Card key={hustle._id} {...hustle} />
            ))}
      </div>
    </div>
  );
};

export default page;
