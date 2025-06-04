"use client";

import Trending from "@/components/Trending";
import HeroButton from "@/components/HeroButton";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="max-h-screen h-screen flex justify-center items-center text-center pb-24"
      >
        <section className="space-y-3">
          <h1 className="font-bold text-8xl">Discover Student Hustles</h1>
          <p className="font-semibold text-xl">
            Explore crafts and side hustles of students at your university
          </p>
          <div className="space-x-4">
            <HeroButton />
          </div>
        </section>
      </motion.div>

      <Trending />
    </>
  );
}
