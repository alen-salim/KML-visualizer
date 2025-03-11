import React, { useState } from "react";
import FileUploader from "@/components/FileUploader";
import MapView from "@/components/MapView";
import Summary from "@/components/Summary";
import Detailed from "@/components/Detailed";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  const [geoJsonData, setGeoJsonData] =
    useState<GeoJSON.FeatureCollection | null>(null);

  // Controls for displaying Summary and Detailed sections
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [showDetailed, setShowDetailed] = useState<boolean>(false);

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">KML Visualizer</h1>

      {/* File Upload Section */}
      <FileUploader onFileParsed={setGeoJsonData} />

      {/* Map Display */}
      <MapView geoJsonData={geoJsonData} />

      {/* Summary and Detailed Buttons */}
      <div className="flex space-x-4 mt-4">
        <Button
          onClick={() => setShowSummary(!showSummary)}
          className={`${showSummary ? "bg-green-500" : "bg-blue-500"}`}
        >
          {showSummary ? "Hide Summary" : "Show Summary"}
        </Button>

        <Button
          onClick={() => setShowDetailed(!showDetailed)}
          className={`${showDetailed ? "bg-green-500" : "bg-blue-500"}`}
        >
          {showDetailed ? "Hide Details" : "Show Details"}
        </Button>
      </div>

      {/* Conditionally Render Summary & Detailed Sections */}
      {showSummary && <Summary data={geoJsonData} />}
      {showDetailed && <Detailed data={geoJsonData} />}
    </div>
  );
};

export default Home;
