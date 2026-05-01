'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, PlayCircle, Clock, ArrowRight, LayoutDashboard } from 'lucide-react';
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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    api.get('/enrollment')
      .then((res) => {
        setCourses(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setCourses([]);
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
    <main className="min-h-screen bg-gray-50/50 py-16 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mb-12 border-b border-gray-200 pb-8 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#1a73e8] font-bold text-sm mb-2">
              <LayoutDashboard className="w-4 h-4" /> Student Dashboard
            </div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">My Learning</h1>
          </div>
          <div className="text-sm font-bold text-gray-400 mb-1">{courses.length} Courses Enrolled</div>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a73e8]"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
            <div className="bg-gray-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Start your journey</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">You haven't enrolled in any courses yet. Explore our catalog to find your next skill.</p>
            <Link href="/courses" className="inline-flex items-center gap-2 rounded-full bg-[#1a73e8] px-8 py-3 text-sm font-black text-white shadow-lg hover:bg-[#1557b0] transition-all">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {courses.map((course) => (
              <motion.div key={course.id} variants={itemVariants}>
                <Link href={`/courses/${course.id}`} className="group block bg-white rounded-[2.5rem] border border-gray-100 p-8 transition-all hover:shadow-2xl hover:border-transparent relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-10 h-10 text-[#1a73e8]" />
                  </div>
                  <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 text-[#1a73e8]">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#1a73e8] transition-colors leading-tight line-clamp-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 text-sm font-medium mb-6 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                      <Clock className="w-4 h-4" /> 14h left
                    </div>
                    <div className="text-xs font-bold text-[#1a73e8] bg-blue-50 px-3 py-1 rounded-full">
                      Continue Learning
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
