import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function DogsForAdoption() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/api/dogs/facebook/sync`);
        setDogs(res.data);
      } catch (error) {
        console.error('Error fetching from Facebook:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDogs();
  }, []);

  return (
    <div className="fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Psy do adopcji</h1>
          <p className="text-lg text-orange-100">Znajdź swojego idealnego towarzysza</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Dogs Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Ładowanie psów...</p>
          </div>
        ) : dogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Nie znaleziono psów.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dogs.map(dog => (
              <Link key={dog.id} to={`/dogs/${dog.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 h-full border-t-4 border-orange-500">
                  {dog.photo ? (
                    <img src={dog.photo} alt={dog.name} className="w-full h-72 object-cover" />
                  ) : (
                    <div className="w-full h-72 bg-gradient-to-br from-orange-200 to-amber-200 flex items-center justify-center">
                      <span className="text-6xl">🐕</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{dog.name}</h3>
                    <p className="text-gray-600 mb-4 font-semibold">{dog.breed || dog.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      {dog.age && <p className="text-sm text-gray-500">Wiek: {dog.age} {dog.age === 1 ? 'rok' : 'lat'}</p>}
                      {dog.gender && <p className="text-sm text-gray-500">{dog.gender === 'Male' ? 'Samiec' : 'Samica'}</p>}
                    </div>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      dog.status === 'available'
                        ? 'bg-green-100 text-green-800'
                        : dog.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {dog.status === 'available' ? 'Do adopcji' : dog.status === 'pending' ? 'W trakcie' : 'Adoptowany'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
