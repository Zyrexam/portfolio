"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Experience from "@/components/sections/experience"
import Work from "@/components/sections/work"
import Contact from "@/components/sections/contact"
import Footer from "@/components/footer"
import SidebarProfile from "@/components/sidebar-profile"

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false)

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <Navigation />

      <main className="relative">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            {/* Main content */}
            <div className="space-y-32">
              <Hero />
              <About />
              <Experience />
              <Work showAllProjects={showAllProjects} onToggle={setShowAllProjects} />
              <Contact />
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <SidebarProfile />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
