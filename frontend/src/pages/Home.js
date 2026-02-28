import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
  const [recentDogs, setRecentDogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await fetch('/api/dogs'); // Facebook API — uncomment to re-enable
        const res = await fetch('/data/dogs.json');
        const data = await res.json();
        const dogs = Array.isArray(data) ? data : [];
        setRecentDogs(dogs.slice(0, 6));
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
                    <p className="text-gray-600 mb-4">{dog.description}</p>
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
              <img src="heart.png" alt="Opieka z miłością" className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Opieka z miłością</h3>
              <p className="text-gray-600">Każdy pies w naszym schronisku otrzymuje pełną opiekę medyczną, odżywienie i miłość.</p>
            </div>
            <div className="text-center">
              <img src="opieka2.png" alt="Opieka medyczna" className="mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Opieka medyczna</h3>
              <p className="text-gray-600">Współpracujemy z profesjonalnymi weterynarzami, aby zapewnić najlepszą opiekę zdrowotną.</p>
            </div>
            <div className="text-center">
              <img src="dom.png" alt="Nowy dom" className="mx-auto mb-4" />
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {[
              { name: 'Gmina Dzierżoniów', image: '/dzierzoniow.png' },
              { name: 'Gmina Miejska Dzierżoniów', image: '/dzierzoniowmiejski.png' },
              { name: 'Gmina Piława Górna', image: '/pilawa-gorna.png' },
              { name: 'Gmina Dobromierz', image: '/dobromierz.png' },
              { name: 'Gmina Bielawa', image: '/bielawa.png' },
              { name: 'Gmina Niemcza', image: '/niemcza.png' },
              { name: 'Gmina Pieszyce', image: '/pieszyce.png' },
              { name: 'Gmina Kobierzyce', image: '/kobierzyce.png' },
              { name: 'Gmina Łagiewniki', image: '/lagiewniki.png' },
            ].map((town, index) => (
              <div key={index} className="flex flex-col items-center group cursor-pointer">
                <div className="w-24 h-24 md:w-28 md:h-28 bg-gray-50 rounded-lg shadow-md overflow-hidden flex items-center justify-center hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <img 
                    src={town.image} 
                    alt={town.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-700 text-center group-hover:text-orange-600 transition-colors">
                  {town.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
