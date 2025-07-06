import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

export default function MapDisplay({ coordinates }) {
  const [position, setPosition] = useState([32.0853, 34.7818]); // Default: Tel Aviv

  useEffect(() => {
    if (coordinates) {
      setPosition([coordinates.lat, coordinates.lon]);
    }
  }, [coordinates]);

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
}
