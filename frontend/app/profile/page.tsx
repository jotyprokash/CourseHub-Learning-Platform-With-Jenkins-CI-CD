'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Shield, Settings, LogOut, ChevronRight } from 'lucide-react';
import api from '@/lib/api';
import { getToken, logout } from '@/lib/auth';

type UserProfile = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    api.get('/auth/me')
      .then((res) => {
        setProfile(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        router.push('/login');
      });
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a73e8]"></div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <main className="min-h-screen bg-gray-50/50 py-16 font-sans">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 mt-2">Manage your professional identity and learning preferences.</p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1a73e8] to-[#34a853] flex items-center justify-center text-white text-3xl font-black mb-4">
                  {profile.name.charAt(0)}
                </div>
                <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-sm text-gray-500 font-medium capitalize">{profile.role}</p>
              </div>
            </div>

            <nav className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 overflow-hidden">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#1a73e8] bg-blue-50 rounded-2xl transition-all">
                <User className="w-5 h-5" /> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-all">
                <Settings className="w-5 h-5" /> Account
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#ea4335] hover:bg-red-50 rounded-2xl transition-all"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </nav>
          </div>

          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-2">
                Personal Information
              </h3>
              
              <div className="space-y-8">
                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</div>
                      <div className="text-gray-900 font-bold">{profile.name}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-gray-400 transition-colors" />
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Email Address</div>
                      <div className="text-gray-900 font-bold">{profile.email}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-gray-400 transition-colors" />
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Joined On</div>
                      <div className="text-gray-900 font-bold">{new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-gray-400 transition-colors" />
                </div>

                <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-gray-400 uppercase tracking-widest">Account Status</div>
                      <div className="text-green-600 font-bold flex items-center gap-1">
                        Verified Member
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-200 group-hover:text-gray-400 transition-colors" />
                </div>
              </div>
            </section>

            <section className="bg-[#1a73e8] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Shield className="w-32 h-32" />
              </div>
              <h3 className="text-2xl font-black mb-4">Secured with CourseHub</h3>
              <p className="text-blue-100 font-medium mb-8 leading-relaxed max-w-sm">
                Your data is protected by industry-standard encryption and our zero-trust security architecture.
              </p>
              <button className="bg-white text-[#1a73e8] font-black px-8 py-3 rounded-full hover:bg-blue-50 transition-colors">
                View Privacy Report
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
