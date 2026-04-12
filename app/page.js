import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhatsAppButton from "../components/WhatsAppButton";
import MotionWrapper from "../components/MotionWrapper";
import dynamic from 'next/dynamic';

const Showroom = dynamic(() => import("../components/Showroom"));
const Projects = dynamic(() => import("../components/Projects"));
const WhyUs = dynamic(() => import("../components/WhyUs"));
const Footer = dynamic(() => import("../components/Footer"));

export default function Home() {
  return (
    <main>
      <Navbar />
      <MotionWrapper y={50}>
        <Hero />
      </MotionWrapper>

      <MotionWrapper delay={0.2}>
        <WhyUs />
      </MotionWrapper>

      <MotionWrapper delay={0.3}>
        <Showroom />
      </MotionWrapper>

      <MotionWrapper delay={0.4}>
        <Projects />
      </MotionWrapper>

      <MotionWrapper delay={0.5}>
        <Footer />
      </MotionWrapper>
      
      <WhatsAppButton />
    </main>
  );
}
