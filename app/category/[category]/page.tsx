'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Movie {
  _id: string;
  title: string;
  description: string;
  year: number;
  rating: number;
  imageUrl: string;
  category: string;
}

export default function CategoryPage() {
  const params = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const category = params.category as string;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/movies?category=${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError('Failed to load movies');
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category]);

  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-xl">Loading movies...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-red-400 text-xl">{error}</p>
            <Link 
              href="/"
              className="mt-4 inline-block text-purple-400 hover:text-purple-300 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            {formatCategory(category)} Movies
          </h1>
          <Link
            href="/"
            className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>

        {movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No movies found in this category.</p>
            <Link 
              href="/"
              className="mt-4 inline-block text-purple-400 hover:text-purple-300 transition-colors"
            >
              Try another category
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-200"
              >
                <div className="relative h-48">
                  <img
                    src={movie.imageUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    {movie.rating}/10
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                  <p className="text-gray-400 text-sm mb-4">{movie.year}</p>
                  <p className="text-gray-300 line-clamp-3">{movie.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 