interface SkeletonLoaderProps {
  className?: string;
  lines?: number;
  type?: 'text' | 'card' | 'product' | 'testimonial';
}

export default function SkeletonLoader({
  className = '',
  lines = 3,
  type = 'text'
}: SkeletonLoaderProps) {
  if (type === 'card') {
    return (
      <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse ${className}`}>
        <div className="h-48 bg-slate-700 rounded-lg mb-4"></div>
        <div className="h-6 bg-slate-700 rounded mb-2"></div>
        <div className="h-4 bg-slate-700 rounded mb-1"></div>
        <div className="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="flex space-x-2">
          <div className="h-10 bg-slate-700 rounded flex-1"></div>
          <div className="h-10 bg-slate-700 rounded flex-1"></div>
        </div>
      </div>
    );
  }

  if (type === 'product') {
    return (
      <div className={`bg-slate-900 rounded-xl overflow-hidden border border-slate-800 animate-pulse ${className}`}>
        <div className="h-48 bg-slate-800"></div>
        <div className="p-6">
          <div className="h-6 bg-slate-700 rounded mb-2"></div>
          <div className="h-4 bg-slate-700 rounded mb-4"></div>
          <div className="h-8 bg-slate-700 rounded w-1/3 mb-4"></div>
          <div className="flex space-x-2">
            <div className="h-10 bg-slate-700 rounded flex-1"></div>
            <div className="h-10 bg-slate-700 rounded flex-1"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'testimonial') {
    return (
      <div className={`bg-slate-800 rounded-xl p-6 border border-slate-700 animate-pulse ${className}`}>
        <div className="flex mb-4">
          <div className="w-5 h-5 bg-slate-700 rounded mr-1"></div>
          <div className="w-5 h-5 bg-slate-700 rounded mr-1"></div>
          <div className="w-5 h-5 bg-slate-700 rounded mr-1"></div>
          <div className="w-5 h-5 bg-slate-700 rounded mr-1"></div>
          <div className="w-5 h-5 bg-slate-700 rounded mr-1"></div>
        </div>
        <div className="h-4 bg-slate-700 rounded mb-2"></div>
        <div className="h-4 bg-slate-700 rounded mb-2"></div>
        <div className="h-4 bg-slate-700 rounded w-4/5 mb-4"></div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-slate-700 rounded-full mr-3"></div>
          <div>
            <div className="h-4 bg-slate-700 rounded w-24 mb-1"></div>
            <div className="h-3 bg-slate-700 rounded w-20"></div>
          </div>
        </div>
      </div>
    );
  }

  // Default text skeleton
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-slate-700 rounded animate-pulse ${
            index === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}
