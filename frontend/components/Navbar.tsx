'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, Menu, LogOut, User } from 'lucide-react';
import { getToken, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!getToken());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    router.push('/');
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Left Section: Logo & Explore */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-[#1a73e8] tracking-tight">
            CourseHub
          </Link>
          <button className="hidden lg:flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
            Explore
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* Middle Section: Search Bar */}
        <div className="hidden flex-1 px-12 lg:flex max-w-xl">
          <div className="relative w-full group">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#1a73e8] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full rounded-full border border-gray-200 bg-gray-100/50 py-3 pl-12 pr-4 text-sm placeholder-gray-500 focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20 transition-all shadow-inner"
              placeholder="Search for anything..."
            />
          </div>
        </div>

        {/* Right Section: Auth & Actions */}
        <div className="flex items-center gap-6">
          <Link href="/courses" className="hidden md:block text-sm font-bold text-gray-600 hover:text-[#1a73e8] transition-colors">
            All Courses
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link href="/my-courses" className="hidden md:block text-sm font-bold text-gray-600 hover:text-[#1a73e8] transition-colors">
                My Learning
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/profile" className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#1a73e8] hover:bg-blue-100 transition-colors">
                  <User className="h-5 w-5" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-[#ea4335] transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden md:block text-sm font-bold text-gray-700 hover:text-[#1a73e8] transition-colors">
                Log In
              </Link>
              <Link href="/register" className="hidden md:block rounded-full bg-[#1a73e8] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#1557b0] transition-all shadow-md shadow-blue-200">
                Join for Free
              </Link>
            </>
          )}
          
          <button className="lg:hidden p-2 text-gray-600">
            <Menu className="h-6 w-6" />
          </button>
        </div>

      </div>
    </nav>
  );
}
