import Features from "@/components/landingPage/Features";
import HomeScreen from "@/components/landingPage/HomeScreen";
import NavbarComponent from "@/components/landingPage/Navbar";
import Testimonials from "@/components/landingPage/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    
        <main className="flex flex-col min-h-screen items-center justify-center">
          <NavbarComponent />
          <HomeScreen />
          <Features />
          <Testimonials />
        </main>
    
  );
}
