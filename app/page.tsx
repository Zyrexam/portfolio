import Navigation from "@/components/navigation";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import Footer from "@/components/footer";
import SectionDivider from "@/components/section-divider";
import SmoothScroll from "@/components/smooth-scroll";
import { getLeetCodeCount } from "@/lib/leetcode";

export default async function Home() {
  const solved = await getLeetCodeCount();

  return (
    <>
      <SmoothScroll />
      <div className="grain" aria-hidden="true" />
      <Navigation />
      <div className="page">
        <main>
          <Hero solved={solved} />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Contact solved={solved} />
        </main>
        <Footer />
      </div>
    </>
  );
}
