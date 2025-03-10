'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('Sending query:', query);
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      console.log('Received response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze query');
      }

      if (!data.category) {
        setError('Could not determine a suitable category. Please try being more specific about your movie preferences.');
        return;
      }

      router.push(`/category/${data.category.toLowerCase()}`);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while analyzing your preferences');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl animate-pulse -top-48 -left-24" />
        <div className="absolute w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl animate-pulse -bottom-48 -right-24" />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-6xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-text drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            AI Movie Recommender
          </h1>
          <p className="text-xl text-gray-300 text-center mb-12 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            Tell us about your movie preferences and let AI find the perfect films for you
          </p>
          
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="relative group">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Example: I enjoy action-packed movies with intense fight scenes and thrilling car chases. I also like movies with strong character development and emotional depth."
                className="w-full h-40 p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 group-hover:border-purple-500/50 group-hover:bg-gray-800/70"
                required
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                {query.length}/500
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 backdrop-blur-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 px-6 rounded-xl text-lg font-semibold text-white 
                ${loading 
                  ? 'bg-gray-700 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]'
                } 
                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Get Movie Recommendations'
              )}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center text-gray-400"
          >
            <p className="text-sm">Powered by OpenAI GPT-3.5</p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 