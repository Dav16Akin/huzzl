"use client";

import HeroButton from "@/components/HeroButton";
import Footer from "@/components/shared/Footer";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, CreditCard, Search, SquarePlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden h-[92vh] mt-20 bg-white relative">
        <Image
          src="/assets/blob-haikei.svg"
          alt="bg-image"
          fill
          className="z-0 ml-72"
        />

        <section className="flex px-32">
          <div className="flex flex-col pt-16 z-20 items-start w-1/2">
            <h1 className="font-bold text-left sm:text-6xl md:text-7xl text-5xl lg:text-9xl">
              Discover Student Hustles
            </h1>
            <p className="text-black/70 text-xl">
              A vibrant platform showcasing the side hustles, creativity, and
              entrepreneurial spirit of students.
            </p>
            <div className="space-x-4">
              <HeroButton />
            </div>
          </div>

          <div className="h-[900px] w-1/2 relative">
            <Image
              src="/assets/guy.png"
              alt="guy image"
              fill
              className="object-cover"
            />
          </div>
        </section>
      </div>

      {/* Logos Section */}
      <section className="w-full py-12 bg-gray-50 flex items-center justify-center">
        <div className="flex gap-20 flex-wrap justify-center">
          {[
            { src: "/assets/logos/Next.js.svg", alt: "Next.js" },
            { src: "/assets/logos/Tailwind CSS.svg", alt: "Tailwind CSS" },
            { src: "/assets/logos/MongoDB.svg", alt: "MongoDB" },
            { src: "/assets/logos/Node.js.svg", alt: "Node.js" },
            { src: "/assets/logos/Vercel.svg", alt: "Vercel" },
          ].map((logo, index) => (
            <div
              key={index}
              className="h-12 w-auto invert grayscale opacity-80 hover:opacity-100 transition"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={50}
                height={50}
                className="filter-green"
              />
            </div>
          ))}
        </div>
      </section>

      {/* How it works section */}

      <section className="text-center p-24 w-full space-y-4 relative">
        <Image
          src="/assets/layered-waves-haikei.svg"
          alt="layered waves"
          fill
          className="w-full object-cover object-bottom"
        />

        <Badge className="bg-green-400">HOW IT WORKS</Badge>
        <h1 className="z-20 text-2xl font-bold">
          It's easy to Post and Find Hustles
        </h1>

        <div className="grid p-16 grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative border p-8 rounded-2xl bg-white shadow-sm">
            <div className="rounded-full absolute left-[45%] top-[-15%] bg-mygreen w-12 h-12 flex items-center justify-center">
              <SquarePlus className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Post a Hustle</h2>
              <p className="text-sm text-gray-600">
                Create a hustle listing and showcase your skills or small
                business to students in your school.
              </p>
              <Link
                href="/create-hustle"
                className="inline-flex items-center text-mygreen mt-2"
              >
                Start posting <ArrowUpRight />
              </Link>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative border p-8 rounded-2xl bg-white  shadow-sm">
            <div className="rounded-full absolute left-[45%] top-[-15%] bg-mygreen w-12 h-12 flex items-center justify-center">
              <Search className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Find Hustles</h2>
              <p className="text-sm text-gray-600">
                Browse through categories to discover services and connect with
                hustlers near you.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center text-mygreen mt-2"
              >
                Browse marketplace <ArrowUpRight />
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative border p-8 rounded-2xl bg-white  shadow-sm">
            <div className="rounded-full absolute left-[45%] top-[-15%] bg-mygreen w-12 h-12 flex items-center justify-center">
              <CreditCard className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Make Secure Payment</h2>
              <p className="text-sm text-gray-600">
                Pay safely through the platform and enjoy peace of mind with
                secure, reliable transactions.
              </p>
              <Link
                href="/categories"
                className="inline-flex items-center text-mygreen mt-2"
              >
                Explore hustles <ArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full h-[84vh] bg-black relative">
        <Image
          src="/assets/wave-haikei.svg"
          alt="wave"
          fill
          className="w-full object-cover"
        />

        <div className="flex flex-col gap-14 p-24">
          <h1 className="text-white">
            Your Entrepreneurship Journey Starts Here - and Grows With You
          </h1>

          <div className="grid  grid-cols-1 md:grid-cols-3">
            {/* Hustles You Can Start Today */}
            <div className="relative h-[50vh] bg-white border overflow-hidden shadow-sm">
              <Image
                src="/assets/image2.jpg"
                alt=""
                fill
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white bg-black/50 p-3">
                <h3 className="font-semibold text-lg">Featured Hustles</h3>
                <p className="text-sm">
                  From fashion to tutoring, discover the top student hustles
                  trending now.
                </p>
              </div>
            </div>

            {/* Personalized Hustle Plans */}
            <div className="bg-mygreen z-20 text-white p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Personalized Hustle Plans
                </h3>
                <p className="text-sm">
                  Tailored recommendations based on your skills, interests, and
                  available time.
                </p>
              </div>
              {/* <div className="flex gap-3 mt-6">
                <div className="p-2 bg-white text-black">IG</div>
                <div className="p-2 bg-white text-black">WA</div>
                <div className="p-2 bg-white text-black">LI</div>
              </div> */}
            </div>

            {/* Student Entrepreneurs */}
            <div className="relative bg-white border overflow-hidden shadow-sm">
              <Image
                src="/assets/image1.jpg"
                alt="Student entrepreneur"
                fill
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white bg-black/50 p-3">
                <h3 className="font-semibold text-lg">
                  Successful Student Entrepreneurs
                </h3>
              </div>
            </div>

            {/* Trusted by Students
          <div className="bg-black text-white p-6  flex items-center justify-center">
            <h3 className="font-semibold text-lg text-center">
              Trusted by 500+ Students Across Campuses
            </h3>
          </div> */}

            {/* Testimonial
          <div className="relative bg-white border  overflow-hidden shadow-sm">
            <Image
              src="/assets/student-testimonial.jpg"
              alt="Student testimonial"
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white bg-black/50 p-3 rounded-lg">
              <p className="italic text-sm">
                "Through this platform, I found clients for my design hustle and
                now make steady income monthly."
              </p>
              <p className="mt-2 font-semibold">— Amaka O., Graphic Designer</p>
            </div>
          </div> */}

            {/* Stats
          <div className="bg-white border  p-6 flex flex-col justify-center text-center shadow-sm">
            <h3 className="font-semibold text-2xl">100+</h3>
            <p className="text-sm mb-4">Hustles listed</p>
            <h3 className="font-semibold text-2xl">20+</h3>
            <p className="text-sm mb-4">Campuses represented</p>
            <h3 className="font-semibold text-2xl">₦500k+</h3>
            <p className="text-sm">Earned by students</p>
          </div> */}
          </div>
        </div>
      </section>

      {/* <div className="p-8 w-full text-center bg-transparent bg-opacity-0">
              <h3>
                Made by{" "}
                <Link
                  href="https://davidakin.vercel.app/"
                  className="text-orange underline"
                >
                  this guy
                </Link>
              </h3>
            </div> 
      */}

      <div className="text-center p-24">
        <Badge className="bg-green-400">MARKETPLACE</Badge>
        <h1>Check The Hustle Of The Day</h1>
        <p></p>
      </div>
      <Footer />
    </>
  );
}
