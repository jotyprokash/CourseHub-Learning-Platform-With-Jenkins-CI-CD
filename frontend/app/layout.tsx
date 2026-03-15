import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CourseHub',
  description: 'Online learning platform',
};

import Navbar from '../components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
