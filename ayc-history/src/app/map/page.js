"use client";

import dynamic from "next/dynamic";
import "./Map.css";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function MapPage() {
  return (
    <div className="map-page-wrapper">
      <h1 className="map-heading">
        Map of Artifact Locations
      </h1>

      <p className="map-subheading">
        Click a marker to explore an artifact.
      </p>

      <MapClient />
    </div>
  );
}

