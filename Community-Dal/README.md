# Community@Dal Social Media Platform

Community is a full‑stack social media web application built for Dalhousie University students and employees, providing a secure space to connect, share, and collaborate within the campus community.[file:226][file:227]

---

## Overview

- Users can **create accounts with Dal.ca emails**, manage profiles, connect with friends, and participate in group discussions.[file:226][file:227]  
- The platform supports core social networking features such as posts, comments, likes, messaging, and friend relationships, backed by a relational data model.[file:225][file:226]  
- Administrators have dedicated tools to manage user access, roles, and platform integrity.

---

## Tech Stack

- **Frontend**: React (SPA), with routing, protected pages, and responsive UI components.[file:225][file:226]  
- **Backend**: Spring Boot (Java, Maven) exposing REST APIs for authentication, user management, posts, friends, and search.[file:225][file:227]  
- **Database**: Relational schema (e.g., MySQL) with tables for users, posts, comments, messages, likes, tags, categories, and friendships.[file:225]

---

## Features

### User Accounts & Security

- **Sign‑up**: Register with a Dalhousie email (`@dal.ca`) and strong password (min length with case, digit, and special‑character rules), plus a security question for recovery.[file:227]  
- **Login & authorization**: Authenticated access is required for most pages; only Login, Sign‑up, and Forgot Password are public.[file:227]  
- **Forgot Password**: Reset password by correctly answering the stored security question.[file:227]

### Social & Admin Functionality

- **Dashboard / Home**: View friends’ posts and see friend recommendations curated for the user.[file:227]  
- **Friends**: Send, accept, or reject friend requests; delete, deactivate, or unfollow friends to control visibility of profiles and feeds.[file:225][file:227]  
- **Profiles**: Update personal information, interests, and **status** (e.g., Away, Busy, Available) visible to friends.[file:227]  
- **Admin tools**: Add or remove Dal students and employees, approve or reject membership requests, and manage user roles and statuses.[file:226]

---

## Data Model

The backend uses a normalized schema to capture all core social interactions:[file:225]

- `User`: profile data, credentials, bio, profile picture, and metadata.  
- `Post`, `Comment`, `Post_Like`: posts and their comments, likes, and timestamps.  
- `Friend`: many‑to‑many friendships between users, with status (e.g., pending, accepted).[file:225]  
- `Category`, `Tag`, `Post_Tag`: post classification and tagging for better organization and search.  
- `Message`: direct messages between users, tracking sender, receiver, and sent time.[file:225]

This structure supports one‑to‑many and many‑to‑many relationships such as user–posts, posts–tags, and user–friends.[file:225]
