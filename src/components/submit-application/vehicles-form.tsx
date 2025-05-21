import React from "react";
import { Label } from "@/components/ui/label";
import { DataIcon } from "@/components/ui/icons";

interface VehiclesFormProps {
  data: {
    vehicleCount?: string;
    vehicleType?: string;
    specialGadgets?: string;
    simulatorCount?: string;
  };
  onDataChange: (field: string, value: string) => void;
}

export function VehiclesForm({ data, onDataChange }: VehiclesFormProps) {
  return (
    <div className="space-y-10 p-6">
      <div className="flex items-start gap-4">
        <DataIcon />
        <div className="space-y-1">
          <h2 className="text-xl font-medium text-blue-600">Provide all necessary data</h2>
          <p className="text-sm text-gray-600">
            Ensure that you fill every requirement before proceed to the next step
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="vehicle-count">Number of Vehicle</Label>
          {/* <Input
            id="vehicle-count"
            placeholder="Enter numbers of vehicle"
            value={data.vehicleCount || ""}
            onChange={(e) => onDataChange("vehicleCount", e.target.value)}
          /> */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicle-type">Type of Vehicle</Label>
          <select
            id="vehicle-type"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={data.vehicleType || ""}
            onChange={(e) => onDataChange("vehicleType", e.target.value)}
          >
            <option value="" disabled>Select vehicle type</option>
            <option value="sedan">Saloon or sedan</option>
            <option value="suv">Small SUVs or Crossovers</option>
            <option value="truck">Min Pick-up trucks or Hilux</option>
            <option value="large-truck">Truck</option>
          </select>
        </div>

        <p className="text-xs text-gray-500">Saloon or sedan, Small SUVs or Crossovers, Min Pick-up trucks or Hilux, truck</p>

        <div className="space-y-2">
          <Label htmlFor="special-gadgets">Specify if any vehicle has any special gadget</Label>
          {/* <Input
            id="special-gadgets"
            placeholder="Enter special gadgets"
            value={data.specialGadgets || ""}
            onChange={(e) => onDataChange("specialGadgets", e.target.value)}
          /> */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="simulator-count">Numbers of Simulators</Label>
          {/* <Input
            id="simulator-count"
            placeholder="Enter numbers of simulators"
            value={data.simulatorCount || ""}
            onChange={(e) => onDataChange("simulatorCount", e.target.value)}
          /> */}
        </div>
      </div>
    </div>
  );
}
