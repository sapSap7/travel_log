import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";

function FlyToLocation({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (coordinates) {
      map.flyTo([coordinates.lat, coordinates.lon], 13, {
        animate: true,
        duration: 1.5,
      });
    }
  }, [coordinates, map]);

  return null;
}

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
      <FlyToLocation coordinates={coordinates} />
      <Marker position={position}>
        <Popup>Your location</Popup>
      </Marker>
    </MapContainer>
  );
}
