const SkeletonCard = () => (
  <div className="animate-pulse space-y-4 p-6 rounded-lg glass">
    {/* Big temp */}
    <div className="flex items-center gap-4">
      <div className="shimmer-skeleton w-24 h-24 rounded-md" />
      <div className="space-y-3 flex-1">
        <div className="shimmer-skeleton h-10 w-3/4 rounded-md" />
        <div className="shimmer-skeleton h-5 w-1/2 rounded-md" />
      </div>
    </div>
    {/* Stats row */}
    <div className="grid grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="shimmer-skeleton h-16 rounded-md" />
      ))}
    </div>
    {/* Forecast row */}
    <div className="grid grid-cols-5 gap-2 mt-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="shimmer-skeleton h-24 rounded-md" />
      ))}
    </div>
  </div>
);

export default SkeletonCard;
