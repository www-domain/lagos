import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  image: string;
  showCurrency?: boolean;
  backgroundColour: string;
}

export default function MetricCard({
  title,
  value,
  change,
  image,
  showCurrency,
  backgroundColour
}: MetricCardProps) {
  return (
    <Card className="relative border-none rounded-xl">
      <div className="absolute top-2 right-0 w-12 h-12 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={`${title} illustration`}
          className="object-contain w-8 h-8"
        />
      </div>
      <CardContent className={`p-6 rounded-xl border-none ${backgroundColour}`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold mb-6">{title}</p>
            <h3 className="text-2xl font-bold mt-2">
              {showCurrency ? `₦${value}` : value}
            </h3>
            <div className="flex items-center mt-4">
              <span
                className={cn(
                  "text-sm font-medium",
                  change > 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {change > 0 ? "↗" : "↘"} {Math.abs(change)}%
              </span>
              <span className="text-sm text-muted-foreground ml-1">
                in the last month
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
