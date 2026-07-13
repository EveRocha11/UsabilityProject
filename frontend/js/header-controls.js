(() => {
  const DARK_KEY  = 'nivela_dark_mode';
  const FONT_KEY  = 'nivela_font_size';
  const A11Y_KEY  = 'nivela_a11y';
  const FONT_STEPS = ['normal', 'large', 'xl'];

  /* ── Apply persisted prefs before first paint to avoid flash ── */
  if (localStorage.getItem(DARK_KEY) === 'true') {
    document.documentElement.classList.add('dark-mode');
  }
  const savedFont = localStorage.getItem(FONT_KEY) || 'normal';
  applyFontStep(savedFont);

  document.addEventListener('DOMContentLoaded', () => {

    /* ── Dark mode button (◐) ──────────────────────────────────── */
    const darkBtn = document.querySelector('.header-btn-icon');
    if (darkBtn) {
      syncDarkBtn(darkBtn);
      darkBtn.addEventListener('click', () => {
        const on = document.documentElement.classList.toggle('dark-mode');
        localStorage.setItem(DARK_KEY, String(on));
        syncDarkBtn(darkBtn);
      });
    }

    /* ── Font size button (Aa) ─────────────────────────────────── */
    const aaBtn = document.querySelector('.header-btn:not(.header-btn-icon)');
    if (aaBtn) {
      syncAaBtn(aaBtn, localStorage.getItem(FONT_KEY) || 'normal');
      aaBtn.addEventListener('click', () => {
        const current = localStorage.getItem(FONT_KEY) || 'normal';
        const next    = FONT_STEPS[(FONT_STEPS.indexOf(current) + 1) % FONT_STEPS.length];
        applyFontStep(next);
        localStorage.setItem(FONT_KEY, next);
        syncAaBtn(aaBtn, next);
      });
    }

    /* ── Avatar/profile link accessible name (WCAG 3.1.2) ─────── */
    const avatarLink = document.querySelector('.avatar-link');
    if (avatarLink) {
      avatarLink.setAttribute('aria-label', 'View profile');
      avatarLink.title = 'View profile';
    }

    /* ── Dynamic avatar initial ────────────────────────────────── */
    const currentEmail = localStorage.getItem('nivela_current_email');
    if (currentEmail) {
      const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
      const user = accounts.find(a => a.email === currentEmail);
      if (user && user.name) {
        const initial = user.name[0].toUpperCase();
        document.querySelectorAll('.avatar').forEach(el => { el.textContent = initial; });
      }
    }

    /* ── Inject accessibility modal ────────────────────────────── */
    injectA11yModal();

    /* ── Help link → open modal ────────────────────────────────── */
  

    /* ── Accessibility sidebar link → open modal ───────────────── */
    document.querySelectorAll('a[href="modal-accessibility.html"]').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); openA11yModal(); });
    });

    /* ── Logout button (injected into sidebar) ─────────────────── */
    const sidebar = document.querySelector('.sidebar');
    const helpLink = document.querySelector('.nav-footer-item');
    if (sidebar && helpLink) {
      const logoutBtn = document.createElement('button');
      logoutBtn.type = 'button';
      logoutBtn.className = 'nav-logout-btn';
      logoutBtn.setAttribute('aria-label', 'Sign out');
      logoutBtn.innerHTML =
        '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>' +
          '<polyline points="16 17 21 12 16 7"/>' +
          '<line x1="21" y1="12" x2="9" y2="12"/>' +
        '</svg>' +
        '<span>Sign out</span>';
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('nivela_current_email');
        location.href = 'login.html';
      });
      sidebar.appendChild(logoutBtn);
    }
  });

  /* ── Helpers ──────────────────────────────────────────────────── */

  function applyFontStep(step) {
    document.documentElement.classList.remove('text-lg', 'text-xl');
    if (step === 'large') document.documentElement.classList.add('text-lg');
    else if (step === 'xl') document.documentElement.classList.add('text-xl');
  }

  function syncDarkBtn(btn) {
    const on = document.documentElement.classList.contains('dark-mode');
    btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', on ? 'Switch to light mode' : 'Switch to dark mode');
    btn.title = on ? 'Light mode' : 'Dark mode';
  }

  function syncAaBtn(btn, step) {
    const labels = {
      normal: 'Text size: Normal — click to enlarge',
      large:  'Text size: Large — click to enlarge',
      xl:     'Text size: Extra large — click to reset',
    };
    btn.setAttribute('aria-label', labels[step] || labels.normal);
    btn.title = labels[step] || labels.normal;
  }

  /* ── Accessibility modal overlay ──────────────────────────────── */

  function injectA11yModal() {
    const saved = JSON.parse(localStorage.getItem(A11Y_KEY) || '{}');
    const prefs = {
      keyboardMode: saved.keyboardMode ?? false,
      screenReader: saved.screenReader ?? false,
    };

    const overlay = document.createElement('div');
    overlay.id = 'a11y-overlay';
    overlay.innerHTML = `
      <div class="a11y-backdrop" id="a11y-backdrop"></div>
      <div class="a11y-modal">
        <button class="a11y-modal-x" type="button" id="a11y-x-btn" aria-label="Close accessibility settings">×</button>
        <h2 class="a11y-modal-title">Accessibility</h2>
        <div class="a11y-modal-grid">

          <div class="a11y-col">
            <h3>Options</h3>
            <div class="a11y-option-card">
              <div class="a11y-option-info">
                <img class="a11y-option-icon" src="../assets/img/icon-keyboard.svg" alt="" aria-hidden="true" />
                <div>
                  <p id="a11y-kb-name" class="a11y-option-name">Keyboard mode</p>
                  <p id="a11y-kb-desc" class="a11y-option-desc">Browse using only the keyboard</p>
                </div>
              </div>
              <button id="a11y-toggle-kb" type="button" class="a11y-toggle is-off"
                role="switch" aria-checked="false"
                aria-labelledby="a11y-kb-name" aria-describedby="a11y-kb-desc">
                <span class="a11y-knob" aria-hidden="true"></span>
                <span class="a11y-toggle-label">OFF</span>
              </button>
            </div>
            <div class="a11y-option-card">
              <div class="a11y-option-info">
                <img class="a11y-option-icon" src="../assets/img/icon-screen.svg" alt="" aria-hidden="true" />
                <div>
                  <p id="a11y-sr-name" class="a11y-option-name">Screen reader</p>
                  <p id="a11y-sr-desc" class="a11y-option-desc">Optimized for screen readers</p>
                </div>
              </div>
              <button id="a11y-toggle-sr" type="button" class="a11y-toggle is-off"
                role="switch" aria-checked="false"
                aria-labelledby="a11y-sr-name" aria-describedby="a11y-sr-desc">
                <span class="a11y-knob" aria-hidden="true"></span>
                <span class="a11y-toggle-label">OFF</span>
              </button>
            </div>
          </div>

          <div class="a11y-col">
            <h3>Keyboard shortcuts</h3>
            <table class="a11y-shortcuts" role="table" aria-label="Keyboard shortcuts">
              <thead>
                <tr class="a11y-row a11y-row-header">
                  <th scope="col">KEY</th><th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr class="a11y-row"><td><kbd>TAB</kbd></td><td>Next item</td></tr>
                <tr class="a11y-row"><td><kbd>SHIFT + TAB</kbd></td><td>Previous item</td></tr>
                <tr class="a11y-row"><td><kbd>ENTER</kbd></td><td>Activate item</td></tr>
                <tr class="a11y-row"><td><kbd>ESCAPE</kbd></td><td>Close panel</td></tr>
                <tr class="a11y-row"><td><kbd>↑ ↓ ARROWS</kbd></td><td>Browse list</td></tr>
                <tr class="a11y-row"><td><kbd>CTRL + .</kbd></td><td>Toggle reader</td></tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="a11y-modal-footer">
          <button class="a11y-close-btn" type="button" id="a11y-close-btn" aria-label="Close accessibility settings">
            CLOSE
          </button>
        </div>
      </div>`;

    document.body.appendChild(overlay);

    /* Close actions */
    overlay.querySelector('#a11y-x-btn').addEventListener('click', closeA11yModal);
    overlay.querySelector('#a11y-close-btn').addEventListener('click', closeA11yModal);
    overlay.querySelector('#a11y-backdrop').addEventListener('click', closeA11yModal);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeA11yModal();
    });

    /* Toggle logic */
    const kbToggle = overlay.querySelector('#a11y-toggle-kb');
    const srToggle = overlay.querySelector('#a11y-toggle-sr');

    function syncToggle(btn, active) {
      btn.classList.toggle('is-on',  active);
      btn.classList.toggle('is-off', !active);
      btn.setAttribute('aria-checked', String(active));
      btn.querySelector('.a11y-toggle-label').textContent = active ? 'ON' : 'OFF';
    }

    function applyA11yPrefs() {
      document.documentElement.classList.toggle('keyboard-mode', prefs.keyboardMode);
      document.documentElement.classList.toggle('screen-reader', prefs.screenReader);
    }

    syncToggle(kbToggle, prefs.keyboardMode);
    syncToggle(srToggle, prefs.screenReader);
    applyA11yPrefs();

    kbToggle.addEventListener('click', () => {
      prefs.keyboardMode = !prefs.keyboardMode;
      syncToggle(kbToggle, prefs.keyboardMode);
      applyA11yPrefs();
      localStorage.setItem(A11Y_KEY, JSON.stringify(prefs));
    });
    srToggle.addEventListener('click', () => {
      prefs.screenReader = !prefs.screenReader;
      syncToggle(srToggle, prefs.screenReader);
      applyA11yPrefs();
      localStorage.setItem(A11Y_KEY, JSON.stringify(prefs));
    });
  }

  function openA11yModal() {
    const overlay = document.getElementById('a11y-overlay');
    if (!overlay) return;
    overlay.classList.add('is-open');
    overlay.querySelector('#a11y-x-btn').focus();
  }

  function closeA11yModal() {
    const overlay = document.getElementById('a11y-overlay');
    if (overlay) overlay.classList.remove('is-open');
  }
})();
