import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaFacebook } from 'react-icons/fa';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post(`${API_URL}/api/messages`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      setError('Błąd przy wysyłaniu wiadomości. Spróbuj ponownie.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Skontaktuj się z nami</h1>
          <p className="text-lg text-orange-100">Jesteśmy dostępni dla Ciebie</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-orange-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Wyślij nam wiadomość</h2>

              {submitted && (
                <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                  ✓ Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się wkrótce.
                </div>
              )}

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                  ✕ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Imię i nazwisko *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="Twoje imię"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="twoj@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Temat *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="Temat wiadomości"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Wiadomość *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                    placeholder="Twoja wiadomość..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Wysyłanie...' : 'Wyślij wiadomość'}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Bezpośredni kontakt</h3>

              <a href="tel:+48748311800" className="flex items-start gap-4 mb-6 hover:text-orange-600 transition-colors group">
                <FiPhone className="text-orange-600 mt-1 flex-shrink-0 text-xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Telefon</p>
                  <p className="text-gray-800 font-bold">+48 74 83 11 800</p>
                </div>
              </a>

              <a href="mailto:kontakt@schroniskoazyl.eu" className="flex items-start gap-4 mb-6 hover:text-orange-600 transition-colors group">
                <FiMail className="text-orange-600 mt-1 flex-shrink-0 text-xl group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Email</p>
                  <p className="text-gray-800 font-bold">kontakt@schroniskoazyl.eu</p>
                </div>
              </a>

              <div className="flex items-start gap-4 mb-6">
                <FiMapPin className="text-orange-600 mt-1 flex-shrink-0 text-xl" />
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Adres</p>
                  <p className="text-gray-800">ul. Brzegowa 151<br />58-200 Dzierżoniów, Polska</p>
                </div>
              </div>

              <a href="https://web.facebook.com/schroniskoazylddz/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-orange-600 hover:text-orange-700 transition-colors group">
                <FaFacebook className="text-2xl group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Śledź nas na Facebooku</span>
              </a>
            </div>

            {/* Hours */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FiClock className="text-orange-600" /> Godziny otwarcia
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-800">Poniedziałek - Piątek</p>
                  <p className="text-gray-700">9:00 - 15:30</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Sobota</p>
                  <p className="text-gray-700">9:00 - 14:00</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Niedziela</p>
                  <p className="text-red-600 font-semibold">Zamknięte</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
