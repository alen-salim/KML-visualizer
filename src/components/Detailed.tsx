import React from "react";
import { calculateLength } from "@/features/calculateLength";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

interface DetailedProps {
  data: GeoJSON.FeatureCollection | null;
}

const Detailed: React.FC<DetailedProps> = ({ data }) => {
  if (!data) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Details</AlertTitle>
        <AlertDescription>No data available</AlertDescription>
      </Alert>
    );
  }

  const lineDetails = data.features
    .filter((feature) =>
      ["LineString", "MultiLineString"].includes(feature.geometry?.type || "")
    )
    .map((feature) => ({
      type: feature.geometry?.type || "Unknown",
      length: calculateLength(feature.geometry),
    }));

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Detailed Information</h2>
      {lineDetails.map((line, index) => (
        <div key={index} className="mb-2">
          <strong>{line.type}</strong>: {line.length.toFixed(2)} km
        </div>
      ))}
    </div>
  );
};

export default Detailed;
