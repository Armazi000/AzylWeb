import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'schronisko2024';

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Store session in localStorage
      localStorage.setItem('adminSession', JSON.stringify({
        loggedIn: true,
        timestamp: new Date().getTime()
      }));
      navigate('/admin/dashboard');
    } else {
      setError('Niewaściwe dane logowania');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">Panel Admina</h1>
          <p className="text-gray-600 text-center mb-8">Zarządzaj zawartością schroniska</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nazwa użytkownika</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Wpisz nazwę użytkownika"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Hasło</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Wpisz hasło"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-colors transform hover:scale-105"
            >
              Zaloguj się
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600">
              <strong>Demo dane:</strong><br/>
              Username: admin<br/>
              Password: schronisko2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
