"use client";

import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Navigation />
      <div className="page">
        <main>
          <Hero />
          <Stats />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
