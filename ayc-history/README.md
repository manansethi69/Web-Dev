# AYC History Website

The AYC History Website is a full‑stack web application for preserving and sharing the Armdale Yacht Club’s historical artifacts, built in collaboration with the client to increase community engagement and support AYC as a historic Halifax landmark.[file:208]

---

## Project Overview

- Provides tools for **creating, editing, and deleting artifacts** in a central collection.[file:208]  
- Public visitors can explore artifacts as a **gallery, interactive map, timeline, and curated story views** organized by topic or theme.[file:208]  
- Internal tooling and documentation are designed so future student teams and AYC staff can continue to expand the archive.

Key stakeholders include client Angela Sigel (AYC), course staff, and the CSCI x691 project team listed in the closing document.[file:208]

---

## Tech Stack

- **Frontend & Backend**: Next.js (full‑stack framework using App Router and API routes).[file:208]  
- **Database & Storage**: Supabase (Postgres + Supabase Storage for images/files) via the Supabase JavaScript SDK.[file:208]  
- **Animations & UX**: Framer Motion for smooth page transitions and interactive UI effects.[file:208]  
- **Deployment Targets**: Netlify or Vercel (not yet deployed; Netlify recommended for free‑tier hosting).[file:208]

The original Create React App + Express + AWS stack (RDS, EC2, S3) was fully migrated to this simplified Next.js + Supabase monorepo.[file:208]

---

## Features

- **Artifact management**  
  - Admin experience for creating, editing, and deleting artifacts with structured metadata (title, description, dates, location, themes, etc.).[file:208]  
  - Supabase Storage integration to associate uploaded images and documents with artifact records.[file:208]

- **Public exploration modes**  
  - Gallery views with card layouts and image carousels for browsing artifacts visually.[file:208]  
  - Map and timeline pages intended to let visitors explore artifacts by **location** and **historical period**.[file:208]  
  - Story‑based views for curated narratives that link multiple artifacts into a cohesive storyline (planned for future work).[file:208]

- **UX & SEO improvements**  
  - Site‑wide Framer Motion animations for page and card transitions to improve perceived polish.[file:208]  
  - Search‑engine optimization including metadata updates, sitemaps, and improved structure for better discoverability.[file:208]

---

## Current Status

At the end of the Fall 2025 term, the following work is complete:[file:208]

Migration to Next.js full‑stack architecture.

Migration of the database from AWS RDS to Supabase, including schema and data.[file:208]

Migration of server logic from Express on AWS EC2 to Next.js API routes.[file:208]

Integration with Supabase Storage for artifact images and files.[file:208]

Site‑wide Framer Motion animations and improved SEO configuration.[file:208]

Pending / future work includes:

Uploading and linking full digital artifact image sets from AYC archives.[file:208]

Completing interactive timeline and story‑scroll animations and refining the map view with accurate pinpoints.[file:208]

Building out content and narrative structure for timelines, themes, and site storytelling.[file:208]

Deploying to Netlify or Vercel, and optionally integrating a CMS (e.g., Sanity, Payload) or Clubspot for membership/operations.[file:208]

## Future Directions

The closing document outlines several recommended directions for future teams:[file:208]

Digital artifact population: ingest scanned photographs and documents, attach metadata, and optimize image loading (lazy loading / React Suspense).

Timeline, stories, and map: complete scroll‑driven storytelling, polish map pinpoints, and make exploration of the site feel like a guided tour of AYC.

Browsing by category/theme: build clear filters for cultural history, heritage buildings, regattas, and other themes.

Tourism and outreach: ensure the site functions as a coherent public archive that encourages visitors to learn about and visit AYC.

For questions, access to the Supabase project, or handoff details, see the closing document or contact the project leads listed there.[file:208]
