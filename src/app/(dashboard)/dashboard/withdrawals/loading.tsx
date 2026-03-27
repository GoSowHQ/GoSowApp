export default function WithdrawalsLoading() {
  return (
    <div className="max-w-5xl mx-auto py-8 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2" />
          <div className="h-4 w-64 bg-gray-100 rounded-lg" />
        </div>
        <div className="h-16 w-48 bg-gray-200 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-100 p-8 h-64 shadow-sm" />
          <div className="bg-white rounded-3xl border border-gray-100 p-8 h-48 shadow-sm" />
        </div>
        <div className="bg-gray-900 rounded-3xl p-8 h-96 shadow-xl" />
      </div>
    </div>
  );
}
