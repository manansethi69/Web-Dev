"use client";

// This component displays a Leaflet map with artifact markers using OverlappingMarkerSpiderfier.
// When a marker is clicked, it navigates to the artifact detail page.

// Imports React hooks, Leaflet map components, and navigation tools
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useRouter } from "next/navigation";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import "./ArtifactMap.css";

// Loads the OMS library script if it's not already loaded
const loadSpiderfierScript = () => {
  return new Promise((resolve, reject) => {
    if (window.OverlappingMarkerSpiderfier) {
      resolve(); // already loaded
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/OverlappingMarkerSpiderfier-Leaflet/0.2.6/oms.min.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Spiderfier"));
    document.body.appendChild(script);
  });
};

// Subcomponent that adds spiderfied markers to the map
function SpiderfiedMarkers({ artifacts }) {
  const map = useMap();
  const router = useRouter();

  useEffect(() => {
    if (!window.OverlappingMarkerSpiderfier || !map) return;

    const customIcon = L.icon({
      iconUrl: '/img/pin.png',
      iconSize: [25, 40],
      iconAnchor: [19, 41],
      popupAnchor: [0, -41],
    });

    const oms = new window.OverlappingMarkerSpiderfier(map, {
      keepSpiderfied: true,
      nearbyDistance: 20,
    });

    // Adds a marker for each artifact and defines click behavior
    artifacts.forEach((art) => {
      const marker = L.marker(
        [parseFloat(art.latitude), parseFloat(art.longitude)],
        { icon: customIcon },
      );
      marker.bindPopup(
        `<strong>${art.artifact_title}</strong><br/>
   <a href="/gallery/${art.id}?fromMap=true" class="popup-link">View details</a>`,
      );
      marker.addTo(map);
      oms.addMarker(marker);
    });

    oms.addListener("spiderfy", function () {
      map.closePopup();
    });

    return () => oms.clearMarkers();
  }, [map, artifacts, router]);

  return null;
}

// Main map component: loads artifact data and renders the map
export default function ArtifactMap() {
  const [artifacts, setArtifacts] = useState([]);
  const [mounted, setMounted] = useState(false);

  // Only render on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    loadSpiderfierScript()
      .then(() => {
        fetch("/api/artifacts")
          .then((res) => res.json())
          .then((data) => {
            const visibleArtifacts = data.filter(art => art.visible === true || art.visible === 1);
            setArtifacts(visibleArtifacts);
          });
      })
      .catch((error) => {
        console.error("Error loading Spiderfier:", error);
      });
  }, [mounted]);

  // Don't render anything until mounted on client
  if (!mounted) {
    return null;
  }

  return (
    <MapContainer
      center={[44.6359, -63.5828]} // Centered around AYC
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="Tiles &copy; Esri"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
      />
      {artifacts.length > 0 && <SpiderfiedMarkers artifacts={artifacts} />}
    </MapContainer>
  );
}
