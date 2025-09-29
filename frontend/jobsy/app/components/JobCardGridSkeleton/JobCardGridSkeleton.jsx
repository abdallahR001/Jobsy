import JobCardSkeleton from "../JobCardSkeleton/JobCardSkeleton";

// JobCardGrid Skeleton - للاستخدام في الصفحات اللي فيها multiple cards
export function JobCardGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
}