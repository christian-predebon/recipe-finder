function RecipePageSkeleton() {
  return (
    <div className="space-y-12">
      {[1, 2, 3].map((groupIndex) => (
        <div key={groupIndex} className="space-y-4">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="flex gap-4 overflow-x-auto pb-4">
            {[1, 2, 3, 4].map((recipeIndex) => (
              <div
                key={recipeIndex}
                className="flex-none w-72 bg-white rounded-xl overflow-hidden border border-gray-200"
              >
                <div className="relative aspect-[4/3] bg-gray-200 animate-pulse" />
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipePageSkeleton;
