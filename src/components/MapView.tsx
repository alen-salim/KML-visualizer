import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapData } from "@/hooks/useMapData";

interface MapViewProps {
  geoJsonData: GeoJSON.FeatureCollection | null;
}

const MapView: React.FC<MapViewProps> = ({ geoJsonData }) => {
  const { mapData, updateMapData } = useMapData();
  const mapRef = useRef<L.Map | null>(null);

  // Update map data when geoJsonData changes
  useEffect(() => {
    if (geoJsonData) {
      updateMapData(geoJsonData);

      // Zoom to the uploaded data bounds
      if (mapRef.current) {
        const geoJsonLayer = L.geoJSON(geoJsonData);
        const bounds = geoJsonLayer.getBounds();
        mapRef.current.fitBounds(bounds);
      }
    }
  }, [geoJsonData, updateMapData]);

  return (
    <div className="map-container">
      <MapContainer
        ref={mapRef}
        center={[20.5937, 78.9629]} // Default to India's coordinates
        zoom={5}
        className="h-96 w-full rounded-lg shadow-md"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Display GeoJSON data only if available */}
        {mapData.geoJsonData && (
          <GeoJSON
            key={JSON.stringify(mapData.geoJsonData)}
            data={mapData.geoJsonData}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;
