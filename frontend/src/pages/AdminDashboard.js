import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiCheckCircle, FiAlertCircle, FiSave } from 'react-icons/fi';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const messageTimeoutRef = useRef(null);
  const rootRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('status');
  const [settings, setSettings] = useState({
    facebook_album_id: '',
    facebook_access_token: ''
  });

  useEffect(() => {
    // Check if user is logged in and fetch status
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin');
    } else {
      fetchStatus();
      fetchSettings();
    }
  }, [navigate]);

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

  const fetchStatus = async () => {
    try {
      const session = localStorage.getItem('adminSession');
      const response = await fetch(`${API_URL}/api/admin/status`, {
        headers: {
          'Authorization': `Bearer ${session}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStatus(data);
      } else if (response.status === 401) {
        localStorage.removeItem('adminSession');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error fetching status:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const session = localStorage.getItem('adminSession');
      const response = await fetch(`${API_URL}/api/admin/settings/facebook`, {
        headers: {
          'Authorization': `Bearer ${session}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const session = localStorage.getItem('adminSession');
      const response = await fetch(`${API_URL}/api/admin/settings/facebook`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        showMessage('✓ Ustawienia Facebook zostały zapisane');
      } else {
        const error = await response.json();
        showMessage('✗ ' + (error.error || 'Błąd przy zapisywaniu'));
      }
    } catch (error) {
      showMessage('✗ Błąd połączenia');
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    navigate('/');
  };

  return (
    <div ref={rootRef} className="min-h-screen bg-gray-100" style={{ contain: 'layout style paint' }}>
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

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 text-center">
            {message}
          </div>
        )}

        {loading ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-600">Ładowanie...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg max-w-2xl">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-300">
              <button
                onClick={() => setActiveTab('status')}
                className={`flex-1 px-6 py-4 font-semibold text-center transition-colors ${
                  activeTab === 'status'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Status
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 px-6 py-4 font-semibold text-center transition-colors ${
                  activeTab === 'settings'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Ustawienia Facebook
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* Status Tab */}
              {activeTab === 'status' && status && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Status Systemu</h2>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {status.facebook_configured ? (
                        <FiCheckCircle className="text-green-600 text-2xl" />
                      ) : (
                        <FiAlertCircle className="text-amber-600 text-2xl" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Integracja Facebook</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {status.facebook_configured
                          ? '✓ Klucze API są skonfigurowane'
                          : '⚠️ Klucze API nie są skonfigurowane. Skonfiguruj je w zakładce Ustawienia.'}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Statystyki</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm text-gray-600">Psy w schronisku</p>
                        <p className="text-3xl font-bold text-orange-600">{status.total_dogs || 0}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded">
                        <p className="text-sm text-gray-600">Wiadomości</p>
                        <p className="text-3xl font-bold text-orange-600">{status.unread_messages || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-800">Ustawienia Facebook</h2>

                  <form onSubmit={handleSaveSettings} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        ID Albumu
                      </label>
                      <input
                        type="text"
                        value={settings.facebook_album_id}
                        onChange={(e) =>
                          setSettings({ ...settings, facebook_album_id: e.target.value })
                        }
                        placeholder="Np. 123456789"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        ID albumu z Facebooka, gdzie będą przechowywane zdjęcia psów
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Token Dostępu
                      </label>
                      <textarea
                        value={settings.facebook_access_token}
                        onChange={(e) =>
                          setSettings({ ...settings, facebook_access_token: e.target.value })
                        }
                        placeholder="Wklej token dostępu do Facebook API"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600 font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Long-lived access token z Facebook App. Przechowywany bezpiecznie na serwerze.
                      </p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded text-sm text-gray-700">
                      <p className="font-semibold mb-2">💡 Jak uzyskać klucze API:</p>
                      <ol className="list-decimal list-inside space-y-1 text-xs">
                        <li>Przejdź do Facebook Developers Console</li>
                        <li>Utwórz aplikację Facebook lub użyj istniejącej</li>
                        <li>Przejdź do sekcji Narzędzia → Explorer API Grafu</li>
                        <li>Wygeneruj token dostępu z uprawnieniami <code className="bg-white px-1">photos_upload_manage</code></li>
                        <li>Skopiuj ID albumu i token poniżej</li>
                      </ol>
                    </div>

                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                      <FiSave size={20} />
                      {saving ? 'Zapisywanie...' : 'Zapisz Ustawienia'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
