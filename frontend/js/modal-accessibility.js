(() => {
  const PREF_KEY = 'nivela_a11y';

  /* Load saved preferences */
  const saved = JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
  const prefs = {
    keyboardMode:  saved.keyboardMode  ?? false,
    screenReader:  saved.screenReader  ?? false,
  };

  /* Apply preferences to <html> root so CSS can react */
  function applyPrefs() {
    const root = document.documentElement;
    root.classList.toggle('keyboard-mode',  prefs.keyboardMode);
    root.classList.toggle('screen-reader',  prefs.screenReader);
  }

  applyPrefs();

  /* Update a toggle's visual and ARIA state */
  function syncToggle(btn, active) {
    btn.classList.toggle('is-on',  active);
    btn.classList.toggle('is-off', !active);
    btn.setAttribute('aria-checked', String(active));
    btn.querySelector('.toggle-label').textContent = active ? 'ON' : 'OFF';
  }

  /* ── Keyboard Mode toggle ─────────────────────────────────────── */
  const kbToggle = document.getElementById('toggle-keyboard');
  if (kbToggle) {
    syncToggle(kbToggle, prefs.keyboardMode);
    kbToggle.addEventListener('click', () => {
      prefs.keyboardMode = !prefs.keyboardMode;
      syncToggle(kbToggle, prefs.keyboardMode);
      applyPrefs();
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
    });
  }

  /* ── Screen Reader toggle ─────────────────────────────────────── */
  const srToggle = document.getElementById('toggle-screen-reader');
  if (srToggle) {
    syncToggle(srToggle, prefs.screenReader);
    srToggle.addEventListener('click', () => {
      prefs.screenReader = !prefs.screenReader;
      syncToggle(srToggle, prefs.screenReader);
      applyPrefs();
      localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
    });
  }

  /* ── CLOSE button ─────────────────────────────────────────────── */
  const closeBtn = document.getElementById('accessibility-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => history.back());
  }

  /* ── × button ────────────────────────────────────────────────── */
  const xBtn = document.getElementById('accessibility-x-btn');
  if (xBtn) {
    xBtn.addEventListener('click', () => history.back());
  }

  /* ── Keyboard: ESC closes ─────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') history.back();
  });

  /* ── Focus first interactive element on load ──────────────────── */
  if (xBtn) xBtn.focus();
})();
