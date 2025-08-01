import AllStoriesListing from "@/components/AllStoriesListing";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div className="m-auto min-h-screen ">
      <HeroSection/>
      <AllStoriesListing/>
    </div>
  );
}
