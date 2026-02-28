import React, { useState, useEffect, useRef } from 'react';

const TEXT_SIZES = [
  { label: 'Normalny', value: 'normal', scale: '100%' },
  { label: 'Duży', value: 'large', scale: '118%' },
  { label: 'Bardzo duży', value: 'x-large', scale: '136%' },
];

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('a11y-contrast') === 'true');
  const [textSize, setTextSize] = useState(() => {
    const saved = localStorage.getItem('a11y-text-size');
    return TEXT_SIZES.find(s => s.value === saved) ? saved : 'normal';
  });
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // Apply settings to <html>
  useEffect(() => {
    const root = document.documentElement;

    // High contrast
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('a11y-contrast', highContrast);

    // Text size
    TEXT_SIZES.forEach(s => root.classList.remove(`text-size-${s.value}`));
    root.classList.add(`text-size-${textSize}`);
    localStorage.setItem('a11y-text-size', textSize);
  }, [highContrast, textSize]);

  // Close panel on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        isOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const currentSizeIndex = TEXT_SIZES.findIndex(s => s.value === textSize);

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(o => !o)}
        aria-label="Opcje dostępności"
        aria-expanded={isOpen}
        className="a11y-toggle-btn"
        title="Dostępność"
      >
        {/* Universal accessibility icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7"
          aria-hidden="true"
        >
          <circle cx="12" cy="4.5" r="2" />
          <path d="M12 7v5" />
          <path d="M8 9h8" />
          <path d="M9 18l3-6 3 6" />
        </svg>
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Ustawienia dostępności"
          className="a11y-panel"
        >
          <h2 className="text-lg font-bold mb-4 text-gray-800 high-contrast:text-black">
            ♿ Dostępność
          </h2>

          {/* High Contrast Toggle */}
          <div className="mb-5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="font-medium text-gray-700">Wysoki kontrast</span>
              <button
                role="switch"
                aria-checked={highContrast}
                onClick={() => setHighContrast(v => !v)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 ${
                  highContrast ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </label>
          </div>

          {/* Text Size */}
          <div>
            <span className="font-medium text-gray-700 block mb-2">Rozmiar tekstu</span>
            <div className="flex gap-2">
              {TEXT_SIZES.map((size, i) => (
                <button
                  key={size.value}
                  onClick={() => setTextSize(size.value)}
                  aria-pressed={textSize === size.value}
                  className={`flex-1 py-2 px-1 rounded-lg text-center font-semibold transition-all border-2 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                    textSize === size.value
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-orange-400'
                  }`}
                  style={{ fontSize: `${13 + i * 3}px` }}
                  title={size.label}
                >
                  A
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              {TEXT_SIZES[currentSizeIndex].label}
            </p>
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setHighContrast(false);
              setTextSize('normal');
            }}
            className="mt-4 w-full py-2 text-sm text-gray-500 hover:text-orange-600 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Resetuj ustawienia
          </button>
        </div>
      )}
    </div>
  );
}
