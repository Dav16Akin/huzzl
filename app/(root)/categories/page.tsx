"use client"

import {
  Search,
  Star,
  Filter,
  TrendingUp,
  Clock,
  MapPin,
  Users,
  Heart,
  ExternalLink,
} from "lucide-react";
import { useMemo, useState } from "react";

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  // Mock data for highest rated hustles
  const hustles = [
    {
      id: 1,
      title: "Custom Sneaker Designs",
      creator: "Alex Johnson",
      university: "MIT",
      category: "Art & Design",
      rating: 4.9,
      reviews: 127,
      price: "$80-150",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop",
      tags: ["Custom", "Sneakers", "Art"],
      description:
        "Hand-painted custom sneaker designs that turn your shoes into wearable art pieces.",
      featured: true,
    },
    {
      id: 2,
      title: "Code Tutoring Sessions",
      creator: "Sarah Chen",
      university: "Stanford",
      category: "Education",
      rating: 4.8,
      reviews: 89,
      price: "$25/hr",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      tags: ["Programming", "Tutoring", "Web Dev"],
      description:
        "Learn coding from a CS student who landed internships at top tech companies.",
    },
    {
      id: 3,
      title: "Organic Skincare Line",
      creator: "Maya Patel",
      university: "UCLA",
      category: "Beauty & Health",
      rating: 4.7,
      reviews: 156,
      price: "$15-45",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      tags: ["Organic", "Skincare", "Natural"],
      description:
        "Handmade skincare products using natural ingredients sourced locally.",
    },
    {
      id: 4,
      title: "Campus Food Delivery",
      creator: "Mike Rodriguez",
      university: "NYU",
      category: "Food & Beverage",
      rating: 4.6,
      reviews: 234,
      price: "$3-8",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      tags: ["Food", "Delivery", "Campus"],
      description:
        "Late night food delivery service exclusively for students on campus.",
    },
    {
      id: 5,
      title: "Social Media Management",
      creator: "Emma Davis",
      university: "USC",
      category: "Marketing",
      rating: 4.5,
      reviews: 78,
      price: "$200-500/mo",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      tags: ["Social Media", "Marketing", "Branding"],
      description:
        "Help small businesses grow their social media presence with engaging content.",
    },
    {
      id: 6,
      title: "Vintage Clothing Thrift",
      creator: "Jordan Kim",
      university: "Berkeley",
      category: "Fashion",
      rating: 4.4,
      reviews: 92,
      price: "$20-80",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      tags: ["Vintage", "Thrift", "Sustainable"],
      description:
        "Curated vintage and thrift clothing finds for the eco-conscious student.",
    },
  ];

  const categories = [
    {
      id: "all",
      name: "All Categories",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      id: "art-design",
      name: "Art & Design",
      color: "bg-gradient-to-r from-orange-400 to-pink-400",
    },
    {
      id: "education",
      name: "Education",
      color: "bg-gradient-to-r from-blue-400 to-purple-400",
    },
    {
      id: "beauty-health",
      name: "Beauty & Health",
      color: "bg-gradient-to-r from-green-400 to-blue-400",
    },
    {
      id: "food-beverage",
      name: "Food & Beverage",
      color: "bg-gradient-to-r from-yellow-400 to-orange-400",
    },
    {
      id: "marketing",
      name: "Marketing",
      color: "bg-gradient-to-r from-red-400 to-pink-400",
    },
    {
      id: "fashion",
      name: "Fashion",
      color: "bg-gradient-to-r from-indigo-400 to-purple-400",
    },
  ];

  // Filter and sort hustles
  const filteredHustles = useMemo(() => {
    let filtered = hustles.filter((hustle) => {
      const matchesSearch =
        hustle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hustle.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hustle.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" ||
        hustle.category.toLowerCase().replace(" & ", "-").replace(" ", "-") ===
          selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sort hustles
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r rounded-md from-black via-pink to-orange text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">
              Discover Amazing
              <span className="">
                {" "}
                Hustles
              </span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Explore the incredible entrepreneurial spirit of students in your university
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search hustles, creators, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 text-lg border-0 shadow-2xl focus:ring-4 focus:ring-white/30 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 text-lg">
            Found{" "}
            <span className="font-bold text-purple-600">
              {filteredHustles.length}
            </span>{" "}
            amazing hustles
          </p>
        </div>

        {/* Hustles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHustles.map((hustle) => (
            <div
              key={hustle.id}
              className={`bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group ${
                hustle.featured ? "ring-4 ring-yellow-400 ring-opacity-50" : ""
              }`}
            >
              {/* Featured Badge */}
              {hustle.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Featured
                  </div>
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hustle.image}
                  alt={hustle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {hustle.title}
                  </h3>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-800">
                      {hustle.rating}
                    </span>
                    <span className="text-gray-500">({hustle.reviews})</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-purple-600 font-semibold">
                    {hustle.price}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {hustle.description}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {hustle.creator}
                  </span>
                  <span className="text-gray-300">•</span>
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {hustle.university}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hustle.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHustles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No hustles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110">
          <TrendingUp className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CategoriesPage;
