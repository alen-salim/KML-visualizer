import React, { useState } from "react";
import { DOMParser } from "@xmldom/xmldom";
import { kml } from "@tmcw/togeojson";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
Input;

interface FileUploaderProps {
  onFileParsed: (data: GeoJSON.FeatureCollection) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileParsed }) => {
  const [error, setError] = useState<string | null>(null);

  // Handle file upload and parsing
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".kml")) {
      setError("Invalid file type. Please upload a KML file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const kmlData = new DOMParser().parseFromString(
          e.target?.result as string,
          "text/xml"
        );
        const geoJsonData = kml(kmlData) as GeoJSON.FeatureCollection;
        onFileParsed(geoJsonData);
        setError(null); // Clear errors if successful
      } catch (err) {
        setError("Error parsing the KML file. Please check the file content.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="kmlfile">Upload KML File</Label>
        <Input
          id="kmlfile"
          type="file"
          accept=".kml"
          onChange={handleFileUpload}
        />

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
