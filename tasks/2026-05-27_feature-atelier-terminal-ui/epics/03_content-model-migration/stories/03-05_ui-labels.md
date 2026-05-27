# 03-05 · `ui.ts` — micro-labels extension

**Status:** TODO · **Size:** M · **Blocked by:** —

## Description

Extend `src/i18n/ui.ts` with all UI micro-labels the new shell needs: route
names (sidebar + breadcrumb + scroll-hint), eyebrows, "copy" / "copied",
cmd-k group labels, theme switcher labels, project actions ("Read case",
"Visit live", "Close"), modal column headers ("My role", "Impact", "Stack").

## Files affected

- `src/i18n/ui.ts`

## Implementation notes

Append to the existing `UI_LABELS` map. Keep two-level keys
(`'route.home'`, `'cmdk.group.quick'`, etc.) so the `t(key)` helper can
resolve them.

Concretely:

```ts
const FR = {
  // route labels
  'route.home':       'Accueil',
  'route.work':       'Projets',
  'route.experience': 'Parcours',
  'route.skills':     'Outils',
  'route.process':    'Façon de bosser',
  'route.contact':    'Contact',

  // eyebrows
  'eyebrow.work':       '01 · Projets',
  'eyebrow.experience': '02 · Parcours',
  'eyebrow.skills':     '03 · Boîte à outils',
  'eyebrow.process':    '04 · Façon de bosser',
  'eyebrow.contact':    "05 · Parlons-en",

  // section titles (with HTML markers for inline accent span)
  'title.work':       'Des choses livrées — <mark>pas des pixels</mark> sur un moodboard.',
  'title.experience': 'Sept ans, <mark>sept entreprises</mark>, un seul métier.',
  'title.skills':     'Une stack choisie pour <mark>la durée</mark>, pas pour la hype.',
  'title.process':    "Cinq règles gagnées, <mark>un projet à la fois.</mark>",
  'title.contact':    'Un truc à construire ? <mark>J\'écoute.</mark>',

  // copy / clipboard
  'copy':           'copier',
  'copy.copied':    '✓ copié',

  // scroll hint
  'scroll.for':     'Faites défiler pour {next}',

  // cmd-k
  'cmdk.placeholder': 'Cherchez un projet, une section, une action…',
  'cmdk.group.nav':       'Navigation',
  'cmdk.group.quick':     'Actions rapides',
  'cmdk.group.projects':  'Projets',
  'cmdk.no.results':      'Aucun résultat pour « {q} ».',
  'cmdk.hint.navigate':   'naviguer',
  'cmdk.hint.select':     'sélectionner',
  'cmdk.hint.close':      'fermer',

  // theme switcher
  'theme.cycle':    'Changer de palette',
  'theme.ember':    'Ember',
  'theme.ocean':    'Ocean',
  'theme.forest':   'Forest',
  'theme.paper':    'Paper',

  // project actions
  'project.readCase':    'Lire le cas',
  'project.visitLive':   'Voir en ligne',
  'project.close':       'Fermer',
  'project.myRole':      'Mon rôle',
  'project.impact':      'Impact',
  'project.stack':       'Stack',

  // sidebar status
  'sidebar.status':       'statut',
  'sidebar.region':       'région',
  'sidebar.region.value': 'tnr · utc+3',
  'sidebar.pairedWith':   'binôme avec',
  'sidebar.available':    'disponible',

  // home rotor + avatar tag
  'home.avatar.online':   'en ligne · tnr',
} as const
```

(Same keys for EN, with English values: `'Home'`, `'Selected work'`,
`'Experience'`, etc. and verbatim eyebrow strings from the mockup.)

## Acceptance criteria

- [ ] Every key listed above exists in both FR and EN maps with appropriate values.
- [ ] `t('route.work')` returns "Projets" in FR and "Selected work" in EN.
- [ ] `t('scroll.for', { next: 'Projets' })` correctly interpolates (or the
      view does the interpolation — pick a convention and document it).
- [ ] `npm run test -- --run src/i18n/` passes.

## Test notes

Existing `ui.test.ts` from old plan 04-04 needs to be updated. Add cases for
each new key in at least one locale, and a parity test asserting both maps
have the same keys.

## Edge cases

- The `'title.*'` strings include `<mark>` HTML markers. Views render these
  with `dangerouslySetInnerHTML` or split-and-map. Decide and document in the
  story for the first consuming view (07-01 HomeView won't need title.*,
  but 08-05 WorkView, 09-01 Experience, etc. will).
