'use client';

import Link from 'next/link';
import { Search, ChevronDown, Menu } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left Section: Logo & Explore */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
            CourseHub
          </Link>
          <button className="hidden md:flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors">
            Explore
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Middle Section: Search Bar */}
        <div className="hidden flex-1 px-8 md:flex max-w-2xl">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-full border border-gray-300 bg-gray-50 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              placeholder="What do you want to learn?"
            />
          </div>
        </div>

        {/* Right Section: Auth & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link href="/courses" className="hidden md:block text-sm font-medium text-gray-700 hover:text-primary transition-colors">
            My Learning
          </Link>
          <Link href="/login" className="hidden md:block text-sm font-semibold text-primary hover:text-primary-700 transition-colors">
            Log In
          </Link>
          <Link href="/register" className="hidden md:block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors shadow-sm">
            Join for Free
          </Link>
          <button className="md:hidden p-2 text-gray-600 hover:text-primary">
            <Menu className="h-6 w-6" />
          </button>
        </div>

      </div>
    </nav>
  );
}
