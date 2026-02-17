import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Home() {
  const [stats, setStats] = useState({ total: 0, available: 0, adopted: 0, pending: 0 });
  const [recentDogs, setRecentDogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, dogsRes] = await Promise.all([
          axios.get(`${API_URL}/api/stats`),
          axios.get(`${API_URL}/api/dogs`)
        ]);
        setStats(statsRes.data);
        setRecentDogs(dogsRes.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 text-white py-32 relative overflow-hidden" style={{backgroundImage: 'url(/hero-animals.jpg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">Dobra opcja<br /><span className="text-orange-200">to adopcja!</span></h1>
              <p className="text-lg text-orange-50 mb-8 leading-relaxed">
                Stowarzyszenie Przyjaciół Zwierząt "Azyl" w Dzierżoniowie. Sprawdź nasze zwierzęta czekające na kochający dom.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/dogs"
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  Poznaj zwierzęta <FiArrowRight />
                </Link>
                <Link
                  to="/support"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all shadow-lg"
                >
                  Jak pomóc
                </Link>
              </div>
            </div>
            <div className="text-center hidden md:block relative h-80">
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dogs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Nasi podopieczni</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recentDogs.map(dog => (
              <Link key={dog.id} to={`/dogs/${dog.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2 h-full border-t-4 border-orange-500">
                  {dog.photo && (
                    <img src={dog.photo} alt={dog.name} className="w-full h-64 object-cover" />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{dog.name}</h3>
                    <p className="text-gray-600 mb-4 font-semibold">{dog.breed}</p>
                    {dog.age && <p className="text-sm text-gray-500 mb-3">Wiek: {dog.age} {dog.age === 1 ? 'rok' : 'lat'}</p>}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
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
          <div className="text-center">
            <Link
              to="/dogs"
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-700 transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Poznaj wszystkie psy <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">💙</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Opieka z miłością</h3>
              <p className="text-gray-600">Każdy pies w naszym schronisku otrzymuje pełną opiekę medyczną, odżywienie i miłość.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🏥</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Opieka medyczna</h3>
              <p className="text-gray-600">Współpracujemy z profesjonalnymi weterynarzami, aby zapewnić najlepszą opiekę zdrowotną.</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🏡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Nowy dom</h3>
              <p className="text-gray-600">Naszym celem jest znaleźć każdemu psu kochającą rodzinę i stały dom.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 1% Tax Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">💗</div>
            <h2 className="text-4xl font-bold mb-4">Przekaż 1,5% podatku</h2>
            <p className="text-lg text-orange-50 mb-8 max-w-2xl mx-auto">
              Przekaż 1% swojego podatku na schronisko Azyl w Dzierżoniowie.
              Twoje wsparcie ratuje życie bezdomnym zwierzętom.
            </p>
          </div>
          <div className="bg-orange-600 rounded-lg p-8 inline-block shadow-lg">
            <p className="text-sm text-orange-100 mb-2 font-semibold">Numer KRS</p>
            <p className="text-5xl font-bold text-white mb-4">0000062210</p>
            <p className="text-sm text-orange-100">Stowarzyszenie Przyjaciół Zwierząt "Azyl"</p>
          </div>
        </div>
      </section>

      {/* Partner Towns Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Gminy partnerskie</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Współpracujemy z gminami regionu, zapewniając opiekę bezdomnym zwierzętom.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Piława Górna
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Dobromierz
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Niemcza
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Pieszyce
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Kobierzyce
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Łagiewniki
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Wiejska Dzierżoniów
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Bielawa
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-orange-100 hover:text-orange-700 transition-colors">
              Gmina Miejska Dzierżoniów
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
