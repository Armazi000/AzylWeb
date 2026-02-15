import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiMail } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#2e241f] text-white">
      {/* Top Border */}
      <div className="h-1 bg-orange-500"></div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🐕</div>
              <h3 className="text-xl font-bold text-orange-500">Schronisko Azyl</h3>
            </div>
            <p className="text-sm text-white mb-6 leading-relaxed">
              Stowarzyszenie Przyjaciół Zwierząt "Azyl" w Dzierżoniowie. Pomagamy bezdomnym zwierzętom znaleźć kochające domy.
            </p>
            <a 
              href="https://web.facebook.com/schroniskoazylddz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors"
            >
              <FaFacebook className="text-lg" />
              <span>Facebook</span>
            </a>
          </div>

          {/* Column 2: Adopcja */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Szybkie Linki</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/dogs" className="text-white hover:text-orange-500 transition-colors">
                  Psy do adopcji
                </Link>
              </li>
              <li>
                <a href="/about" className="text-white hover:text-orange-500 transition-colors">
                  O Schronisku
                </a>
              </li>
              <li>
                <a href="/przetargi" className="text-white hover:text-orange-500 transition-colors">
                  Przetargi
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Jak pomóc */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Jak pomóc</h3>
            <ul className="space-y-3">
              <li>
                <a href="/support" className="text-white hover:text-orange-500 transition-colors">
                  Wolontariat
                </a>
              </li>
              <li>
                <a href="/support" className="text-white hover:text-orange-500 transition-colors">
                  Darowiznę
                </a>
              </li>
              <li>
                <Link to="/support" className="text-white hover:text-orange-500 transition-colors">
                  1,5% podatku
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Kontakt */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Kontakt</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="text-orange-500 flex-shrink-0 mt-1 text-lg" />
                <span className="text-white">Dzierżoniów</span>
              </div>
              <div className="flex items-start gap-3">
                <FiClock className="text-orange-500 flex-shrink-0 mt-1 text-lg" />
                <span className="text-white">Pon-Pt: 10:00-15:45</span>
              </div>
              <div className="flex items-start gap-3">
                <FiMail className="text-orange-500 flex-shrink-0 mt-1 text-lg" />
                <a href="mailto:kontakt@schroniskoazyl.eu" className="text-white hover:text-orange-500 transition-colors">
                  kontakt@schroniskoazyl.eu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#1f1815] py-6 px-4">
        <div className="container mx-auto px-4 text-center text-sm text-white">
          © 2026 Schronisko Azyl – Stowarzyszenie Przyjaciół Zwierząt "Azyl" | KRS: 0000062210 | Stworzone z ❤️ przez <a href="https://github.com/Armazi000" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-400">Abyssal Echoes Labs</a>
        </div>
      </div>
    </footer>
  );
}
