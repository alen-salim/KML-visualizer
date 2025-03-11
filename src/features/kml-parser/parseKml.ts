import { DOMParser } from "@xmldom/xmldom";
import { kml } from "@tmcw/togeojson";

/**
 * Parses a KML string into a GeoJSON FeatureCollection.
 * @param {string} kmlString - The KML file content as a string.
 * @returns {GeoJSON.FeatureCollection} - Parsed GeoJSON data.
 */
export const parseKml = (kmlString: string): GeoJSON.FeatureCollection => {
  const xmlData = new DOMParser().parseFromString(kmlString, "text/xml");
  return kml(xmlData) as GeoJSON.FeatureCollection;
};
