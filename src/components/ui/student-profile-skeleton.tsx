import React from "react";

export function StudentProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="flex gap-4">
        <div className="w-56 h-72 bg-gray-200 rounded-lg"></div>
        <div className="flex-1 space-y-4">
          <div className="h-4 bg-gray-200 rounded w-48"></div>
          <div className="grid md:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 space-y-6">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="grid md:grid-cols-3 gap-4">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
