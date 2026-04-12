import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Showroom from "../components/Showroom";
import Projects from "../components/Projects";
import WhyUs from "../components/WhyUs";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import MotionWrapper from "../components/MotionWrapper";

export default function Home() {
  return (
    <main>
      <Navbar />
      <MotionWrapper variant="scaleReveal">
        <Hero />
      </MotionWrapper>

      <MotionWrapper delay={0.1} variant="blurIn">
        <WhyUs />
      </MotionWrapper>

      <MotionWrapper delay={0.2} variant="fadeUp">
        <Showroom />
      </MotionWrapper>

      <MotionWrapper delay={0.3} variant="blurIn">
        <Projects />
      </MotionWrapper>

      <MotionWrapper delay={0.4} variant="fadeUp">
        <Footer />
      </MotionWrapper>
      
      <WhatsAppButton />
    </main>
  );
}
