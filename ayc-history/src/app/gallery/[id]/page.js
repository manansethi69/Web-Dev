"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import "../gallery.css";

// Dynamically import components that use browser-only APIs with no SSR
const Artifact = dynamic(() => import("../../_components/Artifact"), {
    ssr: false,
});

export default function GalleryArtifactPage() {
    const [artifacts, setArtifacts] = useState([]);
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    // Only render on client side
    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch artifacts
    useEffect(() => {
        if (!mounted) return;

        fetch("/api/artifacts")
            .then((res) => res.json())
            .then((data) => {
                setArtifacts(
                    (Array.isArray(data) ? data : [])
                        .filter(a => a.visible === 1)
                        .sort((a, b) => a.priority - b.priority)
                );
            })
            .catch((err) => console.error("Error fetching artifacts:", err));
    }, [mounted]);

    // Find and display the artifact when id and artifacts are available
    useEffect(() => {
        if (id && artifacts.length > 0) {
            const artifact = artifacts.find((a) => a.id.toString() === id);
            if (artifact) {
                setSelectedArtifact(artifact);
            }
        }
    }, [id, artifacts]);

    const handleCloseArtifact = () => {
        setSelectedArtifact(null);
        router.push("/gallery", { scroll: false });
    };

    // Don't render anything until mounted on client
    if (!mounted) {
        return null;
    }

    return (
        <>
            {selectedArtifact && (
                <div className="artifact-overlay" onClick={handleCloseArtifact}>
                    <div className="artifact-modal-wrapper" onClick={(e) => e.stopPropagation()}>
                        <Artifact
                            artifact={{
                                ...selectedArtifact,
                                onClose: handleCloseArtifact,
                                shareUrl: `${window.location.origin}/gallery/${selectedArtifact.id}`
                            }}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
