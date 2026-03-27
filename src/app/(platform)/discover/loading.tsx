import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function DiscoverLoading() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10 animate-pulse">
            <div className="h-10 w-64 bg-gray-200 rounded-lg mb-2" />
            <div className="h-4 w-48 bg-gray-100 rounded-lg" />
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-pulse">
            <div className="h-12 flex-1 bg-gray-200 rounded-xl" />
            <div className="h-12 w-48 bg-gray-200 rounded-xl" />
            <div className="h-12 w-40 bg-gray-200 rounded-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
