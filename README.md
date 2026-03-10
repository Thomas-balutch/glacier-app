

# 🌍 Glacier Map — Alpine Glacier Visualization Platform

Glacier Map is a scientific web platform designed to visualize and understand the evolution of Alpine glaciers.

The goal of the project is to make glaciological and climate data accessible to the public, students, and local institutions through interactive maps and visual dashboards.

The platform combines geospatial visualization, climate data interpretation and modern web infrastructure.

---

# 🚀 Live Demo

*(soon available)*

Example deployment:


https://glacier-map.org


---

# 📸 Screenshots

## Interactive Glacier Map

![Glacier Map](docs/screenshots/map.png)

## Glacier Statistics Dashboard

![Statistics](docs/screenshots/stats.png)

## Carbon Impact Calculator

![Carbon Impact](docs/screenshots/carbon.png)

## Alpine Wildlife

![Wildlife](docs/screenshots/fauna.png)

---

# 🎯 Project Features

• Interactive map of Alpine glaciers (Leaflet)

• Data dashboards (Chart.js):
- glacier altitude
- glacier surface
- glacier evolution

• Educational carbon footprint estimator

• Alpine wildlife awareness section

• Scientific sources and references

---

# 🧱 Architecture Overview

The project follows a simple and clear architecture:


Frontend → API Backend → Database


### Frontend

Technologies:

- HTML
- CSS
- JavaScript

Libraries:

- Leaflet (interactive maps)
- Chart.js (data visualization)

Responsibilities:

- user interface
- map interaction
- dashboards rendering

---

### Backend

Python + Flask REST API

Handles:

- glacier data
- statistics
- evolution datasets
- API responses

---

### Data Layer

Currently using:

- JSON datasets

Future evolution:

- PostgreSQL database
- scientific datasets integration

---

### Containerization

Docker + Docker Compose

Services:

- frontend
- backend API
- database

Benefits:

- reproducible environment
- easy deployment
- cloud-ready architecture

---

# 📂 Project Structure


glacier-map/
│
├── backend/
│ └── Flask API
│
├── frontend/
│ └── HTML / CSS / JS interface
│
├── data/
│ └── glacier datasets
│
├── docker-compose.yml
│
└── README.md


---

# ⚙️ Getting Started

Clone the repository


git clone https://github.com/username/glacier-map.git


Run with Docker


docker compose up --build


Open in browser


http://localhost:8080


---

# 🚧 Project Status

Current progress: **functional prototype**

Implemented:

✔ interactive glacier map  
✔ altitude dashboard  
✔ glacier surface dashboard  
✔ Alpine wildlife section  
✔ carbon impact estimation  

In progress:

• glacier historical evolution dashboard  
• data harmonization across Alpine countries  
• scientific sources documentation  

---

# 🛣️ Roadmap

### Short term

- finalize glacier evolution charts
- improve datasets quality
- add scientific references

### Mid term

- climate indicators
- temperature data
- glacier historical datasets

### Long term

- VPS deployment
- HTTPS (Let's Encrypt)
- public educational platform
- potential partnerships with Alpine institutions

---

# 🌱 Vision

Glacier Map aims to become an educational and scientific visualization tool to better understand glacier retreat and climate change impacts in the Alpine region.

The project also serves as a practical experiment in:

- system administration
- containerized infrastructure
- scientific data visualization

---

# 👤 Author

**Thomas Balutch**

Linux System & Network Administrator  
DevOps-oriented engineer

Personal project combining infrastructure, data visualization and climate awareness.
3️⃣ Où mettre les images
