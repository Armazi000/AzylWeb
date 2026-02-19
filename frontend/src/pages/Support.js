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
  '/shelter/foto1-300-200.jpg',
  '/shelter/foto2-300-200.jpg',
  '/shelter/foto3-300-200.jpg',
  '/shelter/foto4-300-200.jpg',
  '/shelter/foto5-300-200.jpg',
  '/shelter/foto6-300-200.jpg'
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
            
            {/* Photo Grid Gallery */}
            <div className="space-y-4 mb-8">
              {beforePhotos.map((_, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  {/* Before */}
                  <div className="bg-gradient-to-b from-gray-100 to-gray-50 rounded-lg p-2 shadow-md">
                    <p className="text-xs font-semibold text-gray-600 mb-2 text-center">Przed</p>
                    <div className="relative bg-white rounded overflow-hidden shadow-sm">
                      <img 
                        src={beforePhotos[index]} 
                        alt={`Schronisko przed - zdjęcie ${index + 1}`}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect fill="%23e0e0e0" width="300" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="12">Brak zdjęcia</text></svg>';
                        }}
                      />
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-gradient-to-b from-green-100 to-green-50 rounded-lg p-2 shadow-md">
                    <p className="text-xs font-semibold text-green-600 mb-2 text-center">Po</p>
                    <div className="relative bg-white rounded overflow-hidden shadow-sm">
                      <img 
                        src={afterPhotos[index]} 
                        alt={`Schronisko po - zdjęcie ${index + 1}`}
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><rect fill="%23e0e0e0" width="300" height="200"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="12">Brak zdjęcia</text></svg>';
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-gray-700">
              <p className="font-semibold mb-2">💡 Transformacja schroniska</p>
              <p>Dzięki Waszemu wsparciu mogliśmy dokonać znaczących ulepszeń. Porównaj zdjęcia przed i po, aby zobaczyć zmianę!</p>
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
                <li>✓ Czyszczenia i utrzymania</li>
                <li>✓ Spacerów i socjalizacji psów</li>
                <li>✓ Organizacji akcji zbiórkowych</li>
                <li>✓ Pracy administracyjnej</li>
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
