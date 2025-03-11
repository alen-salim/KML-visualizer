/**
 * Represents a parsed KML file structure.
 */
export interface KmlFeature {
  type: string;
  properties: {
    name?: string;
    description?: string;
  };
  geometry: GeoJSON.Geometry;
}
