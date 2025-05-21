import { Skeleton } from "@/components/ui/skeleton"

export function TableSkeleton() {
  return (
    <div className="w-full">
      <div className="flex space-x-4 mb-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-sm font-light">
            {[...Array(9)].map((_, index) => (
              <th key={index} className="p-2 border-b">
                <Skeleton className="h-4 w-full" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {[...Array(9)].map((_, colIndex) => (
                <td key={colIndex} className="p-2">
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

