import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Strona główna', path: '/' },
    { label: 'Psy do adopcji', path: '/dogs' },
    { label: 'O nas', path: '/about' },
    { label: 'Wspomóż nas', path: '/support' },
    { label: 'Przetargi', path: '/przetargi' },
    { label: 'Kontakt', path: '/contact' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-orange-500">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Schronisko AZYL" width="45" height="45" className="flex-shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-black-600 leading-tight">Schronisko AZYL</h1>
              <p className="text-xs text-orange-500 font-medium">Dla naszych podopiecznych</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-gray-700"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
