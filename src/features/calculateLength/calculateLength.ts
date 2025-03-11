import * as turf from "@turf/turf";

/**
 * Calculates the total length of a LineString or MultiLineString in kilometers.
 * @param {GeoJSON.Geometry} geometry - GeoJSON geometry data.
 * @returns {number} - Total length in kilometers.
 */
export const calculateLength = (geometry: GeoJSON.Geometry): number => {
  if (geometry.type === "LineString") {
    return turf.length(geometry as turf.LineString, { units: "kilometers" });
  }

  if (geometry.type === "MultiLineString") {
    return geometry.coordinates.reduce((total, line) => {
      const lineString = turf.lineString(line);
      return total + turf.length(lineString, { units: "kilometers" });
    }, 0);
  }

  return 0;
};
