import React from 'react';

const beforePhotos = [
  '/shelter/foto11.jpg',
  '/shelter/foto12.jpg',
  '/shelter/foto13.jpg',
  '/shelter/foto14.jpg',
  '/shelter/foto15.jpg',
  '/shelter/foto16.jpg'
];

const afterPhotos = [
  '/shelter/foto1-300x200.jpg',
  '/shelter/foto2-300x200.jpg',
  '/shelter/foto3-300x200.jpg',
  '/shelter/foto4-300x200.jpg',
  '/shelter/foto5-300x200.jpg',
  '/shelter/foto6-300x200.jpg'
];

export default function Support() {

  return (
    <div className="fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Wspomóż nas</h1>
          <p className="text-lg text-orange-100">Pomóż nam zaopiekować się naszymi zwierzętami</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Financial Support */}
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Wsparcie finansowe</h2>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-orange-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">1,5% podatku</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Wspomóż Schronisko AZYL, przekazując 1,5% swojego podatku! To jest jedno z najważniejszych źródeł finansowania, które pozwala nam dokonywać znaczących ulepszeń urządzeń schroniska.
            </p>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 mb-6 border-l-4 border-orange-500">
              <p className="font-semibold text-gray-800 mb-3">Szczegóły organizacji:</p>
              <p className="text-gray-700 mb-2"><strong>Nazwa:</strong> Stowarzyszenie Przyjaciół Zwierząt AZYL</p>
              <p className="text-gray-700 mb-2"><strong>Konto bankowe:</strong> 59 9527 0007 0033 6457 2000 0001</p>
              <p className="text-gray-700 mb-2"><strong>KRS:</strong> 0000062210</p>
              <p className="text-gray-700"><strong>Adres:</strong> ul. Brzegowa 151, 58-200 Dzierżoniów</p>
            </div>

            <h4 className="font-semibold text-gray-800 mb-8">Nasza transformacja - Przed i Po:</h4>
            
            {/* Before/After Transformation Section */}
            <div className="mb-8">
              {/* Before Section */}
              <div className="mb-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 flex-1 bg-gradient-to-r from-gray-400 to-gray-300 rounded-full"></div>
                  <h5 className="text-2xl font-bold text-gray-700 whitespace-nowrap px-4 py-2 bg-gray-100 rounded-full shadow-sm">
                    📸 Tak było w latach 1996–2004
                  </h5>
                  <div className="h-1 flex-1 bg-gradient-to-l from-gray-400 to-gray-300 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {beforePhotos.map((photo, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg border-2 border-gray-200">
                      <img src={photo} alt={`Przed ${index + 1}`} className="w-full h-52 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <span className="absolute bottom-2 left-2 bg-gray-800/80 text-white px-3 py-1 rounded-lg text-xs font-bold tracking-wide">PRZED</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow Divider */}
              <div className="flex items-center justify-center my-8">
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
                <div className="mx-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
              </div>

              {/* After Section */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 flex-1 bg-gradient-to-r from-green-400 to-green-300 rounded-full"></div>
                  <h5 className="text-2xl font-bold text-green-700 whitespace-nowrap px-4 py-2 bg-green-50 rounded-full shadow-sm">
                    ✨ A tak jest obecnie
                  </h5>
                  <div className="h-1 flex-1 bg-gradient-to-l from-green-400 to-green-300 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {afterPhotos.map((photo, index) => (
                    <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg border-2 border-green-200">
                      <img src={photo} alt={`Po ${index + 1}`} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <span className="absolute bottom-2 left-2 bg-green-600/80 text-white px-3 py-1 rounded-lg text-xs font-bold tracking-wide">TERAZ</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Other Ways to Help */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-orange-500">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">🎁</span> Dary rzeczowe
              </h4>
              <p className="text-gray-700 mb-4">
                Chętnie przyjmujemy dary w postaci:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Karmy dla psów i przysmaki</li>
                <li>✓ Materiałów medycznych</li>
                <li>✓ Pościeli i koców</li>
                <li>✓ Zabawek i przedmiotów wzbogacających</li>
                <li>✓ Środków czyszczących</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-orange-500">
              <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-3xl">🤝</span> Wolontariat
              </h4>
              <p className="text-gray-700">
                Pomóż nam zaopiekować się naszymi psami! Potrzebujemy wolontariuszy do:
              </p>
              <ul className="space-y-2 text-gray-700 mt-4">
                <li>✓ Spacerów i socjalizacji psów</li>
                <li>✓ Organizacji akcji zbiórkowych</li>
                <li>✓ Pomocy w adopcji i promocji schroniska</li>
              </ul>
              <a href="mailto:kontakt@schroniskoazyl.eu" className="mt-4 inline-block text-orange-600 font-semibold hover:text-orange-700">
                Skontaktuj się, aby zostać wolontariuszem →
              </a>
            </div>
          </div>
        </section>


      </div>
    </div>
  );
}
