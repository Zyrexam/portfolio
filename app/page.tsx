import { SiteSplash } from "./components/SiteSplash";
import { SiteNav } from "./components/SiteNav";
import {
  AboutSection,
  AnnouncementBar,
  CtaBand,
  ExperienceSection,
  Hero,
  ProjectsSection,
  ResearchSection,
  SiteFooter,
  SkillsSection,
  StatementBand,
} from "./components/sections";
import { Ticker } from "./components/Ticker";

export default function Home() {
  return (
    <>
      <SiteSplash />
      <SiteNav />
      <AnnouncementBar />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <StatementBand />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ResearchSection />
        <CtaBand />
      </main>
      <SiteFooter />
    </>
  );
}
