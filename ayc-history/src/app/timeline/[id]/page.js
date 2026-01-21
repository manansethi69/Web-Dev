"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import "./YearTimeline.css";
import { motion } from "motion/react";

const YearTimeline = () => {
  const params = useParams();
  const year = params.id;

  const [artifacts, setArtifacts] = useState([]);
  const wrapperRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !year) return;

    fetch(`/api/timeline/${year}`)
      .then((res) => res.json())
      .then((data) => setArtifacts(data))
      .catch((err) => console.error("Error loading year timeline:", err));
  }, [year, mounted]);

  useEffect(() => {
    if (wrapperRef.current) {
      setLineHeight(wrapperRef.current.scrollHeight);
    }
  }, [artifacts]);

  const handleClick = (artifactNumber) => {
    router.push(`/gallery/${artifactNumber}`);
  };

  const handleBackClick = () => {
    router.push(`/timeline`);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="year-timeline-container">

      <motion.h2
        className="year-title-timeline"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Artifacts from {year}
      </motion.h2>

      <div className="year-artifact-line"></div>

      <motion.div
        onClick={() => handleBackClick()}
        className="year-read-more-btn"
        style={{ marginBottom: "20px" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }}
      >
        ← Back
      </motion.div>

      <div className="year-timeline-wrapper" ref={wrapperRef}>
        <div
          className="year-timeline-line"
          style={{ height: `${lineHeight}px` }}
        ></div>

        {artifacts.map((artifact, index) => (
          <motion.div
            className="year-timeline-row"
            key={index}
            onClick={() => handleClick(artifact.artifact_number)}
            style={{ cursor: "pointer" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="year-timeline-dot"></div>
            <div className="year-timeline-item">
              <div className="year-timeline-content">

                {artifact.images && artifact.images.length > 0 && (
                  <img
                    src={
                      artifact.images[0].startsWith('http')
                        ? artifact.images[0]
                        : `https://gggkhfcrgvelcoobqmyg.supabase.co/storage/v1/object/public/uploads/${artifact.images[0]}`
                    }
                    alt={artifact.artifact_title}
                  />
                )}

                <div className="year-card-text">
                  <h3 className="year-timeline-title">
                    {artifact.artifact_title}
                  </h3>
                  <p className="year-timeline-description">
                    {artifact.description}
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default YearTimeline;
