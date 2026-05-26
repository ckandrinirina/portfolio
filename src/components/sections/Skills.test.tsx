/**
 * Skills section tests — covers all acceptance criteria for story 06-03.
 *
 * Wraps under LanguageProvider (provides useLanguage — content + t()).
 * matchMedia and IntersectionObserver are mocked in src/test/setup.ts.
 *
 * NOTE: This machine's navigator.language resolves to 'en', so tests that
 * require French (the portfolio default) explicitly set localStorage['locale']
 * to 'fr'. This mirrors real usage where the user's stored preference wins.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '../../i18n/LanguageProvider'
import frContent from '../../content/fr'
import enContent from '../../content/en'
import Skills from './Skills'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Render Skills with French locale (portfolio default). */
function renderSkillsFr() {
  localStorage.setItem('locale', 'fr')
  return render(
    <LanguageProvider>
      <Skills />
    </LanguageProvider>,
  )
}

/** Render Skills with English locale. */
function renderSkillsEn() {
  localStorage.setItem('locale', 'en')
  return render(
    <LanguageProvider>
      <Skills />
    </LanguageProvider>,
  )
}

// Reset locale state before every test so no previous test pollutes localStorage
beforeEach(() => {
  localStorage.clear()
})

// ---------------------------------------------------------------------------
// AC: renders inside a <section id="skills"> (provided by Section wrapper)
// ---------------------------------------------------------------------------

describe('Skills — section wrapper', () => {
  it('renders a <section> element with id="skills"', () => {
    const { container } = renderSkillsFr()
    const section = container.querySelector('section#skills')
    expect(section).not.toBeNull()
  })

  // AC: <h2> heading rendered by Section wrapper with locale-appropriate label
  it('renders an <h2> heading in French: "Compétences"', () => {
    renderSkillsFr()
    const heading = screen.getByRole('heading', { level: 2 })
    // In French, t('navSkills') = 'Compétences'
    expect(heading).toHaveTextContent('Compétences')
  })

  it('renders an <h2> heading in English: "Skills"', () => {
    renderSkillsEn()
    const heading = screen.getByRole('heading', { level: 2 })
    // In English, t('navSkills') = 'Skills'
    expect(heading).toHaveTextContent('Skills')
  })
})

// ---------------------------------------------------------------------------
// AC: exactly eight skill groups rendered
// ---------------------------------------------------------------------------

describe('Skills — eight groups', () => {
  it('renders exactly eight skill group headings matching content.skills', () => {
    renderSkillsFr()
    // Each group has an <h3> heading with the group label
    const groupHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(groupHeadings).toHaveLength(frContent.skills.length)
    expect(groupHeadings).toHaveLength(8)
  })

  it('each group heading matches the French content label', () => {
    renderSkillsFr()
    const groupHeadings = screen.getAllByRole('heading', { level: 3 })
    const headingTexts = groupHeadings.map((h) => h.textContent)
    frContent.skills.forEach((group) => {
      expect(headingTexts).toContain(group.label)
    })
  })

  it('each group heading matches the English content label', () => {
    renderSkillsEn()
    const groupHeadings = screen.getAllByRole('heading', { level: 3 })
    const headingTexts = groupHeadings.map((h) => h.textContent)
    enContent.skills.forEach((group) => {
      expect(headingTexts).toContain(group.label)
    })
  })
})

// ---------------------------------------------------------------------------
// AC: every skill rendered as a Badge chip
// ---------------------------------------------------------------------------

describe('Skills — Badge chips', () => {
  it('renders every skill item inside the section', () => {
    renderSkillsFr()
    // Pick a sample skill from each group to verify presence
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
    expect(screen.getByText('Docker')).toBeInTheDocument()
    expect(screen.getByText('Jest')).toBeInTheDocument()
    expect(screen.getByText('OpenAI')).toBeInTheDocument()
    expect(screen.getByText('Figma / Adobe XD')).toBeInTheDocument()
  })

  it('renders the total number of skill items as Badge chips', () => {
    const { container } = renderSkillsFr()
    // Count all skill items across all groups
    const totalItems = frContent.skills.reduce(
      (sum, g) => sum + g.items.length,
      0,
    )
    const section = container.querySelector('section#skills')
    // Each badge is a <span> inside a flex-wrap container
    const badgeSpans = section?.querySelectorAll(
      'div.flex.flex-wrap.gap-2 > span',
    )
    expect(badgeSpans?.length).toBe(totalItems)
  })
})

// ---------------------------------------------------------------------------
// AC: wrap layout — skills don't overflow on narrow viewports
// ---------------------------------------------------------------------------

describe('Skills — layout', () => {
  it('each group uses a flex-wrap container for its Badge chips', () => {
    const { container } = renderSkillsFr()
    const section = container.querySelector('section#skills')
    const wrapContainers = section?.querySelectorAll('div.flex.flex-wrap')
    // Expect one wrap container per group (8 groups)
    expect(wrapContainers?.length).toBe(8)
  })
})

// ---------------------------------------------------------------------------
// AC: locale switch updates group labels, skill names unchanged
// ---------------------------------------------------------------------------

describe('Skills — locale switch', () => {
  it('French and English have different group labels (locale-aware)', () => {
    // Verifies the data layer supports locale-aware labels
    expect(frContent.skills[0].label).toBe('Langages')
    expect(enContent.skills[0].label).toBe('Languages')
    expect(frContent.skills[0].label).not.toBe(enContent.skills[0].label)
  })

  it('skill items are the same set across locales (language-neutral tech terms)', () => {
    // Technical skill names are locale-invariant — use arrayContaining since order may differ
    frContent.skills.forEach((frGroup, i) => {
      const enGroup = enContent.skills[i]
      expect(frGroup.items).toEqual(expect.arrayContaining(enGroup.items))
      expect(enGroup.items).toEqual(expect.arrayContaining(frGroup.items))
    })
  })

  it('renders English group labels when locale is English', () => {
    renderSkillsEn()
    const groupHeadings = screen.getAllByRole('heading', { level: 3 })
    const headingTexts = groupHeadings.map((h) => h.textContent)
    enContent.skills.forEach((group) => {
      expect(headingTexts).toContain(group.label)
    })
  })

  it('renders French group labels when locale is French', () => {
    renderSkillsFr()
    const groupHeadings = screen.getAllByRole('heading', { level: 3 })
    const headingTexts = groupHeadings.map((h) => h.textContent)
    frContent.skills.forEach((group) => {
      expect(headingTexts).toContain(group.label)
    })
  })
})

// ---------------------------------------------------------------------------
// AC: renders without throwing (TypeScript / runtime proxy)
// ---------------------------------------------------------------------------

describe('Skills — render stability', () => {
  it('renders without throwing', () => {
    expect(() => renderSkillsFr()).not.toThrow()
  })

  it('renders all eight groups (smoke test)', () => {
    const { container } = renderSkillsFr()
    const section = container.querySelector('section#skills')
    expect(section).not.toBeNull()
    const groupHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(groupHeadings.length).toBe(8)
  })
})
