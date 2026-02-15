import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/articles`);
        setArticles(res.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="fade-in">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Blog i Aktualności</h1>
          <p className="text-lg text-orange-100">Wiadomości z Schroniska AZYL</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Ładowanie artykułów...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-orange-50 rounded-lg border-2 border-orange-200">
            <p className="text-gray-600 text-lg">Nie ma jeszcze dostępnych artykułów.</p>
            <p className="text-gray-500 mt-2">Zapraszamy do odwiedzenia nas wkrótce!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {articles.map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border-l-4 border-orange-500">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{article.title}</h3>
                {article.category && (
                  <p className="text-sm text-orange-600 font-semibold mb-3 bg-orange-50 px-3 py-1 rounded-full inline-block">{article.category}</p>
                )}
                <p className="text-gray-700 leading-relaxed mb-4">{article.content}</p>
                {article.createdAt && (
                  <p className="text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
