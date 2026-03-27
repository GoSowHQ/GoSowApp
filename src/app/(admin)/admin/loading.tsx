export default function AdminLoading() {
  return (
    <div className="max-w-6xl mx-auto p-8 animate-pulse">
      <div className="mb-10">
        <div className="h-10 w-48 bg-gray-200 rounded-lg mb-2" />
        <div className="h-4 w-64 bg-gray-100 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 h-32" />
        ))}
      </div>

      <div className="h-8 w-40 bg-gray-200 rounded-lg mb-6" />
      <div className="bg-white rounded-xl border border-gray-100 h-96" />
    </div>
  );
}
