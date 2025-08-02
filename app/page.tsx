import AllStoriesListing from "@/components/AllStoriesListing";
import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/Home/HeroSection";


export default function Home() {
  return (
    <div className="m-auto min-h-screen dark">
        <Navbar />
      <HeroSection/>
      <AllStoriesListing/>
    </div>
  );
}
