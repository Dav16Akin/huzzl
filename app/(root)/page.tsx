"use client";

import HeroButton from "@/components/HeroButton";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="overflow-hidden h-[92vh] mt-20 bg-white">
        <section className="flex px-32">
          <div className="flex flex-col pt-16 items-start w-1/2">
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
      <section className="w-full py-12 bg-black flex items-center justify-center">
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
            </div> */}
    </>
  );
}
