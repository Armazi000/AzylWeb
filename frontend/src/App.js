import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DogsForAdoption from './pages/DogsForAdoption';
import AboutShelter from './pages/AboutShelter';
import Support from './pages/Support';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import DogDetail from './pages/DogDetail';
import Przetargi from './pages/Przetargi';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/przetargi" element={<Przetargi />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
