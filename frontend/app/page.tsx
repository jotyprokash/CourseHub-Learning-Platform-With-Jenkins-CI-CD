import Link from 'next/link';
import { PlayCircle, Award, Briefcase, Star } from 'lucide-react';

export default function Home() {
  const featuredCourses = [
    {
      id: 1,
      title: "Google Data Analytics Professional Certificate",
      instructor: "Google Career Certificates",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      rating: 4.8,
      reviews: "124k",
      level: "Beginner"
    },
    {
      id: 2,
      title: "Machine Learning Specialization",
      instructor: "Stanford University",
      image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&q=80",
      rating: 4.9,
      reviews: "210k",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Meta Front-End Developer Professional Certificate",
      instructor: "Meta",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
      rating: 4.7,
      reviews: "89k",
      level: "Beginner"
    },
    {
      id: 4,
      title: "IBM Full Stack Software Developer",
      instructor: "IBM",
      image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=800&q=80",
      rating: 4.6,
      reviews: "56k",
      level: "Advanced"
    }
  ];

  return (
    <main className="min-h-screen flex flex-col bg-background">
      
      {/* Hero Section */}
      <section className="bg-primary-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance leading-tight">
              Learn without limits
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-2xl leading-relaxed">
              Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-primary-700 transition-transform hover:-translate-y-0.5">
                Join for Free
              </Link>
              <Link href="/courses" className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-base font-bold text-white hover:bg-white/20 transition-all">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Banner */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center p-4">
              <Award className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-bold text-gray-900">Learn from Experts</h3>
              <p className="text-sm text-gray-600 mt-1">Leading universities and companies</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <PlayCircle className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-bold text-gray-900">Learn Anywhere</h3>
              <p className="text-sm text-gray-600 mt-1">On your computer, tablet, or phone</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <Briefcase className="h-10 w-10 text-primary mb-3" />
              <h3 className="font-bold text-gray-900">Build Your Career</h3>
              <p className="text-sm text-gray-600 mt-1">Earn a recognized certificate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Grid Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Launch a new career in as little as 6 months</h2>
        <p className="text-gray-600 mb-10 text-lg">Earn a Professional Certificate from top companies.</p>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCourses.map((course) => (
            <div key={course.id} className="group flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-gray-100">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <img src="https://ui-avatars.com/api/?name=Uni&background=0D8ABC&color=fff&rounded=true&size=24" alt="Provider" className="w-5 h-5" />
                  <span className="text-xs font-semibold text-gray-600 truncate">{course.instructor}</span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{course.level} · Professional Certificate</p>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center gap-2">
                  <span className="flex items-center text-sm font-bold text-gray-900">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                    {course.rating}
                  </span>
                  <span className="text-sm text-gray-500">({course.reviews} reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/courses" className="inline-flex items-center justify-center rounded-md border border-primary px-6 py-3 text-base font-bold text-primary hover:bg-primary-50 transition-colors">
            Show All Certificates
          </Link>
        </div>
      </section>

    </main>
  );
}
