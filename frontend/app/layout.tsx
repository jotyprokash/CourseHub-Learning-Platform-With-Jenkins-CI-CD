import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CourseHub | Learn Without Limits',
  description: 'Online learning platform inspired by the best.',
};

import Navbar from '../components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-background text-gray-900 font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">CourseHub</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>About Us</li>
                  <li>Careers</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Learn</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Browse Courses</li>
                  <li>Certificates</li>
                  <li>Degrees</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Community</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Learners</li>
                  <li>Partners</li>
                  <li>Developers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
              <p>© 2026 CourseHub Inc. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
