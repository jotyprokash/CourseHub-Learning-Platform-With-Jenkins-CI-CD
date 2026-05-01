'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayCircle, Clock, Award, BookOpen, ChevronLeft, 
  CheckCircle2, Users, Star, Globe, ShieldCheck, 
  ChevronDown, BarChart, ShoppingCart
} from 'lucide-react';
import api from '@/lib/api';
import { getToken } from '@/lib/auth';

type Lesson = {
  id: number;
  title: string;
  video_url: string;
  order_number: number;
};

type Course = {
  id: number;
  title: string;
  description: string;
  instructor_name: string;
  lessons: Lesson[];
};

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleEnroll = async () => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    setIsEnrolling(true);
    try {
      await api.post('/enrollment', { courseId: id });
      setEnrolled(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err: any) {
      if (err.response?.status === 409) {
        setEnrolled(true);
      } else {
        alert('Enrollment failed. Please try again.');
      }
    } finally {
      setIsEnrolling(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a73e8]"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h1>
        <button onClick={() => router.push('/courses')} className="text-[#1a73e8] font-semibold hover:underline flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Catalog
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white font-sans pb-20">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-0 left-0 right-0 z-[60] flex justify-center pointer-events-none"
          >
            <div className="bg-[#34a853] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 pointer-events-auto">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bold">Successfully Enrolled! Welcome to the course.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="bg-[#003145] text-white py-16 lg:py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[#1a73e8] opacity-20 blur-[120px] rounded-full"></div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-2 text-[#1a73e8] font-bold text-sm mb-6 bg-white/10 w-fit px-4 py-1.5 rounded-full backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" /> Professional Certificate
              </div>
              <h1 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
                {course.description.split('.')[0]}. Master industry-leading skills with professional curriculum.
              </p>
              
              <div className="flex flex-wrap gap-8 mb-12">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#fbbc04] fill-[#fbbc04]" />
                  <span className="font-bold">4.9</span>
                  <span className="text-gray-400 text-sm">(2,450 ratings)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="font-bold text-sm">85,234 already enrolled</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#003145] bg-gray-300"></div>
                  ))}
                </div>
                <span className="text-sm text-gray-400 font-medium">Taught by {course.instructor_name} and 3 others</span>
              </div>
            </motion.div>

            {/* Price Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 text-gray-900 shadow-2xl relative z-10 lg:ml-12"
            >
              <div className="mb-6">
                <div className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-1">Full Course Access</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">$49.00</span>
                  <span className="text-gray-400 line-through font-medium text-lg">$199.00</span>
                  <span className="text-[#34a853] font-bold text-sm ml-auto">75% OFF</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#34a853]" /> Full lifetime access
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <Globe className="w-5 h-5 text-gray-400" /> English, Spanish, Arabic
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <Award className="w-5 h-5 text-[#1a73e8]" /> Certificate of completion
                </div>
              </div>

              <button 
                onClick={handleEnroll}
                disabled={isEnrolling || enrolled}
                className={`w-full py-5 rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-3 shadow-lg ${
                  enrolled 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#1a73e8] text-white hover:bg-[#1557b0] hover:scale-[1.02]'
                }`}
              >
                {enrolled ? (
                  <>
                    <ShieldCheck className="w-6 h-6" /> Already Enrolled
                  </>
                ) : isEnrolling ? (
                  'Processing...'
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" /> Enroll Now
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-6 font-medium uppercase tracking-tighter">
                30-Day Money-Back Guarantee
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Detail Sections */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            
            {/* What you'll learn */}
            <section className="bg-blue-50/30 rounded-[3rem] p-12 border border-blue-100">
              <h2 className="text-3xl font-black text-gray-900 mb-8">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Master the core principles and advanced techniques",
                  "Build professional-grade projects for your portfolio",
                  "Understand industry best practices and patterns",
                  "Gain hands-on experience with modern tools",
                  "Prepare for technical interviews and certifications",
                  "Collaborate on real-world team exercises"
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="w-6 h-6 text-[#34a853] flex-shrink-0" />
                    <span className="text-gray-700 font-medium leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h2 className="text-3xl font-black text-gray-900 mb-6">About this course</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p>{course.description}</p>
                <p className="mt-4">
                  This comprehensive curriculum has been meticulously designed to take you from a curious learner to a confident professional. 
                  Every module includes hands-on labs, interactive quizzes, and peer-reviewed projects to ensure you truly master the material.
                </p>
              </div>
            </section>

            {/* Syllabus */}
            <section>
              <div className="flex items-end justify-between mb-8">
                <h2 className="text-3xl font-black text-gray-900">Course Syllabus</h2>
                <span className="text-gray-500 font-bold mb-1">{course.lessons.length} sections • 14h total length</span>
              </div>
              <div className="space-y-4">
                {course.lessons.map((lesson, i) => (
                  <div key={lesson.id} className="group border border-gray-100 bg-gray-50 rounded-2xl p-6 transition-all hover:bg-white hover:shadow-xl hover:border-transparent">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center font-black text-[#1a73e8] border border-gray-100">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-[#1a73e8] transition-colors">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 font-medium">
                          <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4" /> 12:45</span>
                          <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> Resources</span>
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-300 group-hover:text-gray-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-12">
            <div className="bg-gray-50 rounded-[2rem] p-10 space-y-8">
              <div>
                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Instructor</h4>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1a73e8] to-[#34a853]"></div>
                  <div>
                    <div className="font-black text-gray-900 text-lg">{course.instructor_name}</div>
                    <div className="text-sm text-[#1a73e8] font-bold">Principal Engineer</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <BarChart className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="text-sm font-black text-gray-900 uppercase">Skill Level</div>
                    <div className="text-sm text-gray-500 font-medium">Beginner to Professional</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Award className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="text-sm font-black text-gray-900 uppercase">Credential</div>
                    <div className="text-sm text-gray-500 font-medium">Professional Certificate</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-[#1a73e8] pl-8 py-4">
              <h4 className="text-xl font-black text-gray-900 mb-2 italic">"One of the best professional investments I've made in years."</h4>
              <p className="text-sm text-gray-500 font-bold">— Mark T., Senior Developer</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
