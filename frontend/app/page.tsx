import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            CourseHub: Learn at your pace
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-blue-100">
            A lightweight online course platform built with Next.js, Express, and PostgreSQL.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/courses" className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-gray-100">
              Browse Courses
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-base font-medium text-white hover:bg-white hover:text-blue-700">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Secure Authentication</h2>
            <p className="mt-3 text-gray-600">JWT-based auth with role support and protected API routes.</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Progress Tracking</h2>
            <p className="mt-3 text-gray-600">Track lesson completion and course progress for each student.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
