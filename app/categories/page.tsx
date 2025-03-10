'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    name: 'Action',
    description: 'High-octane thrillers and explosive adventures',
    icon: '🎬',
    slug: 'action'
  },
  {
    name: 'Comedy',
    description: 'Laugh-out-loud moments and hilarious situations',
    icon: '😄',
    slug: 'comedy'
  },
  {
    name: 'Drama',
    description: 'Emotional stories and powerful performances',
    icon: '🎭',
    slug: 'drama'
  },
  {
    name: 'Sci-Fi',
    description: 'Futuristic worlds and mind-bending concepts',
    icon: '🚀',
    slug: 'sci-fi'
  },
  {
    name: 'Horror',
    description: 'Spine-chilling tales and supernatural thrills',
    icon: '👻',
    slug: 'horror'
  },
  {
    name: 'Romance',
    description: 'Love stories and heartfelt connections',
    icon: '❤️',
    slug: 'romance'
  },
  {
    name: 'Documentary',
    description: 'Real-world stories and fascinating insights',
    icon: '📚',
    slug: 'documentary'
  },
  {
    name: 'Animation',
    description: 'Animated adventures and creative storytelling',
    icon: '🎨',
    slug: 'animation'
  }
];

export default function CategoriesPage() {
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
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-text drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
            Movie Categories
          </h1>
          <p className="text-xl text-gray-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            Explore our curated collection of movies across different genres
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/category/${category.slug}`}
                className="group block relative bg-gray-800/30 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-transparent to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
                <div className="p-8 relative">
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
                  <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {category.name}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-6 inline-flex items-center text-purple-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Explore {category.name} <span className="ml-2">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          >
            <span className="mr-2">←</span> Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
} 