import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleSliderChange = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newPosition = ((e.clientX || e.touches?.[0].clientX) - rect.left) / rect.width * 100;
      setSliderPosition(Math.max(0, Math.min(100, newPosition)));
    }
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? beforePhotos.length - 1 : prev - 1));
    setSliderPosition(50);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === beforePhotos.length - 1 ? 0 : prev + 1));
    setSliderPosition(50);
  };

  React.useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleMouseMoveEvent = (e) => {
      if (isDragging.current) {
        handleSliderChange(e);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMoveEvent);
    document.addEventListener('mouseup', handleMouseUp);
    
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveEvent);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            
            {/* Before/After Slider Gallery */}
            <div className="flex flex-col gap-6 mb-8">
              {/* Main Slider Container */}
              <div
                ref={containerRef}
                className="relative w-full bg-gray-200 rounded-lg overflow-hidden shadow-lg cursor-col-resize select-none"
                style={{ height: '400px', maxHeight: '500px' }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
                onTouchMove={handleSliderChange}
                onTouchEnd={handleMouseUp}
              >
                {/* Before Image (Background) */}
                <img
                  src={beforePhotos[currentIndex]}
                  alt="Przed"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23e0e0e0" width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="18">Brak zdjęcia</text></svg>';
                  }}
                />

                {/* After Image (Slider Overlay) */}
                <div
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={afterPhotos[currentIndex]}
                    alt="Po"
                    className="absolute top-0 left-0 h-full object-cover"
                    style={{ width: '3000px' }}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect fill="%23e0e0e0" width="400" height="300"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="18">Brak zdjęcia</text></svg>';
                    }}
                  />
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg hover:bg-orange-500 transition-colors"
                  style={{
                    left: `${sliderPosition}%`,
                    transform: 'translateX(-50%)',
                    cursor: 'col-resize',
                  }}
                >
                  {/* Handle Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                    <div className="flex gap-1">
                      <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" />
                      </svg>
                      <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 4a1 1 0 001 1v10a1 1 0 11-2 0V5a1 1 0 011-1z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Before/After Labels */}
                <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-60 text-white px-3 py-1 rounded text-sm font-semibold">
                  Przed
                </div>
                <div className="absolute top-4 right-4 bg-green-600 bg-opacity-60 text-white px-3 py-1 rounded text-sm font-semibold">
                  Po
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={goToPrevious}
                  className="flex-shrink-0 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors shadow-md"
                  aria-label="Poprzednie zdjęcie"
                >
                  <FiChevronLeft size={24} />
                </button>

                {/* Counter */}
                <div className="flex-1 text-center">
                  <p className="text-gray-700 font-semibold">
                    Zdjęcie {currentIndex + 1} z {beforePhotos.length}
                  </p>
                  <p className="text-sm text-gray-500">Przeciągnij slider aby porównać</p>
                </div>

                <button
                  onClick={goToNext}
                  className="flex-shrink-0 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg transition-colors shadow-md"
                  aria-label="Następne zdjęcie"
                >
                  <FiChevronRight size={24} />
                </button>
              </div>

              {/* Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-gray-700">
                <p className="font-semibold mb-2">💡 Transformacja schroniska</p>
                <p>Przeciągnij białą linię aby porównać stan przed i po modernizacji. Używaj strzałek aby przejrzeć pozostałe zdjęcia.</p>
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
