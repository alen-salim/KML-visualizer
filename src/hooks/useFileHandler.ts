import { useState } from "react";
import { parseKml } from "@/features/kml-parser";

export const useFileHandler = () => {
  const [geoJsonData, setGeoJsonData] =
    useState<GeoJSON.FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    if (!file.name.endsWith(".kml")) {
      setError("Invalid file type. Please upload a KML file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const geoJsonData = parseKml(e.target?.result as string);
        setGeoJsonData(geoJsonData);
        setError(null);
      } catch (err) {
        setError("Error parsing the KML file. Please check the file content.");
      }
    };
    reader.readAsText(file);
  };

  return { geoJsonData, handleFileUpload, error };
};
