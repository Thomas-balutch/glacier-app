🌍 Présentation du projet

Application Glacier est une plateforme web scientifique dédiée à la visualisation, l’analyse et la sensibilisation autour de l’évolution des glaciers alpins.

Le projet a pour objectif de rendre accessibles au grand public, aux étudiants et aux collectivités des données climatiques et glaciologiques à travers :

une carte interactive des glaciers,

des dashboards dynamiques (altitude, surface, évolution),

une API backend permettant l’exploitation des données,

une infrastructure moderne basée sur Docker.

L’application vise à devenir un outil pédagogique et scientifique pour illustrer concrètement les effets du changement climatique en zone alpine.

🎯 Objectifs

Montrer visuellement le recul des glaciers alpins

Centraliser des données fiables sur plusieurs pays (France, Suisse, Italie, Autriche, Allemagne)

Proposer une lecture simple et claire des phénomènes climatiques

Préparer une plateforme évolutive vers :

analyse scientifique,

sensibilisation environnementale,

projets éducatifs,

partenariats avec collectivités.

🕰️ Historique du projet

Le projet est né d’un constat simple :
les données climatiques existent, mais sont souvent peu accessibles au grand public.

Étapes clés

Phase laboratoire

Mise en place d’un environnement multi-VM.

Tests réseau, sécurité, conteneurs Docker.

Phase backend

Développement d’une API en Flask.

Structuration des données glaciers.

Mise en place des routes REST.

Phase frontend

Intégration de Leaflet pour la cartographie.

Intégration de Chart.js pour les dashboards.

Liaison API ↔ interface web.

Phase stabilisation

Docker Compose multi-services.

Gestion du firewall, des ports, du réseau.

Débogage réel (CORS, binding, routes, conteneurs).

Aujourd’hui, l’application dispose d’une base fonctionnelle solide :

carte interactive opérationnelle,

dashboards altitude et surface actifs,

infrastructure prête pour l’extension scientifique.

🧱 Architecture technique
Vue d’ensemble

L’architecture repose sur une séparation claire :

Frontend  →  API Backend  →  Base de données

🖥️ Frontend

HTML / CSS / JavaScript

Librairies :

Leaflet → cartographie interactive

Chart.js → graphiques et dashboards

Rôle :

affichage des glaciers,

interaction utilisateur,

visualisation des indicateurs.

⚙️ Backend

Python + Flask

Fournit une API REST

Gère :

les glaciers,

les statistiques,

les évolutions historiques.

🗄️ Données

Stockage structuré (JSON / base SQL selon évolution)

Données prévues :

altitude moyenne,

surface,

évolution temporelle,

localisation géographique.

🐳 Conteneurisation

Docker

Docker Compose

Services isolés :

frontend

backend

base de données

Avantages :

déploiement reproductible,

environnement stable,

facilité de migration vers VPS.

📁 Organisation du dépôt
application-glacier/
│
├── backend/            → API Flask
├── base de données/    → données & scripts
├── extremité avant/    → frontend (HTML/CSS/JS)
├── docker-compose.yml  → orchestration des services
├── statistiques.html  → interface principale
└── README.md           → documentation du projet

🚀 État actuel du projet
Fonctionnel

Carte interactive des glaciers

Dashboards :

altitude

surface

Communication frontend ↔ backend

Environnement Docker stable

En cours

Dashboard 3 :
Évolution historique de la Mer de Glace

Harmonisation des noms des glaciers européens

Ajout des sources scientifiques

🔮 Roadmap
Court terme

Finaliser les dashboards

Ajouter les évolutions temporelles

Stabiliser les données

Moyen terme

Ajouter :

températures alpines,

indicateurs climatiques

Mettre en place :

page scientifique,

méthodologie des données

Long terme

Déploiement sur VPS OVH

HTTPS (Let’s Encrypt)

Nom de domaine

Page dons & soutien

Version éducative pour écoles et collectivités

🌱 Vision du projet

Application Glacier n’est pas seulement un site web.
C’est une plateforme de sensibilisation climatique, conçue pour :

informer,

Ce projet s’inscrit dans une démarche d’apprentissage, d’expérimentation et de mise en pratique des bonnes pratiques système, conteneurisation et déploiement applicatif.

documenter,

alerter.

À terme, le projet ambitionne de devenir un outil de référence local sur l’évolution des glaciers alpins.

👤 Auteur
Thomas Balutch
Administrateur système é réseaux Linux orienté DevOps
