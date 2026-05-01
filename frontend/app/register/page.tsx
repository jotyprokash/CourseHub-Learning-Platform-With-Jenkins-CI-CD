'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/register', { name, email, password });
      console.log('Registration successful:', response.data);
      localStorage.setItem('coursehub-token', response.data.token);
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/courses');
      }, 2000);
    } catch (err: any) {
      console.error('Registration error details:', err);
      setError(err.response?.data?.error || 'Registration failed. Please check your connection or try a different email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 relative overflow-hidden font-sans">
      <div className="absolute top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1a73e8] to-[#34a853] opacity-20"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="w-full max-w-md rounded-3xl bg-white p-10 shadow-xl shadow-gray-200/50 border border-gray-100"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-500">Join thousands of learners today</p>
        </div>
        
        {isSuccess ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CourseHub!</h2>
            <p className="text-gray-500">Your account has been created. Redirecting you to our catalog...</p>
          </motion.div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent transition-all"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Google Scholar"
                required
              />
            </div>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
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
              {isLoading ? 'Creating account...' : 'Register'}
            </button>
          </form>
        )}
        
        {!isSuccess && (
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="font-semibold text-[#1a73e8] hover:text-[#1557b0] hover:underline transition-colors">
              Sign in
            </a>
          </p>
        )}
      </motion.div>
    </main>
  );
}
