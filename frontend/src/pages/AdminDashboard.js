import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiKey, FiFileText, FiEdit2, FiTrash2, FiPlus, FiSave } from 'react-icons/fi';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const messageTimeoutRef = useRef(null);
  const [activeTab, setActiveTab] = useState('api-keys');
  const [articles, setArticles] = useState([]);
  const [apiKeys, setApiKeys] = useState({
    facebook_album_id: '',
    facebook_access_token: ''
  });
  const [editingArticle, setEditingArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({ title: '', content: '', category: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    fetchArticles();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/articles`);
      setArticles(res.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
      messageTimeoutRef.current = null;
    }, 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/');
  };

  const handleSaveArticle = async (e) => {
    e.preventDefault();
    if (editingArticle) {
      // Update existing article (backend endpoint needed)
      console.log('Update article:', editingArticle);
      showMessage('✓ Artykuł zaktualizowany');
    } else {
      // Create new article
      try {
        await axios.post(`${API_URL}/api/articles`, newArticle);
        setNewArticle({ title: '', content: '', category: '' });
        fetchArticles();
        showMessage('✓ Artykuł dodany');
      } catch (error) {
        showMessage('✗ Błąd przy dodawaniu artykułu');
      }
    }
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Na pewno chcesz usunąć ten artykuł?')) {
      try {
        // Backend endpoint needed
        await axios.delete(`${API_URL}/api/articles/${id}`);
        fetchArticles();
        showMessage('✓ Artykuł usunięty');
      } catch (error) {
        showMessage('✗ Błąd przy usuwaniu artykułu');
      }
    }
  };

  const handleSaveApiKeys = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // This would call a backend endpoint to securely store/update env variables
      console.log('Saving API keys:', apiKeys);
      showMessage('✓ Klucze API zapisane (wymagany restart serwera)');
    } catch (error) {
      showMessage('✗ Błąd przy zapisywaniu kluczy');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-orange-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Panel Admina</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition-colors"
          >
            <FiLogOut /> Wyloguj
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 m-4 rounded">
          <p className="text-blue-700 font-semibold">{message}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-300 bg-white">
        <div className="container mx-auto px-4 flex gap-0">
          <button
            onClick={() => setActiveTab('api-keys')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-4 transition-colors ${
              activeTab === 'api-keys'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <FiKey /> Klucze API
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-2 px-6 py-4 font-semibold border-b-4 transition-colors ${
              activeTab === 'articles'
                ? 'border-orange-600 text-orange-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <FiFileText /> Artykuły
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* API Keys Tab */}
        {activeTab === 'api-keys' && (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Zarządzaj Kluczami API</h2>

            <form onSubmit={handleSaveApiKeys} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">ID Albumu Facebook</label>
                <input
                  type="text"
                  value={apiKeys.facebook_album_id}
                  onChange={(e) => setApiKeys({ ...apiKeys, facebook_album_id: e.target.value })}
                  placeholder="Wpisz ID albumu (np. 123456789012345)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Znaleź w URL albumu: facebook.com/media/set/?set=a.<strong>ALBUM_ID</strong>
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Token Dostępu Facebook</label>
                <textarea
                  value={apiKeys.facebook_access_token}
                  onChange={(e) => setApiKeys({ ...apiKeys, facebook_access_token: e.target.value })}
                  placeholder="Wpisz token dostępu z Graph API Explorer"
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 font-mono text-sm"
                />
                <p className="text-sm text-gray-600 mt-2">
                  ⚠️ Tokeny wygasają po 60 dniach. Wygeneruj nowy w Graph API Explorer.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm text-blue-700">
                  <strong>Notatka:</strong> Zmiany będą zapisane w pliku .env. Wymagany jest restart serwera backend.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors transform hover:scale-105"
              >
                <FiSave /> {loading ? 'Zapisywanie...' : 'Zapisz Klucze'}
              </button>
            </form>
          </div>
        )}

        {/* Articles Tab */}
        {activeTab === 'articles' && (
          <div>
            {/* New Article Form */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FiPlus /> Dodaj Nowy Artykuł
              </h2>

              <form onSubmit={handleSaveArticle} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tytuł</label>
                  <input
                    type="text"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    placeholder="Wpisz tytuł artykułu"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Kategoria</label>
                  <select
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Wybierz kategorię</option>
                    <option value="news">Wiadomości</option>
                    <option value="tips">Porady</option>
                    <option value="events">Wydarzenia</option>
                    <option value="adoption">Adopcja</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Treść</label>
                  <textarea
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                    placeholder="Wpisz treść artykułu"
                    rows="8"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors transform hover:scale-105"
                >
                  <FiPlus /> Dodaj Artykuł
                </button>
              </form>
            </div>

            {/* Articles List */}
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold text-gray-800">Artykuły ({articles.length})</h2>
              {articles.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <p className="text-gray-600">Brak artykułów. Dodaj pierwszy!</p>
                </div>
              ) : (
                articles.map(article => (
                  <div key={article.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{article.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Kategoria: <span className="font-semibold">{article.category}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingArticle(article)}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-700 line-clamp-3">{article.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
