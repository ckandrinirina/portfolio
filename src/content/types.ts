// Single TypeScript source of truth for the shape of all bilingual portfolio
// content. Both `src/content/fr.ts` and `src/content/en.ts` must satisfy
// `PortfolioContent` via the `satisfies` operator so a field missing in one
// locale is a compile-time error rather than a silent runtime gap.
//
// No JSX, no Tailwind classes, no presentation logic — declarations only.

/** Hero section copy: the above-the-fold introduction. */
export interface HeroContent {
  name: string
  title: string
  positioning: string
  /** City + country only. The full home address is intentionally never shown. */
  location: string
  ctaViewProjects: string
  ctaDownloadCv: string
  ctaContact: string
}

/** About section copy: a single narrative paragraph. */
export interface AboutContent {
  narrative: string
}

/**
 * One labelled bucket of skills (e.g. "Front-end", "Databases"). `items` holds
 * display strings that vary by locale, so it is a plain `string[]` rather than
 * a union of known skill names.
 */
export interface SkillGroup {
  label: string
  items: string[]
}

/** A single project bullet rendered inside an `ExperienceEntry`. */
export interface ExperienceProject {
  name: string
  description: string
}

/**
 * One professional role. `techHighlights` is a flat array because the role
 * level does not need labelled groups — `SkillGroup` is only used by the
 * top-level skills section.
 */
export interface ExperienceEntry {
  company: string
  role: string
  period: string
  techHighlights: string[]
  projects: ExperienceProject[]
}

/** A curated project card rendered in the dedicated Projects section. */
export interface ProjectEntry {
  name: string
  company: string
  description: string
  techTags: string[]
}

/**
 * One education row. `institution` accepts an empty string so the Baccalaureate
 * row (where the institution is unknown) can be expressed without making the
 * field nullable — keeping a single shape across every row simplifies the
 * table renderer.
 */
export interface EducationEntry {
  qualification: string
  institution: string
  year: string
}

/** One spoken language with its proficiency label. */
export interface SpokenLanguage {
  language: string
  proficiency: string
}

/** Contact section copy. Social links live in `lib/constants.ts`, not here. */
export interface ContactContent {
  location: string
  intro: string
}

/**
 * Root content shape. The locale modules (`fr.ts`, `en.ts`) implement this
 * interface via `satisfies PortfolioContent` so any field missing in one
 * locale is caught at compile time.
 */
export interface PortfolioContent {
  hero: HeroContent
  about: AboutContent
  skills: SkillGroup[]
  experience: ExperienceEntry[]
  projects: ProjectEntry[]
  education: EducationEntry[]
  spokenLanguages: SpokenLanguage[]
  contact: ContactContent
}
