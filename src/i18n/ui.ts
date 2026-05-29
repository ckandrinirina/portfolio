/**
 * Typed per-locale map of all UI micro-labels — strings that are not part
 * of the portfolio content narrative but are needed to render the site's
 * navigation, buttons, and accessible controls.
 *
 * No JSX, no component imports, no presentation logic — declarations only.
 * The `Record<'fr' | 'en', UiLabels>` typing enforces that both locales
 * provide every key; a missing key in either locale is a compile-time error.
 */

export type UiLabels = {
  // Navigation labels (8 keys — one per section)
  navHero: string
  navAbout: string
  navSkills: string
  navExperience: string
  navProjects: string
  navEducation: string
  navLanguages: string
  navContact: string

  // Button labels
  viewProjects: string
  downloadCv: string
  contact: string

  // Aria-labels for the chrome toggles
  languageSwitcher: string
  themeToggle: string

  // Footer
  builtWith: string

  // ── Atelier shell labels (story 01-03) ──
  // Per-route nav (new routes; navExperience/navSkills/navContact reused above)
  navHome: string
  navWork: string
  navProcess: string

  // Command-palette group headers
  cmdkNavigation: string
  cmdkQuick: string
  cmdkProjects: string

  // Copy-to-clipboard feedback
  copy: string
  copied: string

  // Project actions
  readCase: string
  visitLive: string

  // View eyebrows
  eyebrowWork: string
  eyebrowExperience: string
  eyebrowSkills: string
  eyebrowProcess: string
  eyebrowContact: string

  // Sidebar footer status chips
  footerStatus: string
  footerRegion: string
  footerPaired: string
}

export const ui: Record<'fr' | 'en', UiLabels> = {
  fr: {
    // Navigation
    navHero: 'Accueil',
    navAbout: 'À propos',
    navSkills: 'Compétences',
    navExperience: 'Expérience',
    navProjects: 'Projets',
    navEducation: 'Éducation',
    navLanguages: 'Langues',
    navContact: 'Contact',

    // Buttons
    viewProjects: 'Voir les projets',
    downloadCv: 'Télécharger le CV',
    contact: 'Me contacter',

    // Aria-labels
    languageSwitcher: 'Changer de langue',
    themeToggle: 'Basculer le thème clair/sombre',

    // Footer
    builtWith: 'Créé avec React & Vite',

    // ── Atelier shell ──
    navHome: 'Accueil',
    navWork: 'Projets sélectionnés',
    navProcess: 'Ma méthode',

    cmdkNavigation: 'Navigation',
    cmdkQuick: 'Actions rapides',
    cmdkProjects: 'Projets',

    copy: 'Copier',
    copied: 'Copié',

    readCase: 'Lire le cas',
    visitLive: 'Voir en ligne',

    eyebrowWork: 'Projets sélectionnés',
    eyebrowExperience: 'Parcours',
    eyebrowSkills: 'Boîte à outils',
    eyebrowProcess: 'Ma méthode',
    eyebrowContact: 'Prendre contact',

    footerStatus: 'disponible',
    footerRegion: 'tnr · utc+3',
    footerPaired: 'en binôme avec claude-code',
  },

  en: {
    // Navigation
    navHero: 'Home',
    navAbout: 'About',
    navSkills: 'Skills',
    navExperience: 'Experience',
    navProjects: 'Projects',
    navEducation: 'Education',
    navLanguages: 'Languages',
    navContact: 'Contact',

    // Buttons
    viewProjects: 'View projects',
    downloadCv: 'Download CV',
    contact: 'Get in touch',

    // Aria-labels
    languageSwitcher: 'Switch language',
    themeToggle: 'Toggle light/dark theme',

    // Footer
    builtWith: 'Built with React & Vite',

    // ── Atelier shell ──
    navHome: 'Home',
    navWork: 'Selected work',
    navProcess: 'How I work',

    cmdkNavigation: 'Navigation',
    cmdkQuick: 'Quick actions',
    cmdkProjects: 'Projects',

    copy: 'Copy',
    copied: 'Copied',

    readCase: 'Read case',
    visitLive: 'Visit live',

    eyebrowWork: 'Selected work',
    eyebrowExperience: 'Career',
    eyebrowSkills: 'Toolkit',
    eyebrowProcess: 'How I work',
    eyebrowContact: 'Get in touch',

    footerStatus: 'available',
    footerRegion: 'tnr · utc+3',
    footerPaired: 'paired with claude-code',
  },
}
