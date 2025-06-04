function RecipeDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl overflow-hidden">
        <div className="w-full h-[400px] bg-gray-200 animate-pulse" />
        <div className="p-6 space-y-8">
          <div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
          </div>

          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="h-4 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-12" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-48" />
            <div className="aspect-video bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailSkeleton;
