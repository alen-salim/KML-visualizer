import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

interface SummaryProps {
  data: GeoJSON.FeatureCollection | null;
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
  if (!data) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Summary</AlertTitle>
        <AlertDescription>No data available</AlertDescription>
      </Alert>
    );
  }

  const counts = data.features.reduce((acc, feature) => {
    const type = feature.geometry?.type || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-2">Summary</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Element Type</th>
            <th className="border p-2 text-left">Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(counts).map(([type, count]) => (
            <tr key={type}>
              <td className="border p-2">{type}</td>
              <td className="border p-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Summary;
