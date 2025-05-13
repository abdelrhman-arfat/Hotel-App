import HeroHomeSection from "@/app/_components/sections/home/HeroHomeSection";
import HomeFourthSection from "@/app/_components/sections/home/HomeFourthSection";
import HomeReviewSection from "@/app/_components/sections/home/HomeReviewSection";
import HomeSecondSection from "@/app/_components/sections/home/HomeSecondSection";

export default function Home() {
  return (
    <div className="">
      <HeroHomeSection />
      <HomeSecondSection />
      <HomeReviewSection />
      <HomeFourthSection />
    </div>
  );
}
