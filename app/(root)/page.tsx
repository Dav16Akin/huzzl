"use client";

import HeroButton from "@/components/HeroButton";
import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-hidden h-[92vh] bg-white relative">
      <div className="dark bg-blue-500 text-foreground px-4 py-3">
        <p className="flex justify-center text-sm">
          <Link href="/categories" className="group">
            <span className="me-1 text-base leading-none">✨</span>
            A vibrant platform showcasing the side hustles, creativity, and
            entrepreneurial spirit of students.
            <ArrowRightIcon
              className="ms-2 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Link>
        </p>
      </div>

      <div className="absolute bottom-0 left-0 lg:w-72 lg:h-72 bg-gradient-to-tr from-blue-500 to-transparent rounded-full blur-2xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 right-0 lg:w-72 lg:h-72 bg-gradient-to-tl from-orange to-transparent rounded-full blur-2xl opacity-70 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="flex h-full overflow-auto flex-col justify-center items-center text-center pb-28"
      >
        <section className="space-y-3 sm:space-y-8 p-6">
          <h1 className="font-bold sm:text-6xl md:text-7xl text-5xl lg:text-9xl">
            Discover <span className="text-blue-600">Student</span>{" "}
            <span className="text-orange">Hustles</span>{" "}
          </h1>
          <p className="font-semibold text-black/70 text-xl">
            Explore crafts and side hustles of students at your university
          </p>
          <div className="space-x-4">
            <HeroButton />
          </div>
        </section>
        <div className="p-8 w-full text-center bg-transparent bg-opacity-0">
          <h3>
            Made by{" "}
            <Link
              href="https://portfoliov1-two-iota.vercel.app/"
              className="text-orange underline"
            >
              this guy
            </Link>
          </h3>
        </div>
      </motion.div>
    </div>
  );
}
