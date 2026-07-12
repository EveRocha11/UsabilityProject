(() => {
  const currentEmail = localStorage.getItem('nivela_current_email');
  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  const user = accounts.find(a => a.email === currentEmail);

  if (!user) {
    globalThis.location.href = 'login.html';
    return;
  }

  /* ── Load / init progress ─────────────────────────────────────────── */
  const progressKey = `nivela_progress_${currentEmail}`;
  const stored = localStorage.getItem(progressKey);
  const p = stored ? JSON.parse(stored) : {};

  // Ensure all fields exist
  if (!p.units) p.units = {
    1: { complete: false, lessons: [false, false, false] },
    2: { complete: false, lessons: [false, false, false] },
    3: { complete: false, lessons: [false, false, false] },
    4: { complete: false, lessons: [false, false, false] },
  };
  if (!p.dailyChallenges  || p.dailyChallenges.length  !== 5) p.dailyChallenges  = [false,false,false,false,false];
  if (!p.weeklyChallenges || p.weeklyChallenges.length !== 3) p.weeklyChallenges = [false,false,false];
  if (p.points    === undefined) p.points    = 0;
  if (p.streak    === undefined) p.streak    = 0;
  if (p.badges    === undefined) p.badges    = 0;
  if (p.accuracy  === undefined) p.accuracy  = 100;
  if (p.totalWrongs === undefined) p.totalWrongs = 0;

  /* ── Handle lesson returning from lesson-match (started from dashboard) ── */
  const pendingUnit   = localStorage.getItem('nivela_pending_unit');
  const pendingLesson = localStorage.getItem('nivela_pending_lesson');
  const lessonMode    = localStorage.getItem('nivela_lesson_mode');

  if (pendingUnit && pendingLesson) {
    const reallyFinished = !lessonMode;
    if (reallyFinished) {
      const uid = Number(pendingUnit);
      const lid = Number(pendingLesson) - 1;
      if (p.units[uid]) {
        p.units[uid].lessons[lid] = true;
        if (p.units[uid].lessons.every(Boolean)) {
          p.units[uid].complete = true;
          if (uid < 4) p.units[uid + 1] = p.units[uid + 1] || { complete: false, lessons: [false, false, false] };
        }
        p[`level${Number(pendingLesson)}Complete`] = true;
        const totalDone = Object.values(p.units).reduce((s, u) => s + u.lessons.filter(Boolean).length, 0);
        p.lessonsCompleted = Math.max(p.lessonsCompleted || 0, totalDone);
        // Accuracy
        const wrongs = parseInt(localStorage.getItem('nivela_lesson_wrongs') || '0', 10);
        p.totalWrongs += wrongs;
        p.accuracy = Math.max(0, Math.round((1 - p.totalWrongs / (Math.max(1, totalDone) * 5)) * 100));
      }
    }
    localStorage.removeItem('nivela_pending_unit');
    localStorage.removeItem('nivela_pending_lesson');
    if (!reallyFinished) {
      localStorage.removeItem('nivela_lesson_mode');
      localStorage.removeItem('nivela_current_block');
      localStorage.removeItem('nivela_current_level');
    }
  }

  /* ── Handle challenge completion (returning from lesson started as challenge) ── */
  const challengeType = localStorage.getItem('nivela_challenge_type');
  const challengeIdx  = localStorage.getItem('nivela_challenge_index');
  // If lesson_mode is gone → lesson-complete.js ran → challenge was finished
  if (challengeType && challengeIdx !== null && !localStorage.getItem('nivela_lesson_mode')) {
    const idx = parseInt(challengeIdx, 10);
    if (!isNaN(idx)) {
      if (challengeType === 'daily')  p.dailyChallenges[idx]  = true;
      if (challengeType === 'weekly') p.weeklyChallenges[idx] = true;
    }
    localStorage.removeItem('nivela_challenge_type');
    localStorage.removeItem('nivela_challenge_index');
  } else if (challengeType) {
    // User abandoned — still clean up keys
    localStorage.removeItem('nivela_challenge_type');
    localStorage.removeItem('nivela_challenge_index');
    localStorage.removeItem('nivela_lesson_mode');
  }

  /* ── Streak (daily login tracking) ───────────────────────────────── */
  const today     = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10);
  if (!p.lastLoginDate) {
    p.streak = 1;
  } else if (p.lastLoginDate === today) {
    // Same day — no change
  } else if (p.lastLoginDate === yesterday) {
    p.streak = (p.streak || 0) + 1;
  } else {
    p.streak = 1; // streak broken
  }
  p.lastLoginDate = today;

  /* ── Badges = completed units ─────────────────────────────────────── */
  p.badges = Object.values(p.units).filter(u => u.complete).length;

  /* ── Current unit for dashboard display ───────────────────────────── */
  let currentUnitId = 1;
  for (let id = 1; id <= 4; id++) {
    if (p.units[id] && !p.units[id].complete) { currentUnitId = id; break; }
    if (id === 4) currentUnitId = 4;
  }
  const unitData = p.units[currentUnitId];
  const unitDone = unitData ? unitData.lessons.filter(Boolean).length : 0;

  /* ── Persist updated progress ─────────────────────────────────────── */
  localStorage.setItem(progressKey, JSON.stringify(p));

  /* ════════════════════════════════════════════════════════════════════
     UI RENDERING
     ════════════════════════════════════════════════════════════════════ */

  // Greeting and avatar
  document.querySelector('.greeting h1').textContent = `Hi, ${user.name}!`;
  const avatarEl = document.querySelector('.avatar');
  if (avatarEl) avatarEl.textContent = user.name[0].toUpperCase();

  // Stats row
  const statValues = document.querySelectorAll('.stat-value');
  if (statValues[0]) statValues[0].textContent = p.points > 0 ? 'Top 5%' : '--';
  if (statValues[1]) statValues[1].textContent = p.badges;
  if (statValues[2]) statValues[2].textContent = p.accuracy + '%';

  // Progress banner
  const pct = Math.round(unitDone / 3 * 100);
  const streakEl = document.querySelector('.progress-banner-streak');
  const metaEl   = document.querySelector('.progress-banner-meta');
  const fillEl   = document.querySelector('.progress-banner-right .progress-fill');
  if (streakEl) streakEl.textContent = `${p.streak}-day streak · Unit ${currentUnitId}`;
  if (metaEl)   metaEl.textContent   = `U${currentUnitId} · ${unitDone}/3 lessons completed`;
  if (fillEl)   fillEl.style.width   = pct + '%';
  const pointsEl = document.querySelector('.progress-banner-points');
  if (pointsEl) pointsEl.textContent = p.points + ' P';

  /* ── Lesson cards (previously "Level cards") ──────────────────────── */
  const unitInfo = (typeof UNITS_DATA !== 'undefined') ? UNITS_DATA[currentUnitId - 1] : null;
  const cards    = document.querySelectorAll('.level-card');

  // Reset all cards first
  cards.forEach((card, i) => {
    card.classList.remove('is-complete', 'is-locked');
    const oldIcon = card.querySelector('.level-status-icon');
    if (oldIcon) oldIcon.remove();

    // Badge: U1 / U2 / U3 / U4
    const badge = card.querySelector('.level-badge');
    if (badge) badge.textContent = `U${currentUnitId}`;

    // Title: "Level X" → "Lesson X"
    const titleEl = card.querySelector('.level-title');
    if (titleEl) titleEl.textContent = `Lesson ${i + 1}`;

    // Lesson description from UNITS_DATA
    const descEl = card.querySelector('.level-lesson');
    if (descEl && unitInfo && unitInfo.lessons[i]) {
      descEl.textContent = unitInfo.lessons[i].title;
    }
  });

  function addCheck(card) {
    card.classList.add('is-complete');
    const img = document.createElement('img');
    img.className = 'level-status-icon';
    img.src = '../assets/img/icon-check.svg';
    img.alt = 'Completed';
    card.querySelector('.level-top').appendChild(img);
  }

  function addPadlock(card) {
    card.classList.add('is-locked');
    const img = document.createElement('img');
    img.className = 'level-status-icon';
    img.src = '../assets/img/icon-padlock.svg';
    img.alt = 'Locked';
    card.querySelector('.level-top').appendChild(img);
  }

  // Lesson 1
  if (unitData && unitData.lessons[0]) addCheck(cards[0]);

  // Lesson 2: locked until lesson 1 done
  if (!unitData || !unitData.lessons[0]) addPadlock(cards[1]);
  else if (unitData.lessons[1]) addCheck(cards[1]);

  // Lesson 3: locked until lesson 2 done
  if (!unitData || !unitData.lessons[1]) addPadlock(cards[2]);
  else if (unitData.lessons[2]) addCheck(cards[2]);

  // Toast for locked lessons
  const toast     = document.getElementById('locked-toast');
  let   toastTimer = null;
  function showLockedToast() {
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // Click handlers
  cards.forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      if (card.classList.contains('is-locked')) {
        showLockedToast();
      } else {
        const lessonNum = i + 1;
        localStorage.setItem('nivela_pending_unit',   String(currentUnitId));
        localStorage.setItem('nivela_pending_lesson', String(lessonNum));
        localStorage.setItem('nivela_lesson_mode',    'lesson');
        localStorage.setItem('nivela_current_block',  String(currentUnitId));
        localStorage.setItem('nivela_current_level',  String(lessonNum));
        localStorage.setItem('nivela_lesson_origin',  'dashboard.html');
        localStorage.setItem('nivela_lesson_hearts',  '5');
        localStorage.setItem('nivela_lesson_wrongs',  '0');
        globalThis.location.href = 'lesson-match.html';
      }
    });
  });

  /* ── Daily challenge ─────────────────────────────────────────────── */
  const DAILY_CHALLENGES = [
    { text: 'Complete lessons in the shortest possible time',  meta: '5 lessons · ~ 30 min', icon: 'icon-lightning.svg' },
    { text: 'Get a score of 80% or higher in 2 lessons',      meta: '5 lessons · ~ 30 min', icon: 'icon-book.svg'      },
    { text: 'Get 5 correct answers in a row in 2 lessons',    meta: '5 lessons · ~ 30 min', icon: 'icon-target.svg'    },
    { text: 'Complete 3 lessons in less than 1 hour',         meta: '5 lessons · ~ 30 min', icon: 'icon-lightning.svg' },
    { text: 'Complete a lesson with a perfect score',         meta: '5 lessons · ~ 30 min', icon: 'icon-star.svg'      },
  ];

  const completedCount = p.dailyChallenges.filter(Boolean).length;
  const activeIdx      = p.dailyChallenges.findIndex(done => !done);
  const allDone        = activeIdx === -1;

  const challengeFill = document.querySelector('.challenge-progress-fill');
  if (challengeFill) challengeFill.style.width = Math.round(completedCount / 5 * 100) + '%';

  const challengeCard  = document.getElementById('daily-challenge-card');
  const challengeBtn   = document.getElementById('daily-challenge-start');
  const completeBadge  = document.getElementById('challenge-complete-badge');

  if (allDone) {
    if (challengeCard)  challengeCard.classList.add('is-complete');
    if (completeBadge) { completeBadge.style.display = ''; completeBadge.textContent = '✓ All challenges done today!'; }
    const ct = document.getElementById('challenge-text');
    const cm = document.getElementById('challenge-meta');
    const ci = document.getElementById('challenge-icon');
    if (ct) ct.textContent = 'Come back tomorrow for new challenges.';
    if (cm) cm.textContent = '';
    if (ci) ci.src = '../assets/img/icon-trophy.svg';
    if (challengeBtn) { challengeBtn.textContent = 'DONE ✓'; challengeBtn.className = 'btn-success'; challengeBtn.disabled = true; }
  } else {
    const active = DAILY_CHALLENGES[activeIdx];
    const ct = document.getElementById('challenge-text');
    const cm = document.getElementById('challenge-meta');
    const ci = document.getElementById('challenge-icon');
    if (ct) ct.textContent = active.text;
    if (cm) cm.textContent = active.meta;
    if (ci) ci.src = `../assets/img/${active.icon}`;
    if (challengeBtn) {
      challengeBtn.addEventListener('click', () => {
        localStorage.setItem('nivela_lesson_mode',       'challenge');
        localStorage.setItem('nivela_challenge_type',    'daily');
        localStorage.setItem('nivela_challenge_origin',  'dashboard');
        localStorage.setItem('nivela_challenge_index',   String(activeIdx));
        localStorage.setItem('nivela_current_block',     '1');
        localStorage.setItem('nivela_lesson_origin',     'dashboard.html');
        localStorage.setItem('nivela_lesson_hearts',     '5');
        localStorage.setItem('nivela_lesson_wrongs',     '0');
        globalThis.location.href = 'lesson-match.html';
      });
    }
  }

  /* ── Weekly challenge ────────────────────────────────────────────── */
  const WEEKLY_CHALLENGES = [
    { text: 'Complete all 3 lessons in Unit 1',               meta: '3 lessons · ~ 1.5 hrs', icon: 'icon-path.svg'      },
    { text: 'Earn 50 or more points this week',               meta: 'All units · ongoing',    icon: 'icon-trophy.svg'    },
    { text: 'Maintain a 5-day consecutive learning streak',   meta: 'Daily · ~ 5 days',       icon: 'icon-lightning.svg' },
  ];

  const wCompleted = p.weeklyChallenges.filter(Boolean).length;
  const wActiveIdx = p.weeklyChallenges.findIndex(done => !done);
  const wAllDone   = wActiveIdx === -1;

  const weeklyFill = document.getElementById('weekly-progress-fill');
  if (weeklyFill) weeklyFill.style.width = Math.round(wCompleted / 3 * 100) + '%';

  const weeklyCard  = document.getElementById('weekly-challenge-card');
  const weeklyBtn   = document.getElementById('weekly-challenge-start');
  const weeklyBadge = document.getElementById('weekly-complete-badge');

  if (wAllDone) {
    if (weeklyCard)  weeklyCard.classList.add('is-complete');
    if (weeklyBadge) weeklyBadge.style.display = '';
    const wt = document.getElementById('weekly-challenge-text');
    const wm = document.getElementById('weekly-challenge-meta');
    const wi = document.getElementById('weekly-challenge-icon');
    if (wt) wt.textContent = 'Come back next week for new challenges!';
    if (wm) wm.textContent = '';
    if (wi) wi.src = '../assets/img/icon-trophy.svg';
    if (weeklyBtn) { weeklyBtn.textContent = 'DONE ✓'; weeklyBtn.disabled = true; }
  } else {
    const wa = WEEKLY_CHALLENGES[wActiveIdx];
    const wt = document.getElementById('weekly-challenge-text');
    const wm = document.getElementById('weekly-challenge-meta');
    const wi = document.getElementById('weekly-challenge-icon');
    if (wt) wt.textContent = wa.text;
    if (wm) wm.textContent = wa.meta;
    if (wi) wi.src = `../assets/img/${wa.icon}`;
    if (weeklyBtn) {
      weeklyBtn.addEventListener('click', () => {
        localStorage.setItem('nivela_lesson_mode',       'challenge');
        localStorage.setItem('nivela_challenge_type',    'weekly');
        localStorage.setItem('nivela_challenge_origin',  'dashboard');
        localStorage.setItem('nivela_challenge_index',   String(wActiveIdx));
        localStorage.setItem('nivela_current_block',     '1');
        localStorage.setItem('nivela_lesson_origin',     'dashboard.html');
        localStorage.setItem('nivela_lesson_hearts',     '5');
        localStorage.setItem('nivela_lesson_wrongs',     '0');
        globalThis.location.href = 'lesson-match.html';
      });
    }
  }
})();
