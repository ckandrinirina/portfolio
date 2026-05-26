// Module de contenu en français — locale par défaut.
//
// Ce fichier est l'unique source de vérité pour tout le contenu du portfolio
// en français. Il satisfait l'interface `PortfolioContent` via l'opérateur
// `satisfies` : tout champ manquant ou superflu est une erreur TypeScript.
//
// Règles :
// - Texte brut UTF-8 uniquement (pas de HTML, pas de JSX, pas de Markdown).
// - Noms de technologies et noms propres restent en anglais/non traduits.
// - Localisation de contact : ville et pays uniquement, jamais l'adresse complète.

import type { PortfolioContent } from './types'

export default {
  // ─── HERO ────────────────────────────────────────────────────────────────────

  hero: {
    name: 'Erick Andrinirina',
    title: 'Développeur Fullstack JavaScript',
    positioning:
      "7 ans d'expérience dans la conception et le développement d'applications web performantes et évolutives.",
    location: 'Antananarivo, Madagascar',
    ctaViewProjects: 'Voir les projets',
    ctaDownloadCv: 'Télécharger le CV',
    ctaContact: 'Me contacter',
  },

  // ─── ABOUT ───────────────────────────────────────────────────────────────────

  about: {
    narrative:
      "Développeur Fullstack expérimenté avec 7 ans d'expertise dans la conception d'applications web haute performance. À l'aise dans les écosystèmes JavaScript et PHP — React et Angular côté front-end, Node.js, Symfony et Laravel côté back-end — avec une solide maîtrise des bases de données MongoDB, PostgreSQL et MySQL. Motivé par les défis techniques et toujours à la recherche de nouvelles opportunités pour contribuer au succès d'un projet.",
  },

  // ─── SKILLS ──────────────────────────────────────────────────────────────────

  skills: [
    {
      label: 'Langages',
      items: [
        'TypeScript',
        'JavaScript',
        'PHP',
        'Python',
        'Java',
        'C/C++/.NET',
        'HTML5',
        'CSS/SCSS',
        'SQL',
      ],
    },
    {
      label: 'Frameworks & bibliothèques Front-end',
      items: [
        'React',
        'Angular',
        'Vue.js',
        'Redux',
        'Recoil',
        'React Native',
        'Angular Material',
        'PrimeReact',
        'Bootstrap',
        'Tailwind CSS',
        'Formik',
        'Zod',
      ],
    },
    {
      label: 'Frameworks Back-end',
      items: [
        'Node.js',
        'NestJS',
        'Symfony',
        'Laravel',
        'CodeIgniter',
        'API Platform',
      ],
    },
    {
      label: 'Bases de données',
      items: [
        'PostgreSQL',
        'MySQL',
        'MariaDB',
        'MongoDB',
        'SQLite',
        'Firebase',
      ],
    },
    {
      label: 'Outils & DevOps',
      items: [
        'Git',
        'Docker',
        'Vercel',
        'Google Cloud Run',
        'Azure',
        'NPM',
        'Composer',
      ],
    },
    {
      label: 'Tests',
      items: ['Jest', 'Jasmine', 'Karma'],
    },
    {
      label: 'IA & Spécialisé',
      items: ['OpenAI', 'Tesseract / Node-Tesseract OCR', 'Blockchain'],
    },
    {
      label: 'Gestion de projet & design',
      items: ['Jira', 'Trello', 'Figma / Adobe XD'],
    },
  ],

  // ─── EXPERIENCE ──────────────────────────────────────────────────────────────
  // Ordre : du plus récent au plus ancien.

  experience: [
    // 1 — SOKA / YAS Madagascar
    {
      company: 'SOKA / YAS Madagascar',
      role: 'Développeur Full Stack',
      period: 'Janv. 2025 – présent',
      techHighlights: [
        'Next.js',
        'NestJS',
        'Prisma',
        'Redux Toolkit',
        'React Admin',
        'Tailwind CSS',
        'PostgreSQL',
        'Web3/blockchain',
        'Messagerie temps réel',
        'Google Cloud',
      ],
      projects: [
        {
          name: 'SOKA CLUB',
          description:
            "Plateforme digitale multifonctionnelle combinant billetterie d'événements, boutique en ligne et mini-jeux interactifs, avec paiements en USDC et un système de points SOKA.",
        },
        {
          name: 'SOKA LIVE',
          description:
            'Plateforme de pronostics footballistiques avec classements et récompenses pour les meilleurs pronostiqueurs.',
        },
        {
          name: 'LUDOKA',
          description:
            "Jeux de Ludo compétitifs intégrés à l'écosystème SOKA, avec classements et gains pour les joueurs.",
        },
      ],
    },

    // 2 — BMOI Madagascar
    {
      company: 'BMOI Madagascar',
      role: 'Développeur Full Stack',
      period: 'Juill. 2024 – Janv. 2025',
      techHighlights: [
        'React',
        'Node.js',
        'TypeScript',
        "Vérification vidéo d'identité",
        'Gestion sécurisée de documents',
        'KYC',
      ],
      projects: [
        {
          name: 'EER Full Digital',
          description:
            "Service en ligne de création de compte bancaire avec vérification d'identité par vidéo et gestion sécurisée des documents pour le processus KYC.",
        },
      ],
    },

    // 3 — SHOYO
    {
      company: 'SHOYO',
      role: 'Développeur Full Stack / Lead Developer',
      period: 'Janv. 2021 – Juill. 2024',
      techHighlights: [
        'React',
        'Angular',
        'Node.js',
        'NestJS',
        'TypeScript',
        'PostgreSQL',
        'MongoDB',
        'OpenAI GPT-4',
        'OCR / Tesseract',
        'Migration PHP vers JavaScript',
      ],
      projects: [
        {
          name: 'SHOYO',
          description:
            "Plateforme de dossier numérique simplifiant les procédures financières, incluant une migration majeure d'un framework PHP vers une stack JavaScript moderne.",
        },
        {
          name: 'THESEIS',
          description:
            "Solution de gestion numérique de documents permettant la classification, le stockage et la recherche de documents d'entreprise.",
        },
        {
          name: 'Happy Capital / My Capital Immo',
          description:
            "Plateforme de financement participatif immobilier avec suivi en temps réel des investissements et tableaux de bord investisseurs.",
        },
        {
          name: "OCR – Extraction d'informations",
          description:
            "Solution exploitant l'OCR et GPT-4 pour convertir des images et PDF (cartes d'identité, coordonnées bancaires, passeports) en données structurées.",
        },
      ],
    },

    // 4 — VTC Academy
    {
      company: 'VTC Academy',
      role: 'Développeur Full Stack',
      period: 'Juin 2020 – Déc. 2020',
      techHighlights: [
        'React',
        'Node.js',
        'MySQL',
        'QCM interactifs',
        'Tableau de bord administrateur',
      ],
      projects: [
        {
          name: 'Plateforme VTC Academy',
          description:
            "Site de formation pour chauffeurs VTC avec quiz à choix multiples et tableau de bord administrateur pour le suivi de la progression des étudiants.",
        },
      ],
    },

    // 5 — PANAFRI HELP
    {
      company: 'PANAFRI HELP',
      role: 'Développeur Full Stack',
      period: 'Janv. 2020 – Juin 2020',
      techHighlights: [
        'React',
        'Node.js',
        'PostgreSQL',
        "Conception de plateforme de bout en bout",
      ],
      projects: [
        {
          name: 'Plateforme PANAFRI HELP',
          description:
            "Plateforme de financement de projets développée de A à Z, de la conception à la mise en production, pour faciliter l'accès au financement en Afrique.",
        },
      ],
    },

    // 6 — CREACTISOFT
    {
      company: 'CREACTISOFT',
      role: 'Développeur Full Stack / Lead Developer',
      period: 'Sept. 2019 – Déc. 2020',
      techHighlights: [
        'Angular',
        'Symfony',
        'Laravel',
        'MySQL',
        'ERP sur mesure',
        'Automatisation',
      ],
      projects: [
        {
          name: 'IPSUM',
          description:
            "ERP commercial complet pour la gestion des ventes, des stocks et de la facturation.",
        },
        {
          name: 'SOLIUS',
          description:
            "ERP dédié au secteur de la construction pour la gestion des chantiers, des ressources et des devis.",
        },
        {
          name: 'MOZART',
          description:
            "ERP de gestion de la relation client (CRM) pour le suivi des interactions, des réclamations et du service après-vente.",
        },
        {
          name: 'ELISE',
          description:
            "Système automatisé de questionnaire après-vente permettant de collecter les retours clients et d'améliorer la qualité de service.",
        },
      ],
    },

    // 7 — INGENOSYA
    {
      company: 'INGENOSYA',
      role: 'Développeur Full Stack',
      period: 'Oct. 2018 – Sept. 2019',
      techHighlights: [
        'Angular',
        'Symfony',
        'Laravel',
        'MySQL',
        'React Native',
        'Applications multiplateformes',
      ],
      projects: [
        {
          name: 'BNI Madagascar',
          description:
            "Plateforme en ligne de demande de crédit bancaire permettant aux clients de simuler et soumettre leur dossier de prêt directement depuis leur navigateur.",
        },
        {
          name: 'FMFP',
          description:
            "Portail de financement inter-entreprises facilitant les échanges et les demandes de financement entre sociétés partenaires.",
        },
        {
          name: 'FORET MAD',
          description:
            "Application multiplateforme de classification de documents pour le Ministère des Forêts, permettant d'organiser et d'indexer les données forestières.",
        },
      ],
    },
  ],

  // ─── PROJECTS (curated showcase) ─────────────────────────────────────────────

  projects: [
    {
      name: 'SOKA Club',
      company: 'SOKA / YAS Madagascar',
      description:
        "Plateforme digitale multifonctionnelle combinant billetterie, boutique en ligne et mini-jeux, avec paiements en USDC et système de fidélité SOKA.",
      techTags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Web3', 'Tailwind CSS'],
    },
    {
      name: 'SOKA Live',
      company: 'SOKA / YAS Madagascar',
      description:
        "Plateforme de pronostics footballistiques en temps réel avec classements dynamiques et système de récompenses.",
      techTags: ['Next.js', 'NestJS', 'Redux Toolkit', 'PostgreSQL', 'WebSocket'],
    },
    {
      name: 'LUDOKA',
      company: 'SOKA / YAS Madagascar',
      description:
        "Jeux de Ludo compétitifs en ligne intégrés à l'écosystème SOKA avec gestion des parties en temps réel.",
      techTags: ['Next.js', 'NestJS', 'Prisma', 'PostgreSQL', 'Messagerie temps réel'],
    },
    {
      name: 'EER Full Digital',
      company: 'BMOI Madagascar',
      description:
        "Service bancaire en ligne d'ouverture de compte avec vérification d'identité par vidéo et gestion sécurisée des documents KYC.",
      techTags: ['React', 'Node.js', 'TypeScript', 'KYC', 'Vérification vidéo'],
    },
    {
      name: 'SHOYO',
      company: 'SHOYO',
      description:
        "Plateforme de dossier numérique pour la gestion des procédures financières, incluant une migration de PHP vers JavaScript.",
      techTags: ['React', 'NestJS', 'TypeScript', 'PostgreSQL', 'Migration PHP'],
    },
    {
      name: 'THESEIS',
      company: 'SHOYO',
      description:
        "Solution de gestion de documents numériques pour la classification, le stockage et la recherche documentaire en entreprise.",
      techTags: ['Angular', 'Node.js', 'MongoDB', 'TypeScript'],
    },
    {
      name: 'Happy Capital / My Capital Immo',
      company: 'SHOYO',
      description:
        "Plateforme de crowdfunding immobilier avec suivi en temps réel des investissements et tableaux de bord investisseurs interactifs.",
      techTags: ['React', 'NestJS', 'PostgreSQL', 'WebSocket', 'TypeScript'],
    },
    {
      name: 'OCR / GPT-4',
      company: 'SHOYO',
      description:
        "Extraction automatique de données depuis des images et PDF (identités, IBAN, passeports) grâce à l'OCR et GPT-4.",
      techTags: ['Node.js', 'OpenAI GPT-4', 'Tesseract OCR', 'TypeScript', 'PDF'],
    },
    {
      name: 'VTC Academy',
      company: 'VTC Academy',
      description:
        "Plateforme de formation pour chauffeurs VTC avec quiz interactifs et tableau de bord de suivi pédagogique.",
      techTags: ['React', 'Node.js', 'MySQL', 'QCM'],
    },
    {
      name: 'PANAFRI HELP',
      company: 'PANAFRI HELP',
      description:
        "Plateforme de financement de projets construite de bout en bout, de la conception à la production, pour l'Afrique.",
      techTags: ['React', 'Node.js', 'PostgreSQL'],
    },
    {
      name: 'IPSUM – ERP Commercial',
      company: 'CREACTISOFT',
      description:
        "ERP sur mesure pour la gestion commerciale : ventes, stocks, devis et facturation.",
      techTags: ['Angular', 'Symfony', 'MySQL', 'ERP'],
    },
    {
      name: 'BNI Madagascar',
      company: 'INGENOSYA',
      description:
        "Plateforme en ligne de demande de crédit bancaire pour BNI Madagascar, avec simulation et soumission de dossier en ligne.",
      techTags: ['Angular', 'Laravel', 'MySQL'],
    },
  ],

  // ─── EDUCATION ───────────────────────────────────────────────────────────────
  // Ordre : du plus récent au plus ancien.

  education: [
    {
      qualification: 'Formation en développement web avancé',
      institution: 'NEITIC',
      year: 'Juin 2019',
    },
    {
      qualification: "Ingénieur Master en Électronique, option Informatique Appliquée",
      institution: "École Supérieure Polytechnique d'Antananarivo",
      year: 'Juin 2018',
    },
    {
      // Institution inconnue — valeur vide conforme à la définition du type.
      qualification: 'Baccalauréat Scientifique',
      institution: '',
      year: 'Juin 2013',
    },
  ],

  // ─── SPOKEN LANGUAGES ────────────────────────────────────────────────────────

  spokenLanguages: [
    {
      language: 'Malgache',
      proficiency: 'Langue maternelle',
    },
    {
      language: 'Français',
      proficiency: 'Courant',
    },
    {
      language: 'Anglais',
      proficiency: 'Niveau professionnel',
    },
  ],

  // ─── CONTACT ─────────────────────────────────────────────────────────────────

  contact: {
    location: 'Antananarivo, Madagascar',
    intro:
      "Disponible pour de nouvelles opportunités. N'hésitez pas à me contacter pour discuter de votre projet.",
  },
} satisfies PortfolioContent
