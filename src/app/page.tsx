"use client";

import dynamic from "next/dynamic";
import { PageLoader } from "@/components/layout/PageLoader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Footer } from "@/components/layout/Footer";

const NavDock = dynamic(() => import("@/components/layout/NavDock").then((m) => m.NavDock), { ssr: false });
const AIChatbot = dynamic(() => import("@/components/layout/AIChatbot").then((m) => m.AIChatbot), { ssr: false });
const Starfield = dynamic(() => import("@/components/three/Starfield").then((m) => m.Starfield), { ssr: false });
const AnimatedBlobs = dynamic(() => import("@/components/effects/AnimatedBlobs").then((m) => m.AnimatedBlobs), { ssr: false });
const Hero = dynamic(() => import("@/components/sections/Hero").then((m) => m.Hero), { ssr: false });
const About = dynamic(() => import("@/components/sections/About").then((m) => m.About), { ssr: false });
const Skills = dynamic(() => import("@/components/sections/Skills").then((m) => m.Skills), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects").then((m) => m.Projects), { ssr: false });
const Certificates = dynamic(() => import("@/components/sections/Certificates").then((m) => m.Certificates), { ssr: false });
const Journey = dynamic(() => import("@/components/sections/Journey").then((m) => m.Journey), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact").then((m) => m.Contact), { ssr: false });
const Social = dynamic(() => import("@/components/sections/Social").then((m) => m.Social), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PageLoader />
      <ScrollProgress />
      <Starfield />
      <AnimatedBlobs />

      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certificates />
      <Journey />
      <Contact />
      <Social />
      <Footer />

      <NavDock />
      <AIChatbot />
    </main>
  );
}
