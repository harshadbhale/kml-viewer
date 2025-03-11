import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapComponentProps {
  data: any;
}

const FitBounds: React.FC<{ data: any }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (data) {
      const bounds = L.geoJSON(data).getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] }); 
      }
    }
  }, [data, map]);

  return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ data }) => {
  const [geoJsonKey, setGeoJsonKey] = useState(0); 

  useEffect(() => {
    setGeoJsonKey((prevKey) => prevKey + 1); 
  }, [data]);

  if (!data) return null;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer key={geoJsonKey} center={[20, 78]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON key={geoJsonKey} data={data} />
        <FitBounds data={data} /> 
      </MapContainer>
    </div>
  );
};

export default MapComponent;
