/**
 * Anti-FOUC theme bootstrap.
 *
 * `THEME_BOOTSTRAP` is the canonical inline-script source that must run in
 * `index.html` *before* the React bundle so the correct `data-theme` is applied
 * on first paint (no flash of the wrong palette on reload). It is pasted
 * verbatim into `index.html`; `themeBootstrap.test.ts` asserts the two stay in
 * sync and that the resolution precedence matches `ThemeProvider`:
 *
 *   stored theme  →  (system prefers dark ? 'default' : 'paper')
 *
 * The Ember `default` palette is the bare `:root`, so the attribute is only set
 * for the non-default themes. Wrapped in try/catch for privacy-mode / old
 * browsers where `localStorage` / `matchMedia` may throw.
 */
export const THEME_BOOTSTRAP = `(function(){try{var stored=localStorage.getItem('theme');var prefersDark=matchMedia('(prefers-color-scheme: dark)').matches;var t=stored||(prefersDark?'default':'paper');if(t!=='default')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`
