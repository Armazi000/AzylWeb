import React from 'react';
import { FiDownload } from 'react-icons/fi';

export default function Przetargi() {
  const tenderGroups = [
    {
      title: "Ogłoszenie zamowienie na sterylizację i kastrację na rok 2025",
      files: [
        { name: "umowa", filename: "umowa-sterylizacje-2025.odt" },
        { name: "druk oferty", filename: "druk-oferty-sterylizacje-2025.odt" },
        { name: "zapytanie ofertowe – sterylizacja", filename: "zapytanie-ofertowe-sterylizacje-2025.odt" }
      ]
    },
    {
      title: "Ogłoszenie zamówienia na usługi weterynaryjne na rok 2025",
      files: [
        { name: "druk oferty – weterynarz", filename: "druk-oferty-weterynarz-2025.odt" },
        { name: "umowa – załącznik nr 3", filename: "umowa-zalaczniknr3-weterynarz-2025.doc" },
        { name: "zapytanie ofertowe usługi weterynaryjne", filename: "zapytanie-ofertowe-uslugi-weterynaryjne-2025.odt" }
      ]
    },
    {
      title: "Ogłoszenie zamowienie na sterylizację i kastrację na rok 2024",
      files: [
        { name: "umowa", filename: "umowa-2024.pdf" },
        { name: "druk oferty", filename: "druk-oferty-2024.pdf" },
        { name: "zapytanie ofertowe – sterylizacja", filename: "zapytanie-sterylizacja-2024.pdf" }
      ]
    },
    {
      title: "Ogłoszenie zamówienia na usługi weterynaryjne na rok 2024",
      files: [
        { name: "druk oferty – weterynarz", filename: "druk-oferty-weterynarz-2024.pdf" },
        { name: "umowa – załącznik nr 3", filename: "umowa-zalacznik-3-2024.pdf" },
        { name: "zapytanie ofertowe usługi weterynaryjne", filename: "zapytanie-weterynarz-2024.pdf" }
      ]
    },
    {
      title: "Konkurs na usługi weterynaryjne na rok 2023",
      files: [
        { name: "oferta konkursowa weterynarz", filename: "oferta-konkursowa-2023.pdf" },
        { name: "oświadczenie o spełnianiu warunków", filename: "oswiadczenie-2023.pdf" }
      ]
    },
    {
      title: "Ogłoszenie zamówienia na usługi weterynaryjne na rok 2023",
      files: [
        { name: "druk oferty – weterynarz", filename: "druk-oferty-weterynarz-2023.pdf" },
        { name: "umowa – załącznik nr 3", filename: "umowa-zalacznik-3-2023.pdf" },
        { name: "zapytanie ofertowe usługi weterynaryjne", filename: "zapytanie-weterynarz-2023.pdf" }
      ]
    },
    {
      title: "Konkurs na usługi weterynaryjne na rok 2022",
      files: [
        { name: "oferta konkursowa weterynarz", filename: "oferta-konkursowa-2022.pdf" },
        { name: "oświadczenie o spełnianiu warunków", filename: "oswiadczenie-2022.pdf" }
      ]
    },
    {
      title: "Konkurs na usługi weterynaryjne na rok 2021",
      files: [
        { name: "Oferta konkursowa – Weterynarz", filename: "oferta-konkursowa-2021.pdf" },
        { name: "Oświadczenie o spełnianiu warunków – Weterynarz", filename: "oswiadczenie-2021.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – remont Biura Obsługi Klienta na 2020",
      files: [
        { name: "Przedmiar", filename: "przedmiar-2020.pdf" },
        { name: "Ogłoszenie", filename: "ogloszenie-2020.pdf" },
        { name: "Formularz", filename: "formularz-2020.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – remont magazynu karmy, korytarza przy magazynach oraz magazynów posłań dla psów na 2020",
      files: [
        { name: "Przedmiar", filename: "przedmiar-magazyn-2020.pdf" },
        { name: "Ogłoszenie", filename: "ogloszenie-magazyn-2020.pdf" },
        { name: "Formularz", filename: "formularz-magazyn-2020.pdf" }
      ]
    },
    {
      title: "Konkurs na usługi weterynaryjne 2019 X-XII /2020",
      files: [
        { name: "Oferta konkursowa – Weterynarz", filename: "oferta-konkursowa-2019-2020.pdf" },
        { name: "Oświadczenie o spełnieniu warunków – Weterynarz", filename: "oswiadczenie-2019-2020.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – remont hali w budynku nr 1 oraz izolatki na 2019",
      files: [
        { name: "Przedmiar", filename: "przedmiar-budynek1-2019.pdf" },
        { name: "Ogłoszenie", filename: "ogloszenie-budynek1-2019.pdf" },
        { name: "Formularz", filename: "formularz-budynek1-2019.pdf" }
      ]
    },
    {
      title: "Ogłoszenie konkursu na kompleksowe usługi weterynaryjne na 2019 rok",
      files: [
        { name: "Oferta konkursowa – Weterynarz", filename: "oferta-konkursowa-kompleksowe-2019.pdf" },
        { name: "Oświadczenie o spełnieniu warunków – Weterynarz", filename: "oswiadczenie-kompleksowe-2019.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – Remont hali w budynku nr 3 (kwarantanna) na rok 2018",
      files: [
        { name: "Remont hali w budynku nr 3 (kwarantanna)- przedmiar", filename: "przedmiar-budynek3-2018.pdf" },
        { name: "Remont hali w budynku nr 3 (kwarantanna)- ogłoszenie", filename: "ogloszenie-budynek3-2018.pdf" },
        { name: "Remont hali w budynku nr 3 (kwarantanna) – formularz", filename: "formularz-budynek3-2018.pdf" }
      ]
    },
    {
      title: "Zamówienie na usługi weterynaryjne na rok 2018",
      files: [
        { name: "Oferta konkursowa – Weterynarz", filename: "oferta-weterynarz-2018.pdf" },
        { name: "Oświadczenie o spełnianiu warunków – Weterynarz", filename: "oswiadczenie-2018.pdf" }
      ]
    },
    {
      title: "Zawiadomienie o wyborze oferty na remont hali w budynku nr 2 na rok 2017",
      files: [
        { name: "Wybór oferty", filename: "wybor-oferty-2017.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – Remont hali w budynku nr 2 na rok 2017",
      files: [
        { name: "Remont hali w budynku nr 2 – przedmiar", filename: "przedmiar-budynek2-2017.pdf" },
        { name: "Remont hali w budynku nr 2 – ogłoszenie", filename: "ogloszenie-budynek2-2017.pdf" },
        { name: "Remont hali w budynku nr 2 – formularz", filename: "formularz-budynek2-2017.pdf" }
      ]
    },
    {
      title: "Zamówienie na usługi weterynaryjne na rok 2017",
      files: [
        { name: "Oferta konkursowa – Weterynarz", filename: "oferta-weterynarz-2017.pdf" },
        { name: "Oświadczenie o spełnianiu warunków – Weterynarz", filename: "oswiadczenie-2017.pdf" }
      ]
    },
    {
      title: "Wyniki przetargu na remont ciagów pieszych i pieszo-jezdnych na terenie schroniska",
      files: [
        { name: "Wyniki przetargu", filename: "wyniki-przetargu.pdf" }
      ]
    },
    {
      title: "Remont ciągów pieszych i pieszo-jezdnych na terenie schroniska",
      files: [
        { name: "Rysunek ZT", filename: "rysunek-zt.pdf" },
        { name: "Przedmiar", filename: "przedmiar-ciagi.pdf" },
        { name: "Opis techniczny", filename: "opis-techniczny.pdf" },
        { name: "SIWZ", filename: "siwz.pdf" },
        { name: "Załącznik nr 1 – formularz oferty", filename: "zalacznik-1.pdf" },
        { name: "Załącznik nr 2 – do SIWZ", filename: "zalacznik-2.pdf" },
        { name: "Załacznik nr 3 – oświadczenie (grupy kapitałowe)", filename: "zalacznik-3.pdf" },
        { name: "Załacznik nr 4 – oświadczenie wykonawcy", filename: "zalacznik-4.pdf" },
        { name: "Załacznik nr 5 – do SIWZ (wykaz osób)", filename: "zalacznik-5.pdf" },
        { name: "Załącznik nr 6 – do SIWZ (oświadczenie)", filename: "zalacznik-6.pdf" },
        { name: "Załacznik nr 7 – wykaz wykonanych robót budowlanych", filename: "zalacznik-7.pdf" },
        { name: "Załacznik rn 8 – do SIWZ (projekt umowy)", filename: "zalacznik-8.pdf" }
      ]
    },
    {
      title: "Zamówienie na usługi weterynaryjne na rok 2016",
      files: [
        { name: "Oferta konkursowa – Weterynarz", filename: "oferta-weterynarz-2016.pdf" },
        { name: "Oświadczenie o spełnianiu warunków – Weterynarz", filename: "oswiadczenie-2016.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – Wymiana posadzki z płytek ceramicznych oraz licowanie ścian płytkami ceramicznymi budynku nr 2 schroniska",
      files: [
        { name: "Przedmiar", filename: "przedmiar-posadzka-2016.pdf" },
        { name: "Ogłoszenie", filename: "ogloszenie-posadzka-2016.pdf" },
        { name: "Formularz", filename: "formularz-posadzka-2016.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – Zadaszenie wybiegów w budynku nr 2 schroniska na rok 2015",
      files: [
        { name: "Przedmiar", filename: "przedmiar-zadaszenie-2015.pdf" },
        { name: "Ogłoszenie", filename: "ogloszenie-zadaszenie-2015.pdf" },
        { name: "Oferta", filename: "oferta-zadaszenie-2015.pdf" }
      ]
    },
    {
      title: "Zamówienie na usługi weterynaryjne na rok 2015",
      files: [
        { name: "Oferta konkursowa – Weterynarz", filename: "oferta-weterynarz-2015.pdf" },
        { name: "Oświadczenie o spełnianiu warunków – Weterynarz", filename: "oswiadczenie-2015.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – Zadaszenie istniejących boksów w budynku nr 1 i 3 schroniska",
      files: [
        { name: "Przedmiar", filename: "przedmiar-boksy-2015.pdf" },
        { name: "Ogłoszenie", filename: "ogloszenie-boksy-2015.pdf" },
        { name: "Formularz", filename: "formularz-boksy-2015.pdf" }
      ]
    },
    {
      title: "Ogłoszenie na roboty budowlane – Wymiana posadzki z płytek ceramicznych budynków nr 1 i 3 schroniska dla bezdomnych zwierząt ul. Brzegowa 151 w Dzierżoniowie zgodnie z przedmiarem",
      files: [
        { name: "Przedmiar", filename: "przedmiar-wymiana-2015.pdf" },
        { name: "Ogłoszenie", filename: "ogloszenie-wymiana-2015.pdf" },
        { name: "Formularz", filename: "formularz-wymiana-2015.pdf" }
      ]
    }
  ];

  return (
    <div className="fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Przetargi</h1>
          <p className="text-lg text-orange-100">Procedury przetargowe schroniska</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="space-y-6">
          {tenderGroups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 border-l-4 border-orange-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{group.title}</h2>
              <ul className="space-y-3">
                {group.files.map((file, fileIndex) => (
                  <li key={fileIndex} className="flex items-center gap-3">
                    <a 
                      href={`/documents/${file.filename}`}
                      download
                      className="flex items-center gap-2 text-orange-600 hover:text-orange-700 hover:underline transition-colors font-medium"
                    >
                      <FiDownload className="text-lg" />
                      <span>{file.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-8 border-t-4 border-orange-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Informacje o przetargach</h3>
          <p className="text-gray-700 mb-4">
            Schronisko AZYL przeprowadza przetargi zgodnie z obowiązującymi przepisami prawa. 
            Wszystkie procedury przetargowe są przejrzyste i otwarte dla uprawnionych wykonawców.
          </p>
          <p className="text-gray-700">
            W przypadku pytań dotyczących procedur przetargowych prosimy o kontakt poprzez formularz kontaktowy 
            lub bezpośrednio pod numerem telefonu schroniska.
          </p>
        </div>
      </div>
    </div>
  );
}
