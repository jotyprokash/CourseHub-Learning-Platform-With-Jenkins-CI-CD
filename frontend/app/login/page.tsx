'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('coursehub-token', response.data.token);
      router.push('/courses');
    } catch (err: any) {
      console.error('Login error details:', err);
      setError(err.response?.data?.error || 'Sign in failed. Please check your credentials or connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1a73e8] to-[#ea4335] opacity-20"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Sign in</h1>
          <p className="mt-2 text-sm text-gray-500">Welcome back to CourseHub</p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email address</label>
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <a href="#" className="text-sm font-medium text-[#1a73e8] hover:underline">Forgot password?</a>
            </div>
            <input
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-medium text-[#ea4335] bg-red-50 p-3 rounded-lg">
              {error}
            </motion.p>
          )}
          
          <button
            className="w-full rounded-full bg-[#1a73e8] px-4 py-3.5 text-sm font-bold text-white shadow-sm hover:bg-[#1557b0] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2 transition-all disabled:opacity-50 flex items-center justify-center"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/register" className="font-semibold text-[#1a73e8] hover:text-[#1557b0] hover:underline transition-colors">
            Create an account
          </a>
        </p>
      </motion.div>
    </main>
  );
}
