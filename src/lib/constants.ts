/**
 * Site metadata — name, title, location, and contact information.
 * Typed with SiteMeta interface and validated at compile time.
 * Location is limited to city/country for privacy (no street address).
 */

interface SiteMeta {
  name: string
  title: string
  locationLabel: string
  email: string
  whatsapp: string
}

export const SITE_META = {
  name: 'Erick Andrinirina',
  title: 'Full-stack Developer',
  locationLabel: 'Antananarivo, Madagascar',
  email: 'ckandrinirina@gmail.com',
  whatsapp: 'https://wa.me/261385096664',
} as const satisfies SiteMeta

/**
 * Social media profile URLs.
 * GitHub and LinkedIn are marked as [TO BE DEFINED] placeholders.
 * TODO: replace with actual URLs when available.
 */

interface SocialLinks {
  github: string
  linkedin: string
}

export const SOCIAL_LINKS = {
  github: '', // TODO: replace with actual URL
  linkedin: '', // TODO: replace with actual URL
} as const satisfies SocialLinks

/**
 * Navigation section configuration.
 * Each entry maps a section id to an i18n label key.
 * Order determines nav link sequence and scroll-spy priority.
 */

interface NavSection {
  id: string
  labelKey: string
}

export const NAV_SECTIONS = [
  { id: 'hero', labelKey: 'nav.hero' },
  { id: 'about', labelKey: 'nav.about' },
  { id: 'skills', labelKey: 'nav.skills' },
  { id: 'experience', labelKey: 'nav.experience' },
  { id: 'projects', labelKey: 'nav.projects' },
  { id: 'education', labelKey: 'nav.education' },
  { id: 'languages', labelKey: 'nav.languages' },
  { id: 'contact', labelKey: 'nav.contact' },
] as const satisfies readonly NavSection[]
