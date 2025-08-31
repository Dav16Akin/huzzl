import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <section className="bg-mygreen w-full h-[40vh] p-24 flex flex-col gap-8">
      <div className="flex gap-8  justify-between">
        <div>
          <Link className="flex items-center text-white" href="/">
            <h1 className="m-0 text-left font-general leading-none uppercase text-3xl">
              Hustle <span>.</span> <br /> Connect
            </h1>
          </Link>
        </div>

        <div className="text-white space-y-4">
          <h3>Useful Links</h3>
          <div className="flex gap-8 ">
            <Link className="hover:text-green-500" href="/">Home</Link>
            <Link className="hover:text-green-500" href="/">MarketPlace</Link>
            <Link className="hover:text-green-500" href="/">About us</Link>
            <Link className="hover:text-green-500" href="/">Blog</Link>
          </div>
        </div>
      </div>

      <div className="border-t w-full text-white">
        <p>© 2025 HUSTLE CONNECT</p>
      </div>
    </section>
  );
};

export default Footer;
