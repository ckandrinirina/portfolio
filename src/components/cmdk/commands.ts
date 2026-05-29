/**
 * commands.ts — Command dataset for the ⌘K palette.
 *
 * Each descriptor is an abstract, App-state-free data object.
 * The App layer maps these descriptors to real handlers at runtime (04-01).
 *
 * Three discriminated union variants:
 *   - NavCommand    { kind: 'nav',     route }
 *   - QuickCommand  { kind: 'quick',   actionId }
 *   - ProjectCommand{ kind: 'project', projectId }
 *
 * Design principles:
 *   - No React imports, no App state references (D — Dependency Inversion)
 *   - Adding new commands = new entries only, palette renders generically (O)
 *   - Every descriptor is dispatchable by the App action mapper (L)
 */

import type { RouteId } from '../../lib/constants'
import type { ProjectId } from '../../content/types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A navigation command that routes to one of the six views. */
export type NavCommand = {
  kind: 'nav'
  id: string
  /** The route id to navigate to. */
  route: RouteId
  /** Decorative glyph character (aria-hidden). */
  glyph: string
  /** i18n key for the item label (resolved via t() in the palette). */
  labelKey: string
  /** Flat string for filtering (lowercase, no diacritics). */
  searchText: string
}

/** A quick-action command (theme, language, CV download, etc.). */
export type QuickCommand = {
  kind: 'quick'
  id: string
  /** Abstract action identifier; App maps this to the real handler. */
  actionId: 'cycleTheme' | 'toggleLanguage' | 'downloadCv'
  glyph: string
  labelKey: string
  searchText: string
}

/** A project command that opens a project modal or external link. */
export type ProjectCommand = {
  kind: 'project'
  id: string
  /** The project id from content/projects.ts. */
  projectId: ProjectId
  /** Display name used both in the item and as searchText fallback. */
  name: string
  glyph: string
  labelKey: string
  searchText: string
}

/** Discriminated union of all palette command types. */
export type CommandDescriptor = NavCommand | QuickCommand | ProjectCommand

// ---------------------------------------------------------------------------
// Navigation commands — one per route (6 total)
// ---------------------------------------------------------------------------

const NAV_COMMANDS: NavCommand[] = [
  {
    kind: 'nav',
    id: 'nav-home',
    route: 'home',
    glyph: '⌂',
    labelKey: 'navHome',
    searchText: 'home accueil',
  },
  {
    kind: 'nav',
    id: 'nav-work',
    route: 'work',
    glyph: '◫',
    labelKey: 'navWork',
    searchText: 'work projets selected work projets sélectionnés',
  },
  {
    kind: 'nav',
    id: 'nav-experience',
    route: 'experience',
    glyph: '◎',
    labelKey: 'navExperience',
    searchText: 'experience expérience parcours career',
  },
  {
    kind: 'nav',
    id: 'nav-skills',
    route: 'skills',
    glyph: '◈',
    labelKey: 'navSkills',
    searchText: 'skills compétences toolkit boîte à outils',
  },
  {
    kind: 'nav',
    id: 'nav-process',
    route: 'process',
    glyph: '◆',
    labelKey: 'navProcess',
    searchText: 'process méthode how i work ma méthode',
  },
  {
    kind: 'nav',
    id: 'nav-contact',
    route: 'contact',
    glyph: '◉',
    labelKey: 'navContact',
    searchText: 'contact prendre contact get in touch',
  },
]

// ---------------------------------------------------------------------------
// Quick-action commands
// ---------------------------------------------------------------------------

const QUICK_COMMANDS: QuickCommand[] = [
  {
    kind: 'quick',
    id: 'cycleTheme',
    actionId: 'cycleTheme',
    glyph: '◑',
    labelKey: 'cmdkQuick',
    searchText: 'theme thème cycle ember paper ocean forest couleur',
  },
  {
    kind: 'quick',
    id: 'toggleLanguage',
    actionId: 'toggleLanguage',
    glyph: '⌥',
    labelKey: 'cmdkQuick',
    searchText: 'language langue fr en english français switch toggle',
  },
  {
    kind: 'quick',
    id: 'downloadCv',
    actionId: 'downloadCv',
    glyph: '↓',
    labelKey: 'downloadCv',
    searchText: 'cv resume download télécharger curriculum vitae',
  },
]

// ---------------------------------------------------------------------------
// Project commands — one per project (8 total)
// ---------------------------------------------------------------------------

const PROJECT_COMMANDS: ProjectCommand[] = [
  {
    kind: 'project',
    id: 'project-soka',
    projectId: 'soka',
    name: 'SOKA Club',
    glyph: '◫',
    labelKey: 'cmdkProjects',
    searchText: 'soka club platform web3 ticketing',
  },
  {
    kind: 'project',
    id: 'project-soka-live',
    projectId: 'soka-live',
    name: 'SOKA Live',
    glyph: '◫',
    labelKey: 'cmdkProjects',
    searchText: 'soka live realtime gaming football prediction',
  },
  {
    kind: 'project',
    id: 'project-ludoka',
    projectId: 'ludoka',
    name: 'LUDOKA',
    glyph: '◫',
    labelKey: 'cmdkProjects',
    searchText: 'ludoka ludo gaming realtime',
  },
  {
    kind: 'project',
    id: 'project-eer',
    projectId: 'eer',
    name: 'EER Full Digital',
    glyph: '◫',
    labelKey: 'cmdkProjects',
    searchText: 'eer full digital fintech kyc bank bmoi',
  },
  {
    kind: 'project',
    id: 'project-shoyo',
    projectId: 'shoyo',
    name: 'SHOYO',
    glyph: '◫',
    labelKey: 'cmdkProjects',
    searchText: 'shoyo platform fintech dossier migration',
  },
  {
    kind: 'project',
    id: 'project-ocr',
    projectId: 'ocr',
    name: 'OCR / GPT-4 Extraction',
    glyph: '◫',
    labelKey: 'cmdkProjects',
    searchText: 'ocr gpt4 extraction ai automation document pdf',
  },
  {
    kind: 'project',
    id: 'project-happy',
    projectId: 'happy',
    name: 'Happy Capital',
    glyph: '◫',
    labelKey: 'cmdkProjects',
    searchText: 'happy capital fintech realtime crowdfunding investment',
  },
  {
    kind: 'project',
    id: 'project-theseis',
    projectId: 'theseis',
    name: 'THESEIS',
    glyph: '◫',
    labelKey: 'cmdkProjects',
    searchText: 'theseis document management enterprise angular',
  },
]

// ---------------------------------------------------------------------------
// Exported dataset
// ---------------------------------------------------------------------------

/** All palette commands in display order: Navigation → Quick → Projects. */
export const COMMANDS: CommandDescriptor[] = [
  ...NAV_COMMANDS,
  ...QUICK_COMMANDS,
  ...PROJECT_COMMANDS,
]
