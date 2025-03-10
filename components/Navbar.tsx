'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import InfoIcon from '@mui/icons-material/Info';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#121212] border-b border-white/5 fixed w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 hover:from-purple-300 hover:to-pink-500 transition-all duration-200 group"
          >
            <LocalMoviesIcon className="text-white group-hover:text-purple-300 transition-colors duration-200" />
            <span className="animate-text">MovieAI</span>
          </Link>

          <div className="flex items-center space-x-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 group
                ${isActive('/') 
                  ? 'bg-white/5 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent hover:border-white/5'
                }`}
            >
              <HomeIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              href="/categories"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 group
                ${isActive('/categories')
                  ? 'bg-white/5 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                  : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent hover:border-white/5'
                }`}
            >
              <CategoryIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Categories</span>
            </Link>

            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 group
                ${isActive('/about')
                  ? 'bg-white/5 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                  : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent hover:border-white/5'
                }`}
            >
              <InfoIcon className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 