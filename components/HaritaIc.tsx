"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Leaflet'in varsayılan pin ikonunu CDN'den yüklüyoruz (bundler asset sorununu önler).
const pinIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const IZMIR: [number, number] = [38.4237, 27.1428];

type Props = {
  enlem?: number;
  boylam?: number;
  /** true ise haritaya tıklayınca pin koyar (admin için) */
  secilebilir?: boolean;
  onSec?: (enlem: number, boylam: number) => void;
};

function TiklamaYakalayici({ onSec }: { onSec: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSec(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function HaritaIc({ enlem, boylam, secilebilir, onSec }: Props) {
  const varMi = enlem !== undefined && boylam !== undefined;
  const merkez: [number, number] = varMi ? [enlem!, boylam!] : IZMIR;

  return (
    <MapContainer
      center={merkez}
      zoom={varMi ? 15 : 12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {varMi && (
        <Marker
          position={[enlem!, boylam!]}
          icon={pinIcon}
          draggable={secilebilir}
          eventHandlers={
            secilebilir && onSec
              ? {
                  dragend: (e) => {
                    const p = e.target.getLatLng();
                    onSec(p.lat, p.lng);
                  },
                }
              : undefined
          }
        />
      )}
      {secilebilir && onSec && <TiklamaYakalayici onSec={onSec} />}
    </MapContainer>
  );
}
