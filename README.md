🌍 Glacier Map — Alpine Glacier Visualization Platform










Glacier Map is an experimental scientific web platform designed to visualize and explore the evolution of Alpine glaciers.

The project aims to make glaciological and climate-related data accessible to students, researchers, and the general public through interactive maps and visual dashboards.

The platform combines geospatial visualization, climate indicators, and modern containerized infrastructure to provide an educational and exploratory environment.

🚀 Live Demo

Public demo:

https://glacier-map.org

📸 Screenshots
Interactive Glacier Map

Glacier Statistics Dashboard

Altitude visualization


Glacier surface monitoring


Glacier evolution indicators


Carbon Footprint Estimator

Educational module for climate awareness.

Alpine Wildlife Awareness

Environmental education module highlighting Alpine fauna.

🎯 Features
Interactive Alpine glacier map (Leaflet)
Glacier statistics dashboards (Chart.js)
Visualization of:
glacier altitude
glacier surface
glacier evolution indicators
Educational carbon footprint estimator
Alpine wildlife awareness section
Responsive interface accessible on multiple devices
Modular architecture ready for scientific dataset integration
🧱 Architecture

The platform follows a modular architecture designed for scalability and experimentation.

Users
 │
Frontend (Leaflet + Chart.js)
 │
Flask REST API
 │
Glacier datasets / Database

This architecture separates:

visualization layer
API services
datasets

making the project easy to maintain and extend.

🖥️ Frontend

Technologies used:

HTML
CSS
JavaScript

Libraries:

Leaflet — interactive geospatial visualization
Chart.js — scientific data visualization

Responsibilities:

rendering glacier maps
displaying dashboards
managing user interaction
visualizing datasets
⚙️ Backend

Backend built using:

Python
Flask REST API

Responsibilities:

serving glacier datasets
computing statistics
providing API endpoints for the dashboards
handling evolution indicators
🗄️ Data

Current datasets include:

glacier altitude
glacier surface
geographic coordinates
evolution indicators

Data format:

JSON datasets

Future improvements:

PostgreSQL / PostGIS integration
scientific glacier datasets
climate indicators
temperature and long-term glacier monitoring data

Potential scientific data sources:

GLAMOS — Glacier Monitoring Switzerland
WGMS — World Glacier Monitoring Service
ESA Climate Change Initiative
NASA GLIMS Glacier Database
🐳 Containerization

Infrastructure uses:

Docker
Docker Compose

Services:

frontend
backend API
database (future integration)

Benefits:

reproducible environment
simplified deployment
cloud-ready architecture
easier collaboration
📂 Project Structure
glacier-map/
│
├── backend/            # Flask REST API
├── frontend/           # Web interface (HTML/CSS/JS)
├── data/               # Glacier datasets
├── docs/
│   └── screenshots/    # README images
│
├── docker-compose.yml
└── README.md
⚙️ Getting Started

Clone the repository:

git clone https://github.com/your-username/glacier-map.git

Run the application using Docker:

docker compose up --build

Open the application in your browser:

http://localhost:8080
🚧 Project Status

Current stage: functional prototype

Implemented features:

✔ Interactive glacier map
✔ Glacier altitude dashboard
✔ Glacier surface dashboard
✔ Alpine wildlife section
✔ Carbon footprint estimator

In development:

glacier historical evolution dashboards
integration of scientific datasets
improved data harmonization
🛣️ Roadmap
Short Term
finalize glacier evolution dashboards
improve dataset quality
add scientific references
Mid Term
climate indicators
temperature datasets
glacier historical comparisons
Long Term
large-scale Alpine glacier datasets
collaboration with scientific institutions
public educational platform
🌱 Vision

The long-term objective of Glacier Map is to become an educational and scientific visualization platform helping users understand:

glacier retreat
climate change impacts
Alpine environmental dynamics

The project also serves as a practical experiment in:

scientific data visualization
geospatial web technologies
containerized infrastructure
environmental awareness
👤 Author

Thomas Balutch

Linux System & Network Administrator
DevOps-oriented engineer

Personal project combining:

infrastructure engineering
geospatial visualization
climate awareness
scientific data experimentation
🤝 Collaboration

Researchers, institutions, and developers interested in glacier data visualization or climate data projects are welcome to collaborate.

⭐ If you find this project interesting

Feel free to:

star the repository
open issues
propose improvements
contribute datasets or visualizations
