import HeroButton from "@/components/HeroButton";

export default function Home() {
  return (
    <>
      <div className="max-h-screen h-screen flex justify-center items-center text-center pb-24">
        <section className="space-y-3">
          <h1 className="font-bold text-8xl">Discover Student Hustles</h1>
          <p className="font-semibold text-xl">Explore crafts and side hustles of students at your university</p>
          <div className="space-x-4">
            <HeroButton/>
          </div>
        </section>
      </div>
    </>
  );
}
