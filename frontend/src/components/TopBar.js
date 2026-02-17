import React from 'react';
import { FiPhone, FiClock, FiMapPin, FiFacebook } from 'react-icons/fi';

export default function TopBar() {
  return (
    <div className="bg-orange-600 text-white text-sm py-2 hidden md:block">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <FiClock className="text-lg" />
            <span>Pon-Pt: 10:00-15:45 | Sob: 10:00-14:45</span>
          </div>
          <div className="flex items-center gap-2">
            <FiMapPin className="text-lg" />
            <span>ul. Brzegowa 151, Dzierżoniów</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FiFacebook className="text-lg" />
          <a href="tel:+48748311800" className="hover:text-orange-100 transition-colors">
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
