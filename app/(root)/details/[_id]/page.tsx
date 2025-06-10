import { fetchHustle } from "@/lib/actions/hustle.action";
import Image from "next/image";
import { Star, Heart, Share2, MessageCircle, ThumbsUp, TrendingUp, User, Calendar, MapPin, Tag, Eye } from "lucide-react";

export default async function page({ params }: { params: { _id: string } }) {
  const hustle = await fetchHustle(params._id);

  // Mock data for comments and reviews (you can replace with actual API calls)
  const reviews = [
    {
      id: 1,
      user: { name: "Sarah Johnson", image: "/assets/image.jpg" },
      rating: 5,
      comment: "Absolutely amazing work! The quality exceeded my expectations and the delivery was super fast.",
      date: "2 days ago",
      helpful: 12
    },
    {
      id: 2,
      user: { name: "Mike Chen", image: "/assets/image.jpg" },
      rating: 4,
      comment: "Great service and very professional. Would definitely recommend to others!",
      date: "1 week ago",
      helpful: 8
    },
    {
      id: 3,
      user: { name: "Emily Davis", image: "/assets/image.jpg" },
      rating: 5,
      comment: "This hustle is exactly what I was looking for. The creator is very responsive and talented.",
      date: "2 weeks ago",
      helpful: 15
    }
  ];

  const trendingHustles = [
    {
      id: 1,
      title: "Custom Logo Design",
      creator: "Alex Martinez",
      image: "/assets/image.jpg",
      rating: 4.9,
      price: "₦15,000 - ₦50,000",
      views: 1250
    },
    {
      id: 2,
      title: "Social Media Content",
      creator: "Jessica Wang",
      image: "/assets/image.jpg",
      rating: 4.8,
      price: "₦8,000 - ₦25,000",
      views: 980
    },
    {
      id: 3,
      title: "Website Development",
      creator: "David Kim",
      image: "/assets/image.jpg",
      rating: 4.7,
      price: "₦100,000 - ₦300,000",
      views: 756
    }
  ];

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Left & Center */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tags */}
            <div className="flex gap-3 flex-wrap">
              {Array.isArray(hustle.tags) &&
                hustle.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1"
                  >
                    <Tag className="w-3 h-3" />
                    #{tag}
                  </span>
                ))}
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-left text-gray-900 leading-tight">
                {hustle.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span className="text-lg">2,341 views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span className="text-lg">Posted 3 days ago</span>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {hustle.owner?.profileImage && (
                    <Image
                      src={hustle.owner.profileImage}
                      alt={hustle.owner.fullname + " image"}
                      width={80}
                      height={80}
                      className="rounded-full object-cover border-4 "
                    />
                  )}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {hustle.owner?.fullname}
                    </h2>
                    <p className="text-lg font-medium">
                      {hustle.owner?.businessname}
                    </p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>University of Lagos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">4.9 (127 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Images - Hero image larger, others smaller */}
            {hustle.images?.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Gallery</h3>
                <div className="space-y-4">
                  {/* Main large image */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <Image
                      src={hustle.images[0]}
                      alt="Main hustle image"
                      width={800}
                      height={500}
                      className="w-full h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Smaller images grid */}
                  {hustle.images.length > 1 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {hustle.images.slice(1).map((img: string, index: number) => (
                        <div key={index} className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer">
                          <Image
                            src={img}
                            alt={`Hustle Image ${index + 2}`}
                            width={200}
                            height={150}
                            className="w-full h-[150px] object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">About this hustle</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {hustle.description}
              </p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-gray-900">Reviews</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                    <span className="text-gray-600">({reviews.length} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex gap-4">
                      <Image
                        src={review.user.image}
                        alt={review.user.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-500 text-sm">{review.date}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">{review.comment}</p>
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>Helpful ({review.helpful})</span>
                          </button>
                          <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Review Button */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button className="w-full bg-blue-500 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105">
                  Write a Review
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Comments</h3>
              
              {/* Add Comment */}
              <div className="mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Share your thoughts about this hustle..."
                      className="w-full p-4 border border-gray-300 rounded-xl resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    />
                    <div className="flex justify-end mt-3">
                      <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample Comments */}
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Image
                    src="/assets/image.jpg"
                    alt="Commenter"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-900">John Doe</h4>
                      <span className="text-gray-500 text-sm">5 minutes ago</span>
                    </div>
                    <p className="text-gray-700 text-lg">This looks really interesting! How long does it usually take to complete?</p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-gray-600 hover:text-blue-500 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>3</span>
                      </button>
                      <button className="text-gray-600 hover:text-blue-500 transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-orange p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Get Started</h3>
                <p className="opacity-90">Ready to work with this hustler?</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">Price Range</h4>
                  {hustle.price && (
                    <p className="text-3xl font-bold text-blue-500">
                      ₦{hustle.price[0]?.min?.toLocaleString()} - ₦{hustle.price[0]?.max?.toLocaleString()}
                    </p>
                  )}
                </div>
                <button className="w-full bg-orange text-white py-4 rounded-xl font-semibold text-lg hover:bg-orange/90 transition-all duration-300 transform hover:scale-105">
                  Contact Hustler
                </button>
              </div>
            </div>

            {/* Trending Hustles */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                <h3 className="text-2xl font-bold text-gray-900">Trending Hustles</h3>
              </div>
              <div className="space-y-4">
                {trendingHustles.map((trending) => (
                  <div key={trending.id} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <Image
                      src={trending.image}
                      alt={trending.title}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{trending.title}</h4>
                      <p className="text-sm text-gray-600">{trending.creator}</p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{trending.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="w-3 h-3" />
                          {trending.views}
                        </div>
                      </div>
                      <p className="text-xs text-blue-500 font-medium mt-1">{trending.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}