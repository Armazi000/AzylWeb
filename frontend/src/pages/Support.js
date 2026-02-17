import React from 'react';
import { FiCheck } from 'react-icons/fi';

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

            <h4 className="font-semibold text-gray-800 mb-4">Co udało nam się osiągnąć dzięki Twojej pomocy:</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <FiCheck className="text-green-600 flex-shrink-0 mt-1 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">2009-2010</p>
                  <p className="text-gray-700">Zakupiliśmy nowe kojce dla naszych psów</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiCheck className="text-green-600 flex-shrink-0 mt-1 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">2010-2011</p>
                  <p className="text-gray-700">Zbudowaliśmy sale zabiegowe i pielęgnacyjne</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiCheck className="text-green-600 flex-shrink-0 mt-1 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">2011-2012</p>
                  <p className="text-gray-700">Zrobiliśmy remont kuchni schroniska</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiCheck className="text-green-600 flex-shrink-0 mt-1 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">2012-2013</p>
                  <p className="text-gray-700">Wykonaliśmy przyłącze wody</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FiCheck className="text-green-600 flex-shrink-0 mt-1 text-xl" />
                <div>
                  <p className="font-semibold text-gray-800">2014-2017</p>
                  <p className="text-gray-700">Ulepszaliśmy wybiegi, place zabaw i ogrodzenia</p>
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
                <li>✓ Codziennej opieki i karmienia</li>
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
