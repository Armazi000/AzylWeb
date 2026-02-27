import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function DogDetail() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDog = async () => {
      try {
        const res = await fetch('/api/dogs');
        const data = await res.json();
        const dogs = Array.isArray(data) ? data : [];
        const found = dogs.find(d => d.id === id);
        setDog(found || null);
      } catch (error) {
        console.error('Error fetching dog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDog();
  }, [id]);

  if (loading) {
    return <div className="text-center py-12"><p>Loading...</p></div>;
  }

  if (!dog) {
    return <div className="text-center py-12"><p>Dog not found</p></div>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'adopted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 border-b-4 border-orange-700">
        <div className="container mx-auto px-4">
          <Link to="/dogs" className="flex items-center gap-2 text-orange-100 hover:text-white transition-colors mb-4">
            <FiArrowLeft /> Powrót do psów
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image */}
          <div className="lg:col-span-2">
            {dog.photo ? (
              <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover rounded-lg shadow-lg" />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-amber-200 rounded-lg flex items-center justify-center">
                <span className="text-9xl">🐕</span>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="bg-white rounded-lg shadow-lg p-8 h-fit border-t-4 border-orange-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{dog.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{dog.breed}</p>

            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(dog.status)}`}>
                {dog.status === 'available' ? 'Do adopcji' : dog.status === 'pending' ? 'W trakcie' : 'Adoptowany'}
              </span>
            </div>

            {/* Details Grid */}
            <div className="space-y-4 mb-8">
              {dog.age && (
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-gray-600 text-sm">Wiek</p>
                  <p className="text-2xl font-bold text-gray-800">{dog.age} {dog.age === 1 ? 'rok' : 'lat'}</p>
                </div>
              )}

              {dog.gender && (
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-gray-600 text-sm">Płeć</p>
                  <p className="text-2xl font-bold text-gray-800">{dog.gender === 'Male' ? 'Samiec' : 'Samica'}</p>
                </div>
              )}

              {dog.weight && (
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-gray-600 text-sm">Waga</p>
                  <p className="text-2xl font-bold text-gray-800">{dog.weight} kg</p>
                </div>
              )}

              {dog.color && (
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-gray-600 text-sm">Kolor</p>
                  <p className="text-2xl font-bold text-gray-800">{dog.color}</p>
                </div>
              )}
            </div>

            {/* Contact Button */}
            <a
              href="mailto:kontakt@schroniskoazyl.eu"
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-center block"
            >
              Adoptuj {dog.name}
            </a>
          </div>
        </div>

        {/* Description */}
        {dog.description && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-8 border-l-4 border-orange-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">O {dog.name}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{dog.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
