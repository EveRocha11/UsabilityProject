(() => {
  const email = localStorage.getItem('nivela_current_email');
  if (!email) { location.href = 'login.html'; return; }

  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  const user     = accounts.find(a => a.email === email);
  if (!user) { location.href = 'login.html'; return; }

  const avatarEls = document.querySelectorAll('.avatar');
  avatarEls.forEach(el => { el.textContent = user.name[0].toUpperCase(); });

  const { key, p } = nivelGetProgress(email);

  /* ── Check for a completed lesson returning from challenges ── */
  const pendingUnit   = localStorage.getItem('nivela_pending_unit');
  const pendingLesson = localStorage.getItem('nivela_pending_lesson');
  // lesson-complete.js removes 'nivela_lesson_mode' on real completion.
  // If it's still set, the user exited early — do not mark complete.
  const lessonMode    = localStorage.getItem('nivela_lesson_mode');

  if (pendingUnit && pendingLesson) {
    const reallyFinished = !lessonMode;

    if (reallyFinished) {
      const uid = Number(pendingUnit);
      const lid = Number(pendingLesson) - 1; // 0-indexed

      p.units[uid].lessons[lid] = true;

      if (p.units[uid].lessons.every(Boolean)) {
        p.units[uid].complete = true;
        if (uid < 4) p.units[uid + 1] = p.units[uid + 1] || { complete: false, lessons: [false, false, false] };
      }

      p[`level${Number(pendingLesson)}Complete`] = true;
      const totalDone = Object.values(p.units).reduce((s, u) => s + u.lessons.filter(Boolean).length, 0);
      p.lessonsCompleted = Math.max(p.lessonsCompleted || 0, totalDone);

      const wrongs = parseInt(localStorage.getItem('nivela_lesson_wrongs') || '0', 10);
      p.totalWrongs = (p.totalWrongs || 0) + wrongs;
      p.accuracy = Math.max(0, Math.round((1 - p.totalWrongs / (Math.max(1, totalDone) * 5)) * 100));
      p.badges = Object.values(p.units).filter(u => u.complete).length;

      nivelSaveProgress(key, p);
    }

    localStorage.removeItem('nivela_pending_unit');
    localStorage.removeItem('nivela_pending_lesson');
    if (!reallyFinished) {
      localStorage.removeItem('nivela_lesson_mode');
      localStorage.removeItem('nivela_current_block');
      localStorage.removeItem('nivela_current_level');
    }
  }

  /* ── Render each unit card ─────────────────────────────────────── */
  UNITS_DATA.forEach(unit => {
    const uid      = unit.id;
    const unlocked = nivelUnitUnlocked(p, uid);
    const unitData = p.units[uid];
    const done     = unitData.lessons.filter(Boolean).length;
    const pct      = Math.round(done / 3 * 100);

    const card = document.getElementById(`unit-card-${uid}`);
    const dot  = document.getElementById(`unit-dot-${uid}`);

    if (!card) return;

    /* Dot: filled when unit complete, outlined otherwise */
    if (dot) {
      dot.classList.toggle('is-done',     !!unitData.complete);
      dot.classList.toggle('is-upcoming', !unitData.complete);
    }

    /* Card accessibility label */
    let ariaLabel = `${unit.title}: ${unit.subtitle}. `;
    if (!unlocked) {
      ariaLabel += `Locked — complete Unit ${uid - 1} first. You can preview the unit content.`;
    } else if (unitData.complete) {
      ariaLabel += 'Completed.';
    } else if (done > 0) {
      ariaLabel += `${done} of 3 lessons completed. In progress.`;
    } else {
      ariaLabel += 'Not started.';
    }
    card.setAttribute('aria-label', ariaLabel);

    const topRow = card.querySelector('.unit-card-top');

    if (!unlocked) {
      /* ── Locked unit: grey card, padlock, no status badge, no progress ── */
      card.classList.add('is-locked');

      /* Remove status badge if present */
      const statusEl = card.querySelector('.unit-status');
      if (statusEl) statusEl.remove();

      /* Ensure padlock icon exists */
      if (!card.querySelector('.unit-lock-icon')) {
        const img = document.createElement('img');
        img.className = 'unit-lock-icon';
        img.src       = '../assets/img/icon-padlock.svg';
        img.alt       = '';
        img.setAttribute('aria-hidden', 'true');
        topRow.appendChild(img);
      }

      /* Hide progress bar and label */
      const progTrack = card.querySelector('.unit-progress-track');
      const progLabel  = card.querySelector('.unit-progress-label');
      if (progTrack) progTrack.style.display = 'none';
      if (progLabel) progLabel.style.display  = 'none';

    } else {
      /* ── Unlocked unit: remove lock styling, show status + progress ── */
      card.classList.remove('is-locked');

      /* Remove padlock icon */
      const lockIcon = card.querySelector('.unit-lock-icon');
      if (lockIcon) lockIcon.remove();

      /* Status badge */
      let statusEl = card.querySelector('.unit-status');
      if (!statusEl) {
        statusEl = document.createElement('span');
        card.querySelector('.unit-card-top').appendChild(statusEl);
      }
      if (unitData.complete) {
        statusEl.className   = 'unit-status unit-status-done';
        statusEl.textContent = '✓ Completed';
      } else if (done > 0) {
        statusEl.className   = 'unit-status unit-status-progress';
        statusEl.textContent = 'In progress';
      } else {
        statusEl.className   = 'unit-status unit-status-available';
        statusEl.textContent = 'Start';
      }

      /* Progress bar */
      const progTrack = card.querySelector('.unit-progress-track');
      const fill       = card.querySelector('.progress-fill');
      const progLabel  = card.querySelector('.unit-progress-label');

      if (progTrack) {
        progTrack.style.display = '';
        progTrack.setAttribute('aria-valuenow', pct);
        progTrack.setAttribute('aria-label', `${unit.title} progress: ${pct}%`);
      }
      if (fill)      fill.style.width      = pct + '%';
      if (progLabel) {
        progLabel.style.display = '';
        progLabel.textContent   = pct + '%';
      }
    }
  });
})();
