'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, Clock, ArrowRight, LayoutDashboard, Sparkles } from 'lucide-react';
import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

type Course = {
  id: number;
  title: string;
  description: string;
  instructor_name: string;
};

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    Promise.all([
      api.get('/enrollment'),
      api.get('/courses') // Get all to pick recommendations
    ]).then(([enrolledRes, allRes]) => {
      setCourses(enrolledRes.data);
      // Filter out enrolled to recommend others
      const enrolledIds = new Set(enrolledRes.data.map((c: any) => c.id));
      setRecommendations(allRes.data.filter((c: any) => !enrolledIds.has(c.id)).slice(0, 3));
      setIsLoading(false);
    }).catch(() => {
      setIsLoading(false);
    });
  }, [router]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' } }
  };

  return (
    <main className="min-h-screen bg-[#f8f9fa] py-16 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Dashboard Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 text-[#1a73e8] font-bold text-sm mb-2">
              <LayoutDashboard className="w-4 h-4" /> Welcome back, Scholar
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight italic">My Learning</h1>
          </motion.div>
          
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-black text-[#1a73e8]">{courses.length}</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enrolled</div>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
              <div className="text-2xl font-black text-[#34a853]">2</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completed</div>
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a73e8]"></div>
          </div>
        ) : (
          <div className="space-y-20">
            
            {/* Active Courses */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900">Active Courses</h2>
                <button className="text-sm font-bold text-[#1a73e8] hover:underline">Sort by recent</button>
              </div>

              {courses.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
                  <BookOpen className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Your library is empty</h3>
                  <p className="text-gray-500 mb-8 max-w-sm mx-auto">Explore over 20+ professional certificates to jumpstart your career.</p>
                  <Link href="/courses" className="rounded-full bg-[#1a73e8] px-10 py-4 text-sm font-black text-white shadow-lg hover:bg-[#1557b0] transition-all">
                    Explore Catalog
                  </Link>
                </div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                  {courses.map((course, i) => (
                    <motion.div key={course.id} variants={itemVariants}>
                      <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 transition-all hover:shadow-2xl group flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center text-[#1a73e8]">
                            <PlayCircle className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">In Progress</span>
                        </div>
                        
                        <h3 className="text-xl font-black text-gray-900 mb-4 leading-tight line-clamp-2 min-h-[3.5rem]">
                          {course.title}
                        </h3>

                        {/* Progress Bar */}
                        <div className="mt-auto space-y-4">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-gray-400 uppercase tracking-tighter">Progress</span>
                            <span className="text-[#1a73e8]">{i % 2 === 0 ? '45%' : '12%'}</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: i % 2 === 0 ? '45%' : '12%' }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-gradient-to-r from-[#1a73e8] to-[#34a853]"
                            />
                          </div>
                          
                          <Link href={`/courses/${course.id}`} className="mt-4 w-full py-4 rounded-2xl bg-gray-50 text-[#1a73e8] font-black text-sm flex items-center justify-center gap-2 group-hover:bg-[#1a73e8] group-hover:text-white transition-all">
                            Resume Learning <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </section>

            {/* Recommendations */}
            <section className="bg-[#003145] rounded-[4rem] p-12 lg:p-20 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-20 opacity-10">
                <Sparkles className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="max-w-2xl mb-12">
                  <h2 className="text-3xl lg:text-4xl font-black mb-4">Recommended for your goals</h2>
                  <p className="text-blue-200 font-medium">Based on your interests in professional certifications and technology.</p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-3">
                  {recommendations.map((rec) => (
                    <Link key={rec.id} href={`/courses/${rec.id}`} className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 hover:bg-white/20 transition-all flex flex-col justify-between h-48">
                      <h4 className="font-bold text-lg leading-snug">{rec.title}</h4>
                      <div className="flex items-center justify-between text-xs font-bold text-blue-200 uppercase tracking-widest">
                        <span>New Release</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

          </div>
        )}
      </div>
    </main>
  );
}
