import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import Home from './pages/Home';
import DogsForAdoption from './pages/DogsForAdoption';
import AboutShelter from './pages/AboutShelter';
import Support from './pages/Support';
import Contact from './pages/Contact';
import DogDetail from './pages/DogDetail';
import Przetargi from './pages/Przetargi';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <TopBar />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dogs" element={<DogsForAdoption />} />
            <Route path="/dogs/:id" element={<DogDetail />} />
            <Route path="/about" element={<AboutShelter />} />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/przetargi" element={<Przetargi />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <AccessibilityWidget />
      </div>
    </Router>
  );
}

export default App;
