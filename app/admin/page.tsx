'use client';

import { useState } from 'react';

interface MovieFormData {
  title: string;
  description: string;
  category: string;
  year: number;
  rating: number;
  imageUrl: string;
}

export default function AdminPage() {
  const [formData, setFormData] = useState<MovieFormData>({
    title: '',
    description: '',
    category: 'Action',
    year: new Date().getFullYear(),
    rating: 0,
    imageUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Film başarıyla eklendi!');
        setFormData({
          title: '',
          description: '',
          category: 'Action',
          year: new Date().getFullYear(),
          rating: 0,
          imageUrl: '',
        });
      } else {
        setMessage('Film eklenirken bir hata oluştu.');
      }
    } catch (error) {
      setMessage('Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Film Ekle</h1>
        
        {message && (
          <div className={`p-4 mb-4 rounded-md ${
            message.includes('başarıyla') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Film Adı
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Açıklama
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="Action">Aksiyon</option>
              <option value="Comedy">Komedi</option>
              <option value="Drama">Drama</option>
              <option value="Sci-Fi">Bilim Kurgu</option>
              <option value="Horror">Korku</option>
              <option value="Romance">Romantik</option>
              <option value="Documentary">Belgesel</option>
              <option value="Animation">Animasyon</option>
            </select>
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
              Yıl
            </label>
            <input
              type="number"
              id="year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Puan (0-10)
            </label>
            <input
              type="number"
              id="rating"
              min="0"
              max="10"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
              Görsel URL
            </label>
            <input
              type="url"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Ekleniyor...' : 'Film Ekle'}
          </button>
        </form>
      </div>
    </main>
  );
} 