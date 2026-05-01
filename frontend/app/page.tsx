"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, Award, Briefcase, Star, ArrowRight, Sparkles, BookOpen, Users } from 'lucide-react';

export default function Home() {
  const featuredCourses = [
    {
      id: 1,
      title: "Google Cybersecurity Professional Certificate",
      instructor: "Google",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
      rating: 4.8,
      reviews: "12k",
      level: "Beginner",
      badge: "Most Popular"
    },
    {
      id: 2,
      title: "Deep Learning Specialization",
      instructor: "DeepLearning.AI",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=800&q=80",
      rating: 4.9,
      reviews: "45k",
      level: "Intermediate",
      badge: "Bestseller"
    },
    {
      id: 3,
      title: "IBM Data Science Professional Certificate",
      instructor: "IBM",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      rating: 4.7,
      reviews: "95k",
      level: "Beginner",
      badge: "Trending"
    },
    {
      id: 4,
      title: "AWS Cloud Solutions Architect",
      instructor: "AWS",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      rating: 4.8,
      reviews: "32k",
      level: "Advanced",
      badge: "Top Rated"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white overflow-hidden font-sans">
      
      {/* Hero Section - Google Style */}
      <section className="relative px-6 pt-32 pb-24 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Subtle background decoration */}
        <div className="absolute top-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#1a73e8] to-[#34a853] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="mb-8 flex justify-center">
            <span className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 transition-all flex items-center gap-2 bg-white/50 backdrop-blur-sm cursor-pointer">
              <Sparkles className="h-4 w-4 text-[#1a73e8]" />
              Introducing Google-certified learning paths. <a href="#" className="font-semibold text-[#1a73e8]">Read more <span aria-hidden="true">&rarr;</span></a>
            </span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-8 leading-tight">
            Learn without <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] to-[#ea4335]">limits</span>.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/register" className="group rounded-full bg-[#1a73e8] px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-[#1557b0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a73e8] transition-all flex items-center gap-2">
              Start Learning for Free
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/courses" className="text-sm font-semibold leading-6 text-gray-900 hover:text-[#1a73e8] transition-colors flex items-center gap-2">
              Explore Catalog <span aria-hidden="true">→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Banner - Minimalist Cards */}
      <section className="bg-gray-50/50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-4 rounded-2xl mb-6">
                <Award className="h-8 w-8 text-[#1a73e8]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Learn from Experts</h3>
              <p className="text-gray-500 leading-relaxed">Curriculum designed by leading universities and industry pioneers.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-green-50 p-4 rounded-2xl mb-6">
                <PlayCircle className="h-8 w-8 text-[#34a853]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Flexible Learning</h3>
              <p className="text-gray-500 leading-relaxed">Access bite-sized content on any device, entirely at your own pace.</p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="bg-red-50 p-4 rounded-2xl mb-6">
                <Briefcase className="h-8 w-8 text-[#ea4335]" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Build Your Career</h3>
              <p className="text-gray-500 leading-relaxed">Earn recognized credentials to stand out in today's job market.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight mb-4">Trending Professional Certificates</h2>
            <p className="text-xl text-gray-500">Launch a new career in as little as 6 months.</p>
          </div>
          <Link href="/courses" className="hidden md:flex items-center text-[#1a73e8] font-semibold hover:underline">
            View all certificates <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredCourses.map((course) => (
            <motion.div 
              key={course.id} 
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-transparent hover:shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-100">
                {course.badge && (
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                    {course.badge}
                  </div>
                )}
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                    <BookOpen className="h-3 w-3 text-gray-500" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{course.instructor}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#1a73e8] transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6">{course.level}</p>
                
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-[#fbbc04] fill-[#fbbc04]" />
                    <span className="text-sm font-bold text-gray-900">{course.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({course.reviews})</span>
                  </div>
                  <Users className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-12 md:hidden text-center">
          <Link href="/courses" className="inline-flex items-center justify-center rounded-full border-2 border-[#1a73e8] px-8 py-3 text-sm font-bold text-[#1a73e8] hover:bg-[#e8f0fe] transition-colors w-full">
            View all certificates
          </Link>
        </div>
      </section>

    </main>
  );
}
