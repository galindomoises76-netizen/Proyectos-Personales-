import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Benefits from './components/Benefits';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
