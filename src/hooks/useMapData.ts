import { useState } from "react";
import { MapData } from "@/types";

export const useMapData = () => {
  const [mapData, setMapData] = useState<MapData>({ geoJsonData: null });

  const updateMapData = (newData: GeoJSON.FeatureCollection) => {
    setMapData({ geoJsonData: newData });
  };

  return { mapData, updateMapData };
};
