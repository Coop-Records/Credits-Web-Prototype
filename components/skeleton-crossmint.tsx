export default function SkeletonCrossmint() {
  return (
    <div className="w-full flex flex-col items-center justify-center animate-pulse">
      <div className="h-8 w-32 bg-gray-200 rounded mb-4" />
      <div className="h-6 w-48 bg-gray-100 rounded mb-2" />
      <div className="h-6 w-40 bg-gray-100 rounded mb-2" />
      <div className="h-12 w-56 bg-gray-200 rounded mb-4" />
    </div>
  );
}
