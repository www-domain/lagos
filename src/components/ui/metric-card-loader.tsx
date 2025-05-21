import { Card, CardContent } from "./card";
import { Skeleton } from "./skeleton";



export function MetricCardSkeleton() {
  return (
    <Card className="relative border-none rounded-xl">
      <CardContent className="p-6 rounded-xl border-none bg-gray-100">
        <div className="flex items-start justify-between">
          <div className="w-full">
            <Skeleton className="h-4 w-3/4 mb-6" />
            <Skeleton className="h-8 w-1/2 mt-2" />
            <div className="flex items-center mt-4">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/3 ml-2" />
            </div>
          </div>
        </div>
        <div className="absolute top-2 right-0 w-12 h-12">
          <Skeleton className="w-8 h-8 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}
