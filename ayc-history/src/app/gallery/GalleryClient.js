"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import "./gallery.css";
import "./carousel.css";
import "shareon/css";
import { motion } from "motion/react";
import Carousel from "./Carousel";

const Artifact = dynamic(() => import("../_components/Artifact"), {
    ssr: false,
});

function GalleryContent() {
    const [artifacts, setArtifacts] = useState([]);
    const [selectedArtifact, setSelectedArtifact] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [availableCategories, setAvailableCategories] = useState([]);

    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    useEffect(() => {
        fetch("/api/artifacts")
            .then((res) => res.json())
            .then((data) => {
                setArtifacts(
                    (Array.isArray(data) ? data : [])
                        .filter((a) => a.visible === true || a.visible === 1)
                        .sort((a, b) => a.priority - b.priority)
                );
            })
            .catch((err) => {
                console.error("Error fetching artifacts:", err);
                setArtifacts([]);
            });
    }, []);

    useEffect(() => {
        const allTags = new Set();
        const allCategories = new Set();
        artifacts.forEach((a) => {
            if (a.category) allCategories.add(a.category);
            a.tags?.forEach((tag) => allTags.add(tag));
        });
        setAvailableTags([...allTags]);
        setAvailableCategories([...allCategories]);
    }, [artifacts]);

    useEffect(() => {
        import("shareon").then((Shareon) => {
            Shareon.init();
        });
    }, [selectedArtifact]);

    const handleOpenArtifact = (artifact) => {
        setSelectedArtifact(artifact);
        router.push(`/gallery?id=${artifact.id}`, { scroll: false });
    };

    const handleCloseArtifact = () => {
        setSelectedArtifact(null);
        router.push("/gallery", { scroll: false });
    };

    useEffect(() => {
        if (id && artifacts.length > 0) {
            const artifact = artifacts.find((a) => a.id.toString() === id);
            if (artifact) {
                setSelectedArtifact(artifact);
            }
        }
    }, [id, artifacts]);

    const filteredArtifacts = artifacts.filter((artifact) => {
        const matchesTitle = artifact.artifact_title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesTag =
            !selectedTag || (artifact.tags && artifact.tags.includes(selectedTag));
        const matchesCategory =
            !selectedCategory || artifact.category === selectedCategory;
        return matchesTitle && matchesTag && matchesCategory;
    });

    return (
        <>
            
            <motion.div
                className="gallery-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="gallery-title">Explore Our Artifacts</h1>
                <p className="gallery-subtitle">
                    Browse the history of the Armdale Yacht Club through our digital collection.
                </p>
            </motion.div>
            

            <div className="search-wrapper py-3">
                <div className="container d-flex justify-content-center">
                    <div className="input-group w-50 shadow-sm">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="🔍 Search artifacts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="container mb-4">
                <div className="filter-row">
                    <select
                        className="custom-select"
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                    >
                        <option value="">All Tags</option>
                        {availableTags.map((tag, idx) => (
                            <option key={idx} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>

                    <select
                        className="custom-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {availableCategories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="container my-5">
                {filteredArtifacts.length === 0 ? (
                    <p>No artifacts available.</p>
                ) : (
                    <Carousel
                        artifacts={filteredArtifacts}
                        options={{ loop: true, align: 'start' }}
                        onArtifactClick={handleOpenArtifact}
                    />
                )}

                {selectedArtifact && (
                    <div className="artifact-overlay" onClick={handleCloseArtifact}>
                        <div
                            className="artifact-modal-wrapper"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Artifact
                                artifact={{
                                    ...selectedArtifact,
                                    onClose: handleCloseArtifact,
                                    shareUrl: `${window.location.origin}/gallery/${selectedArtifact.id}`,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default function GalleryClient() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GalleryContent />
        </Suspense>
    );
}
