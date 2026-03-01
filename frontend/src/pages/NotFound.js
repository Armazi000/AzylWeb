import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="fade-in min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-6">
          <span className="text-9xl font-bold text-orange-500" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.1)' }}>
            404
          </span>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Strona nie znaleziona</h1>
        <p className="text-lg text-gray-600 mb-2">Wygląda na to, że ta strona uciekła...</p>
        <p className="text-gray-500 mb-8">Sprawdź czy adres jest poprawny lub wróć na stronę główną.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Strona główna
          </Link>
          <Link
            to="/dogs"
            className="bg-white text-orange-600 border-2 border-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all shadow-lg"
          >
            Psy do adopcji
          </Link>
        </div>
      </div>
    </div>
  );
}
