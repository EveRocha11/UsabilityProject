(() => {
  const DAILY_CHALLENGES = [
    { text: 'Complete lessons in the shortest possible time',       meta: '5 lessons · ~ 30 min', icon: 'icon-lightning.svg' },
    { text: 'Get a score of 80% or higher in 2 lessons',           meta: '5 lessons · ~ 30 min', icon: 'icon-book.svg'      },
    { text: 'Get 5 correct answers in a row in 2 lessons',         meta: '5 lessons · ~ 30 min', icon: 'icon-target.svg'    },
    { text: 'Complete 3 lessons in less than 1 hour',              meta: '5 lessons · ~ 30 min', icon: 'icon-lightning.svg' },
    { text: 'Complete a lesson with a perfect score',              meta: '5 lessons · ~ 30 min', icon: 'icon-star.svg'      },
  ];

  const WEEKLY_CHALLENGES = [
    { text: 'Complete all 3 levels in Block 1',                    meta: '3 levels · ~ 1.5 hrs',  icon: 'icon-path.svg'      },
    { text: 'Earn 50 or more points this week',                    meta: 'All levels · ongoing',   icon: 'icon-trophy.svg'    },
    { text: 'Maintain a 5-day consecutive learning streak',        meta: 'Daily · ~ 5 days',       icon: 'icon-lightning.svg' },
  ];

  const email    = localStorage.getItem('nivela_current_email');
  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  const user     = accounts.find(a => a.email === email);

  if (user) {
    document.getElementById('header-avatar').textContent = user.name[0].toUpperCase();
  }

  const stored = localStorage.getItem(`nivela_progress_${email}`);
  const p = stored ? JSON.parse(stored) : {};

  if (!Array.isArray(p.dailyChallenges) || p.dailyChallenges.length !== 5) {
    p.dailyChallenges = [false, false, false, false, false];
  }
  if (!Array.isArray(p.weeklyChallenges) || p.weeklyChallenges.length !== 3) {
    p.weeklyChallenges = [false, false, false];
  }

  // ── Tab switching ─────────────────────────────────────────────────────────

  const tabDaily   = document.getElementById('tab-daily');
  const tabWeekly  = document.getElementById('tab-weekly');
  const secDaily   = document.getElementById('daily-section');
  const secWeekly  = document.getElementById('weekly-section');

  function showTab(tab) {
    const isDaily = (tab === 'daily');
    tabDaily.classList.toggle('is-tab-active',  isDaily);
    tabWeekly.classList.toggle('is-tab-active', !isDaily);
    secDaily.style.display  = isDaily  ? '' : 'none';
    secWeekly.style.display = !isDaily ? '' : 'none';
  }

  tabDaily.addEventListener('click',  () => showTab('daily'));
  tabWeekly.addEventListener('click', () => showTab('weekly'));

  // ── Routing helpers ───────────────────────────────────────────────────────

  function startDailyChallenge(idx) {
    localStorage.setItem('nivela_lesson_mode', 'challenge');
    localStorage.setItem('nivela_challenge_type', 'daily');
    localStorage.setItem('nivela_challenge_origin', 'challenges');
    localStorage.setItem('nivela_challenge_index', String(idx));
    localStorage.setItem('nivela_current_block', '1');
    localStorage.setItem('nivela_lesson_origin', 'challenges.html');
    localStorage.setItem('nivela_lesson_hearts', '5');
    localStorage.setItem('nivela_lesson_wrongs', '0');
    globalThis.location.href = 'lesson-match.html';
  }

  function startWeeklyChallenge(idx) {
    localStorage.setItem('nivela_lesson_mode', 'challenge');
    localStorage.setItem('nivela_challenge_type', 'weekly');
    localStorage.setItem('nivela_challenge_origin', 'challenges');
    localStorage.setItem('nivela_challenge_index', String(idx));
    localStorage.setItem('nivela_current_block', '1');
    localStorage.setItem('nivela_lesson_origin', 'challenges.html');
    localStorage.setItem('nivela_lesson_hearts', '5');
    localStorage.setItem('nivela_lesson_wrongs', '0');
    globalThis.location.href = 'lesson-match.html';
  }

  // ── Daily rendering ───────────────────────────────────────────────────────

  const dCompleted = p.dailyChallenges.filter(Boolean).length;
  const dActiveIdx = p.dailyChallenges.findIndex(done => !done);
  const dAllDone   = dActiveIdx === -1;

  const gridIndices = dAllDone
    ? [0, 1, 2, 3]
    : [0, 1, 2, 3, 4].filter(i => i !== dActiveIdx);

  // Featured daily card
  const featuredCard     = document.querySelector('.daily-challenge-card');
  const featuredTitle    = document.querySelector('.daily-challenge-title');
  const featuredMeta     = document.querySelector('.daily-challenge-meta');
  const featuredIcon     = document.querySelector('.daily-challenge-icon-box img');
  const featuredFill     = document.querySelector('.daily-challenge-progress-track .progress-fill');
  const featuredFraction = document.querySelector('.daily-challenge-fraction');
  const featuredBtn      = document.querySelector('.daily-challenge-right button');

  if (dAllDone) {
    featuredCard.classList.add('is-complete');
    featuredTitle.textContent    = 'All challenges complete!';
    featuredMeta.textContent     = 'Come back tomorrow for new challenges.';
    featuredIcon.src             = '../assets/img/icon-trophy.svg';
    if (featuredFill) featuredFill.style.width = '100%';
    featuredFraction.textContent = '5 / 5';
    featuredBtn.textContent      = 'DONE ✓';
    featuredBtn.disabled         = true;
  } else {
    const ch                     = DAILY_CHALLENGES[dActiveIdx];
    featuredTitle.textContent    = ch.text;
    featuredMeta.textContent     = ch.meta;
    featuredIcon.src             = `../assets/img/${ch.icon}`;
    if (featuredFill) featuredFill.style.width = Math.round(dCompleted / 5 * 100) + '%';
    featuredFraction.textContent = `${dCompleted} / 5`;
    featuredBtn.addEventListener('click', () => startDailyChallenge(dActiveIdx));
  }

  // Grid: 4 remaining daily challenges
  const gridCards = document.querySelectorAll('#daily-section .challenge-grid-card');
  gridIndices.forEach((chIdx, cardPos) => {
    const card = gridCards[cardPos];
    if (!card) return;

    const ch   = DAILY_CHALLENGES[chIdx];
    const done = p.dailyChallenges[chIdx];

    const titleEl = card.querySelector('.challenge-grid-title');
    const metaEl  = card.querySelector('.challenge-grid-meta');
    const iconEl  = card.querySelector('.challenge-grid-icon-box img');
    const fill    = card.querySelector('.challenge-grid-progress-track .progress-fill');
    const btn     = card.querySelector('.challenge-grid-footer button');

    if (titleEl) titleEl.textContent = ch.text;
    if (metaEl)  metaEl.textContent  = ch.meta;
    if (iconEl)  iconEl.src          = `../assets/img/${ch.icon}`;

    if (done) {
      card.classList.add('is-complete');
      if (fill) fill.style.width = '100%';
      if (btn) { btn.textContent = 'DONE ✓'; btn.disabled = true; }
    } else {
      if (fill) fill.style.width = '0%';
      if (btn) btn.addEventListener('click', () => startDailyChallenge(chIdx));
    }
  });

  // ── Weekly rendering ──────────────────────────────────────────────────────

  const wCompleted = p.weeklyChallenges.filter(Boolean).length;
  const wActiveIdx = p.weeklyChallenges.findIndex(done => !done);
  const wAllDone   = wActiveIdx === -1;

  // Weekly grid indices = the 2 challenges that are not featured
  const wGridIndices = wAllDone
    ? [0, 1]
    : [0, 1, 2].filter(i => i !== wActiveIdx);

  // Featured weekly card
  const wCard     = document.getElementById('weekly-featured-card');
  const wTitle    = document.getElementById('weekly-featured-title');
  const wMeta     = document.getElementById('weekly-featured-meta');
  const wIcon     = document.getElementById('weekly-featured-icon');
  const wFill     = document.getElementById('weekly-featured-fill');
  const wFraction = document.getElementById('weekly-featured-fraction');
  const wBtn      = document.getElementById('weekly-featured-btn');

  if (wAllDone) {
    wCard.classList.add('is-complete');
    wTitle.textContent    = 'All weekly challenges complete!';
    wMeta.textContent     = 'Great work — come back next week!';
    wIcon.src             = '../assets/img/icon-trophy.svg';
    wFill.style.width     = '100%';
    wFraction.textContent = '3 / 3';
    wBtn.textContent      = 'DONE ✓';
    wBtn.disabled         = true;
  } else {
    const wch          = WEEKLY_CHALLENGES[wActiveIdx];
    wTitle.textContent = wch.text;
    wMeta.textContent  = wch.meta;
    wIcon.src          = `../assets/img/${wch.icon}`;
    wFill.style.width  = Math.round(wCompleted / 3 * 100) + '%';
    wFraction.textContent = `${wCompleted} / 3`;
    wBtn.addEventListener('click', () => startWeeklyChallenge(wActiveIdx));
  }

  // Weekly grid: the other 2 challenges
  const wGridCards = [
    document.getElementById('weekly-grid-0'),
    document.getElementById('weekly-grid-1'),
  ];

  wGridIndices.forEach((chIdx, cardPos) => {
    const card = wGridCards[cardPos];
    if (!card) return;

    const wch  = WEEKLY_CHALLENGES[chIdx];
    const done = p.weeklyChallenges[chIdx];

    const titleEl = card.querySelector('.challenge-grid-title');
    const metaEl  = card.querySelector('.challenge-grid-meta');
    const iconEl  = card.querySelector('.challenge-grid-icon-box img');
    const fill    = card.querySelector('.challenge-grid-progress-track .progress-fill');
    const btn     = card.querySelector('.challenge-grid-footer button');

    if (titleEl) titleEl.textContent = wch.text;
    if (metaEl)  metaEl.textContent  = wch.meta;
    if (iconEl)  iconEl.src          = `../assets/img/${wch.icon}`;

    if (done) {
      card.classList.add('is-complete');
      if (fill) fill.style.width = '100%';
      if (btn) { btn.textContent = 'DONE ✓'; btn.disabled = true; }
    } else {
      if (fill) fill.style.width = '0%';
      if (btn) btn.addEventListener('click', () => startWeeklyChallenge(chIdx));
    }
  });
})();
