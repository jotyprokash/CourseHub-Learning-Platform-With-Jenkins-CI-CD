'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, User, ArrowRight } from 'lucide-react';
import api from '@/lib/api';

type Course = {
  id: number;
  title: string;
  description: string;
  instructor_name: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/courses')
      .then((res) => {
        setCourses(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setCourses([]);
        setIsLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 py-16 font-sans">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <header className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">All Courses</h1>
          <p className="mt-4 text-xl text-gray-500 max-w-3xl">Explore our extensive catalog of courses designed to advance your career.</p>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a73e8]"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
            <p className="mt-2 text-gray-500">Check back later for new course offerings.</p>
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
                <Link href={`/courses/${course.id}`} className="group flex flex-col h-full rounded-3xl border border-gray-200 bg-white p-8 transition-all hover:shadow-xl hover:border-transparent">
                  <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                    <BookOpen className="h-6 w-6 text-[#1a73e8]" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#1a73e8] transition-colors mb-3 line-clamp-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-500 line-clamp-3 mb-6 flex-grow">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex items-center text-sm font-medium text-gray-600">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      {course.instructor_name}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-[#1a73e8] group-hover:translate-x-1 transition-all" />
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
