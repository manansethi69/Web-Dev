"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Timeline.css";

export function Timeline() {
    //Storing unique years for which to show timeline cards
  const [timelineData, setTimelineData] = useState([]);

  const router = useRouter();

  //Fetching all timeline data from the backend API on component mount
  useEffect(() => {
    fetch("/api/timeline")
      .then(response => response.json())
      .then(data => {
        const uniqueYears = {};

        //Filtering only the first artifact from each year (to avoid duplicates)
        const filtered = data.filter(item => {
          // Only allow years that are 4-digit numbers and unique
          if (
            item.year &&
            /^\d{4}$/.test(item.year) &&
            !uniqueYears[item.year]
          ) {
            uniqueYears[item.year] = true;
            return true;
          }
          return false;
        });

        setTimelineData(filtered);
      })
      .catch(err => console.error("Failed to fetch timeline data:", err));
  }, []);

  //Navigating to a detailed timeline for the selected year
  const handleReadMore = (year) => {
    router.push(`/timeline/${year}`);
  };

  return (
    <div>
      <div className="timeline-header">
        <h1>AYC Artifacts Timeline</h1>
      </div>
      <div className="artifact-line"></div>

      <div className="timeline-container">
        <div className="timeline-line" />

        {timelineData.map((item, index) => {
          const imagePath = item.images?.[0];
          const imageUrl = !imagePath
            ? "https://via.placeholder.com/150"
            : imagePath.startsWith('http')
            ? imagePath
            : `https://gggkhfcrgvelcoobqmyg.supabase.co/storage/v1/object/public/uploads/${imagePath}`;

          return (
            <div className="timeline-row" key={index}>
              <div className="timeline-dot" />
              <div className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
                <div className="timeline-content">
                  <h4 className="timeline-year">{item.year}</h4>
                  <div className="year-line"></div>
                  <h3 className="timeline-title">{item.artifact_title}</h3>
                  <img
                    src={imageUrl}
                    alt={item.artifact_title}
                    className="timeline-image"
                    onError={(e) => {
                      console.error('Failed to load image:', imageUrl);
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                  <p className="timeline-description">{item.description}</p>
                  <div className="timeline-end">
                    <button className="read-more-btn" onClick={() => handleReadMore(item.year)}>
                      Read Complete Timeline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}