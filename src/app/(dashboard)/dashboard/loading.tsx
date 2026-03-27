export default function DashboardLoading() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      <div className="flex justify-end mb-4">
        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
      </div>
      <div className="space-y-4">
        <div className="h-8 w-64 bg-gray-200 rounded-lg" />
        <div className="h-4 w-48 bg-gray-100 rounded-lg mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5 h-32" />
          ))}
        </div>
        
        <div className="h-6 w-32 bg-gray-200 rounded-lg mb-4" />
        <div className="bg-white rounded-xl border border-gray-100 h-64" />
      </div>
    </div>
  );
}
