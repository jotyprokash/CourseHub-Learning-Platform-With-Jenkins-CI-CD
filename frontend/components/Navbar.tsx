'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          CourseHub
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/courses" className="text-sm font-medium text-gray-700 hover:text-blue-600">
            Courses
          </Link>
          <Link href="/login" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}
