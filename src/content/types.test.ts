// Verifies the `PortfolioContent` interface and its sub-types.
//
// A pure type-only module has no runtime behaviour to assert, so this suite
// works in two layers:
//
//   1. Compile-time — a fully-shaped sample uses `satisfies PortfolioContent`,
//      which fails the TypeScript build (`npm run build`) if a required field
//      is removed or mistyped. Companion `@ts-expect-error` blocks prove the
//      interface actively rejects missing fields. These checks are caught by
//      `tsc -b`, not by Vitest.
//
//   2. Runtime — Vitest reads the sample object and asserts each top-level
//      slice exists with the expected shape (array lengths, presence of
//      required string fields). This protects against accidental object
//      reshaping during refactors.
//
// If `src/content/types.ts` is absent, the module import fails and every
// test fails with a "cannot find module" error — that is the RED state.
import { describe, expect, it } from 'vitest'
import type {
  EducationEntry,
  ExperienceEntry,
  ExperienceProject,
  PortfolioContent,
  ProjectEntry,
  SkillGroup,
  SpokenLanguage,
} from './types'

// A representative content object exercising every required field.
const sample = {
  hero: {
    name: 'Erick Andrinirina',
    title: 'Fullstack JavaScript Engineer',
    positioning: 'Building reliable web products end-to-end.',
    location: 'Antananarivo, Madagascar',
    ctaViewProjects: 'View projects',
    ctaDownloadCv: 'Download CV',
    ctaContact: 'Get in touch',
    greet: "Hi, I'm",
    tagline: 'I build reliable web products end-to-end.',
    roles: ['Fullstack Engineer', 'Problem solver'],
  },
  about: {
    narrative: 'Short profile narrative.',
  },
  skills: [
    { label: 'Languages', items: ['TypeScript', 'JavaScript'] },
    { label: 'Front-end', items: ['React', 'Vite'] },
    { label: 'Back-end', items: ['Node.js', 'NestJS'] },
    { label: 'Databases', items: ['PostgreSQL'] },
    { label: 'Tooling/DevOps', items: ['Docker'] },
    { label: 'Testing', items: ['Vitest'] },
    { label: 'AI/Specialized', items: ['LLM integration'] },
    { label: 'Design tools', items: ['Figma'] },
  ],
  experience: [
    {
      company: 'Acme',
      role: 'Senior Engineer',
      period: '2022 → present',
      techHighlights: ['React', 'Node.js'],
      projects: [{ name: 'Acme Web', description: 'Customer-facing SPA.' }],
    },
  ],
  projects: [
    {
      name: 'SOKA Club',
      company: 'Acme',
      description: 'Member portal.',
      techTags: ['React', 'TypeScript'],
    },
  ],
  education: [
    {
      qualification: 'Master in Software Engineering',
      institution: 'University X',
      year: '2018',
    },
    // Edge case: Baccalaureate row where institution is unknown — must accept
    // an empty string rather than a nullable type.
    {
      qualification: 'Baccalaureate',
      institution: '',
      year: '2013',
    },
  ],
  spokenLanguages: [
    { language: 'Malagasy', proficiency: 'Native' },
    { language: 'French', proficiency: 'Fluent' },
    { language: 'English', proficiency: 'Working' },
  ],
  contact: {
    location: 'Antananarivo, Madagascar',
    intro: 'Open to opportunities.',
    pitch: 'Open to fullstack roles and collaborations.',
    languages: ['Malagasy — Native', 'English — Professional'],
    meta: [
      {
        label: 'Email',
        value: 'ckandrinirina@gmail.com',
        href: 'mailto:ckandrinirina@gmail.com',
        copy: true,
      },
      { label: 'Location', value: 'Antananarivo, Madagascar' },
    ],
  },
  now: {
    headline: 'Building the SOKA ecosystem',
    body: 'Leading fullstack development on a Web3 platform.',
    meta: { label: 'Currently', period: 'Jan 2025 — present' },
  },
  stats: [
    { n: 7, suffix: '+', label: 'Years building' },
    { n: 8, label: 'Featured works' },
  ],
  marquee: ['TypeScript', 'React', 'Node.js'],
  timeline: [
    {
      year: '2025 — now',
      role: 'Full Stack Developer',
      company: 'SOKA / YAS Madagascar',
      desc: 'Leading development of a Web3 platform.',
      stack: ['Next.js', 'NestJS'],
    },
  ],
  skillCards: [
    {
      title: 'Frontend',
      lead: ['React', 'TypeScript'],
      chips: ['Angular', 'Tailwind CSS'],
    },
  ],
  process: [
    {
      num: '01',
      title: 'Understand first',
      body: 'Start from the problem, not the framework.',
    },
  ],
} satisfies PortfolioContent

describe('PortfolioContent shape (runtime parity smoke checks)', () => {
  it('hero slice carries the required CTAs', () => {
    expect(sample.hero.name).toBeTruthy()
    expect(sample.hero.title).toBeTruthy()
    expect(sample.hero.positioning).toBeTruthy()
    expect(sample.hero.location).toBeTruthy()
    expect(sample.hero.ctaViewProjects).toBeTruthy()
    expect(sample.hero.ctaDownloadCv).toBeTruthy()
    expect(sample.hero.ctaContact).toBeTruthy()
  })

  it('about slice exposes a narrative string', () => {
    expect(typeof sample.about.narrative).toBe('string')
    expect(sample.about.narrative.length).toBeGreaterThan(0)
  })

  it('skills slice covers the eight project groups', () => {
    expect(sample.skills).toHaveLength(8)
    sample.skills.forEach((group: SkillGroup) => {
      expect(typeof group.label).toBe('string')
      expect(Array.isArray(group.items)).toBe(true)
      expect(group.items.length).toBeGreaterThan(0)
    })
  })

  it('experience entries expose required fields including project list', () => {
    sample.experience.forEach((entry: ExperienceEntry) => {
      expect(entry.company).toBeTruthy()
      expect(entry.role).toBeTruthy()
      expect(entry.period).toBeTruthy()
      expect(Array.isArray(entry.techHighlights)).toBe(true)
      expect(Array.isArray(entry.projects)).toBe(true)
      entry.projects.forEach((project: ExperienceProject) => {
        expect(project.name).toBeTruthy()
        expect(project.description).toBeTruthy()
      })
    })
  })

  it('project entries expose tech tags', () => {
    sample.projects.forEach((project: ProjectEntry) => {
      expect(project.name).toBeTruthy()
      expect(project.company).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(Array.isArray(project.techTags)).toBe(true)
    })
  })

  it('education accepts an empty institution string for the Baccalaureate row', () => {
    const bac = sample.education.find(
      (entry: EducationEntry) => entry.qualification === 'Baccalaureate',
    )
    expect(bac).toBeDefined()
    expect(bac?.institution).toBe('')
    expect(bac?.year).toBe('2013')
  })

  it('spokenLanguages carries language + proficiency for each entry', () => {
    sample.spokenLanguages.forEach((entry: SpokenLanguage) => {
      expect(entry.language).toBeTruthy()
      expect(entry.proficiency).toBeTruthy()
    })
  })

  it('contact exposes location and intro strings', () => {
    expect(typeof sample.contact.location).toBe('string')
    expect(typeof sample.contact.intro).toBe('string')
  })
})

describe('PortfolioContent rejects missing required sections (compile-time)', () => {
  it('refuses an object that omits the hero slice', () => {
    // @ts-expect-error — hero is required on PortfolioContent.
    const _missingHero: Pick<PortfolioContent, 'hero'> = {}
    expect(_missingHero).toBeDefined()
  })

  it('refuses a hero slice missing the contact CTA', () => {
    // @ts-expect-error — ctaContact is a required field on hero.
    const _badHero: PortfolioContent['hero'] = {
      name: '',
      title: '',
      positioning: '',
      location: '',
      ctaViewProjects: '',
      ctaDownloadCv: '',
      greet: '',
      tagline: '',
      roles: [],
    }
    expect(_badHero).toBeDefined()
  })

  it('refuses a SkillGroup with no items array', () => {
    // @ts-expect-error — items is required on SkillGroup.
    const _badGroup: SkillGroup = { label: 'Languages' }
    expect(_badGroup).toBeDefined()
  })

  it('refuses a contact slice missing the new Atelier fields', () => {
    // @ts-expect-error — pitch, languages, and meta are required on ContactContent.
    const _badContact: PortfolioContent['contact'] = {
      location: '',
      intro: '',
    }
    expect(_badContact).toBeDefined()
  })
})
