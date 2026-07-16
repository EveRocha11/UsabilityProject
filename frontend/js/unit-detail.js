(() => {
  /* ── Auth guard ────────────────────────────────────────────────── */
  const email = localStorage.getItem('nivela_current_email');
  if (!email) { location.href = 'login.html'; return; }

  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  const user     = accounts.find(a => a.email === email);
  if (!user) { location.href = 'login.html'; return; }

  const avatarEls = document.querySelectorAll('.avatar');
  avatarEls.forEach(el => { el.textContent = user.name[0].toUpperCase(); });

  /* ── Detect which unit to show (URL param ?id=N, default 1) ────── */
  const params = new URLSearchParams(location.search);
  const unitId = Math.max(1, Math.min(4, Number(params.get('id')) || 1));
  const unit   = UNITS_DATA[unitId - 1];

  /* ── Load/init progress ────────────────────────────────────────── */
  const { key, p } = nivelGetProgress(email);

  /* ── Check if a lesson just completed (returning from lesson-complete) ── */
  const pendingUnit   = localStorage.getItem('nivela_pending_unit');
  const pendingLesson = localStorage.getItem('nivela_pending_lesson');
  // lesson-complete.js removes 'nivela_lesson_mode' on real completion.
  // If it's still set, the user exited early via the exit modal — do not mark complete.
  const lessonMode    = localStorage.getItem('nivela_lesson_mode');

  if (pendingUnit && pendingLesson && Number(pendingUnit) === unitId) {
    const reallyFinished = !lessonMode;

    if (reallyFinished) {
      const lid = Number(pendingLesson) - 1; // 0-indexed
      p.units[unitId].lessons[lid] = true;

      const unitNowComplete = p.units[unitId].lessons.every(Boolean);
      if (unitNowComplete) p.units[unitId].complete = true;

      p[`level${Number(pendingLesson)}Complete`] = true;
      const totalDone = Object.values(p.units).reduce((s, u) => s + u.lessons.filter(Boolean).length, 0);
      p.lessonsCompleted = Math.max(p.lessonsCompleted || 0, totalDone);

      // Accuracy: deduct for each wrong answer (max 5 per lesson)
      const wrongs = parseInt(localStorage.getItem('nivela_lesson_wrongs') || '0', 10);
      p.totalWrongs = (p.totalWrongs || 0) + wrongs;
      p.accuracy = Math.max(0, Math.round((1 - p.totalWrongs / (Math.max(1, totalDone) * 5)) * 100));

      // Badges = number of completed units
      p.badges = Object.values(p.units).filter(u => u.complete).length;

      nivelSaveProgress(key, p);
    }

    // Always clear stale pending keys regardless of outcome
    localStorage.removeItem('nivela_pending_unit');
    localStorage.removeItem('nivela_pending_lesson');
    if (!reallyFinished) {
      // Clean up abandoned lesson state so it doesn't affect the next attempt
      localStorage.removeItem('nivela_lesson_mode');
      localStorage.removeItem('nivela_current_block');
      localStorage.removeItem('nivela_current_level');
    }

    // All 3 lessons done → redirect to units overview
    if (reallyFinished && p.units[unitId].complete) {
      location.href = 'units.html';
      return;
    }
  }

  const unitData = p.units[unitId];
  const unlocked = nivelUnitUnlocked(p, unitId);

  /* ── Render banner ─────────────────────────────────────────────── */
  const bannerH1 = document.getElementById('unit-banner-title');
  if (bannerH1) bannerH1.textContent = `${unit.title} (${unit.badge})`;

  const bannerLock = document.getElementById('unit-banner-lock');
  if (bannerLock) bannerLock.style.display = unlocked ? 'none' : '';

  /* Update page <title> */
  document.title = `Nivela - ${unit.title}`;

  /* ── Render grammar bullets ─────────────────────────────────────── */
  const grammarList = document.getElementById('grammar-list');
  if (grammarList) {
    grammarList.innerHTML = unit.grammar.map(g =>
      `<li>
        <strong>${g.title}</strong>
        <span>${g.desc}</span>
      </li>`
    ).join('');
  }

  /* ── Render lesson cards ────────────────────────────────────────── */
  const lessonsRow = document.getElementById('lessons-row');
  if (!lessonsRow) return;

  lessonsRow.innerHTML = '';

  unit.lessons.forEach((lesson, idx) => {
    const lessonNum   = idx + 1; // 1-indexed
    const isUnlocked  = nivelLessonUnlocked(p, unitId, idx);
    const isComplete  = unitData.lessons[idx];

    const card = document.createElement('div');
    card.className = `lesson-card${isUnlocked ? '' : ' is-locked'}`;

    /* Icon */
    const iconBox = document.createElement('div');
    iconBox.className = 'lesson-card-top';
    iconBox.innerHTML = `
      <div class="lesson-icon-box" aria-hidden="true">
        <img src="../assets/img/${lesson.icon}" alt="" />
      </div>
      <p class="lesson-card-title">${lesson.title}</p>`;
    card.appendChild(iconBox);

    /* Bottom action area */
    const bottom = document.createElement('div');
    bottom.className = 'lesson-card-bottom';

    if (isComplete) {
      /* Already completed */
      const doneTag = document.createElement('span');
      doneTag.className = 'lesson-done-tag';
      doneTag.textContent = '✓ Completed';
      doneTag.setAttribute('aria-label', `Lesson ${lessonNum}: completed`);
      bottom.appendChild(doneTag);

      /* Still allow replay */
      const replayBtn = document.createElement('button');
      replayBtn.type      = 'button';
      replayBtn.className = 'btn-success lesson-start-btn';
      replayBtn.textContent = 'REPLAY';
      replayBtn.setAttribute('aria-label', `Replay lesson ${lessonNum}: ${lesson.title}`);
      replayBtn.addEventListener('click', () => startLesson(unitId, lessonNum, key, p));
      bottom.appendChild(replayBtn);

    } else if (isUnlocked) {
      /* Available to start */
      const startBtn = document.createElement('button');
      startBtn.type      = 'button';
      startBtn.className = 'btn-success lesson-start-btn';
      startBtn.textContent = 'START';
      startBtn.setAttribute('aria-label', `Start lesson ${lessonNum}: ${lesson.title}`);
      startBtn.addEventListener('click', () => startLesson(unitId, lessonNum, key, p));
      bottom.appendChild(startBtn);

    } else {
      /* Locked */
      const lockImg = document.createElement('img');
      lockImg.src       = '../assets/img/icon-padlock.svg';
      lockImg.className = 'lesson-lock-icon';
      lockImg.setAttribute('aria-hidden', 'true');
      bottom.appendChild(lockImg);

      /* Whole card is a button that navigates to the locked modal */
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label',
        `Lesson ${lessonNum}: ${lesson.title}. Locked — complete lesson ${lessonNum - 1} first.`);

      const goLocked = () => {
        if (!unlocked) {
          // The whole unit is locked — user needs to complete the previous unit
          location.href = `modal-level-locked.html?type=unit&prev=${unitId - 1}&unitId=${unitId}`;
        } else {
          // Unit is open but this specific lesson is locked
          location.href = `modal-level-locked.html?type=lesson&prev=${lessonNum - 1}&unitId=${unitId}`;
        }
      };
      card.addEventListener('click', goLocked);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goLocked(); }
      });
    }

    card.appendChild(bottom);
    lessonsRow.appendChild(card);
  });

  /* ── Sidebar active link ────────────────────────────────────────── */
  const unitNavLink = document.querySelector('.nav-item[href="units.html"]');
  if (unitNavLink) {
    unitNavLink.classList.add('is-active');
    unitNavLink.setAttribute('aria-current', 'page');
    unitNavLink.href = '#';
  }

  /* ── Helper: start a lesson ─────────────────────────────────────── */
  function startLesson(uid, lessonNum, progressKey, progress) {
    // Store which lesson is about to run so we can mark it complete on return
    localStorage.setItem('nivela_pending_unit',   String(uid));
    localStorage.setItem('nivela_pending_lesson', String(lessonNum));

    // Keys expected by Evelin's lesson engines
    localStorage.setItem('nivela_lesson_mode',     'lesson');
    localStorage.setItem('nivela_current_block',   String(uid));
    localStorage.setItem('nivela_current_level',   String(lessonNum));
    localStorage.setItem('nivela_lesson_origin',   `unit-available.html?id=${uid}`);
    localStorage.setItem('nivela_lesson_hearts',   '5');
    localStorage.setItem('nivela_lesson_wrongs',   '0');

    location.href = 'lesson-match.html';
  }
})();
