'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Course = {
  id: number;
  title: string;
  description: string;
  instructor_name: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch(() => setCourses([]));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-5xl px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Courses</h1>
          <p className="mt-2 text-gray-600">Find a course and start learning.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`} className="group block rounded-xl border border-gray-200 bg-white p-6 transition hover:shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">{course.title}</h2>
              <p className="mt-2 text-gray-600 line-clamp-3">{course.description}</p>
              <p className="mt-4 text-sm text-gray-500">Instructor: {course.instructor_name}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
