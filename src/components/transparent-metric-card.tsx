import { Card, CardContent } from "./ui/card";

interface TransparentMetricCardProps {
  title: string;
  value: string;
  image: string;
  backgroundColour: string;
}

export default function TransparentMetricCard({
  title,
  value,
  image,
  backgroundColour,
}: TransparentMetricCardProps) {
  return (
    <Card className="relative border rounded-xl">
      <div className="absolute top-2 left-2 w-12 h-12 rounded-lg overflow-hidden">
        <img
          src={image}
          alt={`${title} illustration`}
          className="object-contain w-8 h-8"
        />
      </div>
      <CardContent
        className={`ml-9 p-4 rounded-xl border-none ${backgroundColour}`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold mb-6">{title}</p>
            <h3 className="mb-4 text-2xl font-bold mt-2">{value}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
