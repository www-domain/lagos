import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
  return (
    <div className="bg-white shadow-md rounded-md p-6 mx-auto">
      <div className="grid grid-cols-3 gap-6 items-center">
        {/* Logo Section */}
        <div className="flex justify-center">
          <Skeleton className="w-48 h-48 rounded-full" />
        </div>

        {/* Details Section */}
        <div className="col-span-2">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />

          <div className="grid grid-cols-3 gap-y-2 mt-4">
            {[...Array(6)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-5 w-32" />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-5 w-full" />
          </div>

          <div className="grid grid-cols-3 gap-y-2 mt-6">
            {[...Array(2)].map((_, index) => (
              <div key={index}>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-5 w-32" />
              </div>
            ))}
            <div>
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
