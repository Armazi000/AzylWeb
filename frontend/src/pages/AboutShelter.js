import React from 'react';

export default function AboutShelter() {
  return (
    <div className="fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">O Schronisku AZYL</h1>
          <p className="text-lg text-orange-100">Nasza historia i misja</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* History */}
            <section className="bg-white rounded-lg shadow-md p-8 border-l-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nasza historia</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                W 1992 roku założono Stowarzyszenie Przyjaciół Zwierząt "AZYL" z zamiarem stworzenia schroniska dla porzuconych zwierząt. Po czterech latach poświęconej pracy, w lutym 1996 roku, przy współudziale władz miasta Dzierżoniowa, Bielawy i Świdnicy, schronisko zostało oficjalnie utworzone i przyjęło nazwę "AZYL".
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Przez lata borykało się z wieloma problemami. Jednak 11 grudnia 2004 roku wybrany został nowy zarząd, który wszystkie swoje działania skierował na rozwój i poprawianie warunków bytowych znajdujących się w nim zwierząt.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Dzisiaj nasze schronisko może zapewnić schronienie 250 psom i wciąż się rozwija dzięki hojnym darowiznom, szczególnie z inicjatywy 1,5% podatku, co pozwala nam na dokonywanie znaczących ulepszeń w naszych urządzeniach każdego roku.
              </p>
            </section>

            {/* Mission */}
            <section className="bg-white rounded-lg shadow-md p-8 border-l-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nasza misja</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-4xl">🏠</div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-600 mb-2">Zapewnić bezpieczne schronienie</h3>
                    <p className="text-gray-700">
                      Oferujemy opiekę, wsparcie i ochronę porzuconym i zaniedbanym zwierzętom, zapewniając im bezpieczne miejsce do regeneracji i uzdrowienia.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-4xl">❤️</div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-600 mb-2">Znaleźć nowe domy</h3>
                    <p className="text-gray-700">
                      Naszym głównym celem jest dopasowanie każdego psa do kochających rodzin, gdzie mogą doświadczać szczęścia i towarzyszczą.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-4xl">🏥</div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-600 mb-2">Opieka medyczna</h3>
                    <p className="text-gray-700">
                      Zapewniamy kompleksową opiekę weterynaryjną, w tym leczenie, rehabilitację i medycynę profilaktyczną dla wszystkich naszych podopiecznych.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-4xl">🎓</div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-600 mb-2">Edukacja i obrona</h3>
                    <p className="text-gray-700">
                      Promujemy odpowiedzialną opiekę nad zwierzętami i świadomość dobrostanu zwierząt w naszych społecznościach.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="bg-white rounded-lg shadow-md p-8 border-l-4 border-orange-500">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Zarząd</h2>
              <p className="text-gray-700 mb-6">
                Sukces Schroniska AZYL zależy od członków zarządu którzy bez zmęczenia pracują, aby zaopiekować się naszymi zwierzętami.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 border-l-4 border-orange-500 pl-4 py-3">
                  <h4 className="font-semibold text-gray-800">Jerzy Thomalla</h4>
                  <p className="text-sm text-gray-600">Prezes</p>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 pl-4 py-3">
                  <h4 className="font-semibold text-gray-800">Justyna Kapuścińska</h4>
                  <p className="text-sm text-gray-600">Sekretarz</p>
                </div>
                <div className="bg-orange-50 border-l-4 border-orange-500 pl-4 py-3">
                  <h4 className="font-semibold text-gray-800">Adrian Kuśmierz</h4>
                  <p className="text-sm text-gray-600">Skarbnik</p>
                </div>
              </div>
              <p className="text-gray-700 mt-6">
                Oraz wielu poświęconych pracowników i wolontariuszy, którzy codziennie pracują, aby zaopiekować się naszymi zwierzętami i poprawiać ich życie.
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-md p-8 sticky top-24 border-t-4 border-orange-500">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Szybkie informacje</h3>
              <div className="space-y-4 text-sm">
                <div className="pb-4 border-b border-orange-200">
                  <p className="text-gray-600 font-semibold">Założono</p>
                  <p className="text-gray-800 text-lg font-bold">1992</p>
                </div>
                <div className="pb-4 border-b border-orange-200">
                  <p className="text-gray-600 font-semibold">Pojemność</p>
                  <p className="text-gray-800 text-lg font-bold">250 psów</p>
                </div>
                <div className="pb-4 border-b border-orange-200">
                  <p className="text-gray-600 font-semibold">Lokalizacja</p>
                  <p className="text-gray-800">Dzierżoniów, Polska</p>
                </div>
                <div className="pb-4 border-b border-orange-200">
                  <p className="text-gray-600 font-semibold">KRS</p>
                  <p className="text-gray-800">0000062210</p>
                </div>
                <div className="pt-2">
                  <p className="text-gray-600 font-semibold mb-2">Godziny otwarcia</p>
                  <p className="text-gray-800 text-xs">
                    <strong>Pn-Pt:</strong> 9:00-15:30<br />
                    <strong>So:</strong> 9:00-14:00<br />
                    <strong>Nd:</strong> Zamknięte
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
