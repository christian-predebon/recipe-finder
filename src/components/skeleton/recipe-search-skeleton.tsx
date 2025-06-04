function RecipeSearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="rounded-xl overflow-hidden">
          <div className="relative aspect-[4/3] bg-gray-200 animate-pulse rounded-xl" />
          <div className="py-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipeSearchSkeleton;
