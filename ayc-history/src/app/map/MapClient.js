"use client";

import dynamic from "next/dynamic";
import React from "react";
import "./Map.css";

const ArtifactMap = dynamic(() => import("../_components/ArtifactMap"), {
  ssr: false
});

export default function MapClient() {
  return (
    <div className="map-client-wrapper">
      <ArtifactMap />
    </div>
  );
}
