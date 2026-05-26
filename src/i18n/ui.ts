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
  },
}
