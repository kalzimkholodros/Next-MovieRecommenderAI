'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const features = [
    {
      title: 'AI-Powered Recommendations',
      description: 'Our advanced AI system analyzes your preferences to suggest the perfect movies for you.',
      icon: '🤖'
    },
    {
      title: 'Diverse Categories',
      description: 'Explore a wide range of movie genres, from action-packed blockbusters to thought-provoking documentaries.',
      icon: '🎭'
    },
    {
      title: 'Smart Analysis',
      description: 'Natural language processing helps understand your movie preferences in detail.',
      icon: '🧠'
    },
    {
      title: 'Personalized Experience',
      description: 'Get recommendations tailored to your unique taste and viewing history.',
      icon: '👤'
    }
  ];

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
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-text drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            About MovieAI
          </h1>
          <p className="text-xl text-gray-300 mb-16 leading-relaxed drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            MovieAI is your intelligent movie companion, using advanced artificial intelligence to understand your preferences and recommend the perfect films for your entertainment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-x-4"
          >
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
            >
              Try It Now
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 text-white font-semibold transition-all duration-300 transform hover:scale-105 border border-gray-700/50 hover:border-purple-500/50"
            >
              Browse Categories
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
} 