"use client";

import React from 'react';
import { motion } from "motion/react";
import './HomePage.css';
import Link from 'next/link';

function HomePage() {
  return (
   <div className="homepage">

      {/* HERO */}
      <motion.section
         className="hero"
         initial={{ opacity: 0, y: -30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
      >

         <h1 className="section-title">Explore the Historical Resources<br/>of the Armdale Yacht Club</h1>
         <Link href="/gallery">
           <button className="btn dark">VIEW GALLERY</button>
         </Link>
      </motion.section>

      {/* SLIDING IMAGE STRIP A (uses Boats) */}
      <section
        className="slidingImage fancy-strip"
        style={{ backgroundImage: `url(/img/aycBoats.jpg)` }}
        aria-label="AYC boats on the water"
      >
        <img alt="" aria-hidden="true" />
      </section>

      {/* COMMUNITY LINKS */}
      <section className="community-links" aria-label="Community Links">
        <h2 className="section-title">Partners & Community</h2>
        <p className="community-sub">
          Open • Inclusive • Community-Oriented — highlighting AYC’s ties across the sailing community.
        </p>
        <div className="community-grid">
          {/* OPTI CUP CARD */}
         <a
            className="community-card opti"
            href="https://opticup.aycss.ca/regatta-news/sponsor-shout-out-atlantic-yacht-sales/"
            target="_blank"
            rel="noreferrer"
            aria-label="Opti Cup Sponsor Shout-Out – Atlantic Yacht Sales"
         >
            <div className="community-card-overlay">
               <div className="community-card-body">
                  <h3>Opti Cup: Sponsor Shout-Out</h3>
                  <p>Atlantic Yacht Sales — thank you for supporting youth sailing.</p>
                  <span className="community-cta">Visit article</span>
               </div>
            </div>
         </a>

         {/* BROADER REACH CARD */}
         <a
            className="community-card broader"
            href="https://www.broaderreach.ca/"
            target="_blank"
            rel="noreferrer"
            aria-label="Broader Reach program"
         >
            <div className="community-card-overlay">
               <div className="community-card-body">
                  <h3>Broader Reach</h3>
                  <p>Expanding access to sailing for everyone in our community.</p>
                  <span className="community-cta">Explore program</span>
               </div>
            </div>
         </a>

        </div>
      </section>

      {/* SLIDING IMAGE STRIP B (uses Boats) */}
      <section
        className="slidingImage fancy-strip alt"
        style={{ backgroundImage: `url(/img/aycBoats.jpg)` }}
        aria-label="AYC boats on the water"
      >
        <img alt="" aria-hidden="true" />
      </section>

      {/* WELCOME */}
      <motion.section
         className="welcome"
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         transition={{ duration: 0.6 }}
         viewport={{ once: true }}
      >

         <h1>WELCOME TO AYC HISTORY</h1>
         <p>
            The purpose of this project is to preserve the rich local history of the Armdale Yacht Club and
            to share artifacts, stories, and historical materials with the community. We aim to create
            an accessible digital archive that celebrates the heritage of AYC and ensures that future
            generations can explore and appreciate its legacy.
         </p>

         <div className="readmore">
            <Link href="/about">
              <button className="button btn-hover">
                READ MORE
                <img className="arrow-img" src="/img/arrow.png" alt="arrow" />
              </button>
            </Link>
         </div>
         <div className="line"></div>
      </motion.section>

      {/* SLIDING IMAGE STRIP C (uses Boats) */}
      <section
        className="slidingImage fancy-strip"
        style={{ backgroundImage: `url(/img/aycBoats.jpg)` }}
        aria-label="AYC sailing scene"
      >
        <img alt="" aria-hidden="true" />
      </section>

      {/* EXHIBITS */}
      <section className="exhibits">
         <h2 className="exhibits-stories-header">EXHIBITS & STORIES</h2>
         <div className="exhibit-cards">
            <div className="card">
               <img src="/img/melville-prison.jpg" alt="Melville Island Prison" />
               <h4>Melville Island Prison</h4>
               <p>Learn about the history of a prison on Melville Island.</p>
            </div>
            <div className="card">
               <img src="/img/ayc-boats.jpg" alt="Bluenose Fleet boats" />
               <h4>The Bluenose Fleet</h4>
               <p>Learn more about the history of Nova Scotia's iconic vessel.</p>
            </div>
            <div className="card">
               <img src="/img/coming soon.jpg" alt="Community at the club" />
               <h4>More Stories Coming Soon</h4>
               <p>Stay tuned for additional curated stories.</p>
            </div>
         </div>
      </section>

      {/* SLIDING IMAGE STRIP D (uses Boats) */}
      <section
        className="slidingImage fancy-strip alt"
        style={{ backgroundImage: `url(/img/aycBoats.jpg)` }}
        aria-label="AYC boats near the shoreline"
      >
        <img alt="" aria-hidden="true" />
      </section>

      {/* TIMELINE + MAP CTA STRIP */}
      <div className="timeline-map-container">
         <section className="historical-timeline cta-card">
            <h3>HISTORICAL TIMELINE</h3>
            <p>Explore key moments from AYC and the broader sailing community.</p>
            <Link href="/timeline">
              <button className="btn btn-hover">VIEW TIMELINE</button>
            </Link>
         </section>

         <section className="artifact-map-home cta-card">
            <h3>ARTIFACT MAP</h3>
            <p>Browse artifacts by location and discover their stories.</p>
            <Link href="/map">
              <button className="btn btn-hover">VIEW MAP</button>
            </Link>
         </section>
      </div>

   </div>
  );
}

export default HomePage;
