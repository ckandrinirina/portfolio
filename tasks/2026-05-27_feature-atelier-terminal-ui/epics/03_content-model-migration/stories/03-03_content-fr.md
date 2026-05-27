# 03-03 · `fr.ts` — translate new copy + drop removed slices

**Status:** TODO · **Size:** L · **Blocked by:** 03-01

## Description

Update `src/content/fr.ts` to match the new `PortfolioContent` shape. Drop
`education` and `spokenLanguages`. Translate all new copy into natural French
(role rotor, process principles, hero tagline, contact pitch, marquee labels
where the term has a French equivalent — tech words stay).

## Files affected

- `src/content/fr.ts` — rewritten / extended.

## Implementation notes

For copy that comes from the mockup, keep the technical / proper noun
references in their original form. Translate only the natural-language
sentences. Some examples:

- `hero.greet`: "Bonjour — actuellement disponible pour de nouvelles missions · T3 2026"
- `hero.rolesLabel`: "et aussi —"
- `hero.roles`: ["designer d'interfaces", "penseur systèmes", "bricoleur OCR & IA", "ingénieur temps réel", "champion de ludo"]
- `hero.tagline`: "Ingénieur fullstack basé à **Antananarivo, Madagascar**. Sept ans à écrire du logiciel qui doit se sentir aussi bien qu'il fonctionne — de l'onboarding en ligne d'une banque malgache à une *économie de points propulsée par l'USDC* chez YAS. J'écris le back, je dessine le front, et je tiens au centimètre qui les sépare."
- `hero.ctaPrimary`: "Voir les projets"
- `hero.ctaSecondary`: "Me contacter"
- `hero.ctaCv`: "Télécharger le CV"

- `now.label`: "En cours de construction"
- `now.body`: "**SOKA · Ludoka** — une économie de points où l'on peut *acheter, jouer, gagner, dépenser* dans un seul portefeuille. USDC + système de points interne, temps réel partout."
- `now.meta2`: "2025 — aujourd'hui"

- `stats[]`:
  - `{ n: 7, label: "années à livrer" }`
  - `{ n: 8, suffix: "+", label: "projets phares" }`
  - `{ n: 12, label: "frameworks livrés" }`
  - `{ n: 3, label: "langues parlées" }`

- `marquee[]`: same tech tokens as English (React, Next.js, NestJS, …, Claude Code) — tech vocabulary, no translation.

- `experience[]`: Keep company names, role titles can be in French
  ("Développeur Fullstack", "Développeur Lead"). Translate `desc` to natural French.
  Stack arrays stay in tech-original form.

- `skills[]`: same structure as English (categories: "Frontend", "Backend",
  "Data & Cloud", "AI & Craft" — tech category names, no translation).
  `cat` labels can be translated if natural ("Front", "Back", "Données & Cloud", "IA & Artisanat").

- `process[]`: translate the 5 principles (title + body) into French. Keep
  the spirit of each — they're idiomatic English; aim for equivalent
  punch in French.
  - `n: "01"`, `title: "Le design et le code ne sont pas deux disciplines séparées."`,
    `body: "C'est le même geste, à un centimètre près. Le bouton que je dessine dans Figma est le bouton que je rends en React. Je passe librement de l'un à l'autre — et le travail s'en porte mieux."`
  - … (4 more)

- `contact`:
  - `emailLabel: "Email"`, `whatsappLabel: "WhatsApp"`, `basedInLabel: "Basé à"`,
    `basedIn: "Antananarivo, Madagascar · UTC+3"`
  - `languagesLabel: "Langues"`, `languages: ["Malgache", "Français", "Anglais"]`
  - `availableLabel: "Disponibilité"`, `availability: "ouvert · à distance, en contrat ou en plein temps"`
  - `pitchTitle: "Ce que je cherche ensuite."`, `pitchBody1: …`, `pitchBody2: …`, `pitchSignoff: "— Erick"`

## Acceptance criteria

- [ ] `fr.ts` exports `frContent: PortfolioContent`.
- [ ] No `education` / `spokenLanguages` fields remain.
- [ ] All `process[]` entries are translated (not English).
- [ ] All `hero.roles`, `hero.tagline`, `now.body`, `contact.pitch*` are
      in French.
- [ ] Tech tokens (frameworks, project names, stack items) remain in original form.
- [ ] `npm run build` passes (TS shape match).
- [ ] Parity test (story 03-06) passes — same key set as `en.ts`.

## Test notes

Covered by 03-06.

## Edge cases

- French punctuation: prefer typographic em-dash `—`, non-breaking space
  before `:` (or skip — modern web doesn't enforce it; mockup uses bare).
- Don't translate "SOKA", "USDC", "Tesseract", etc.
