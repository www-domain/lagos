import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatusProps {
  status: "completed" | "ongoing" | "acknowledged" | "pending"
  className?: string
}

export function Status({ status, className }: StatusProps) {
  const getStatusStyles = (status: StatusProps["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700"
      case "ongoing":
        return "bg-yellow-50 text-yellow-700"
      case "acknowledged":
        return "bg-green-50 text-green-700"
      case "pending":
        return "bg-blue-50 text-blue-700"
      default:
        return "bg-gray-50 text-gray-700"
    }
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-0.5 text-sm font-medium",
        getStatusStyles(status),
        className,
      )}
    >
      <Check className="h-3.5 w-3.5" />
      <span className="capitalize">{status}</span>
    </div>
  )
}

