'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Benefits from '@/components/Benefits'
import About from '@/components/About'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Benefits />
        <About />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}
