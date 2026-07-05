(() => {
  const currentEmail = localStorage.getItem('nivela_current_email');
  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  const user = accounts.find(a => a.email === currentEmail);

  if (!user) {
    globalThis.location.href = 'login.html';
    return;
  }

  // Greeting and avatar
  document.querySelector('.greeting h1').textContent = `¡Hi, ${user.name}!`;
  document.querySelector('.avatar').textContent = user.name[0].toUpperCase();

  // Load progress — new users get zero defaults
  const stored = localStorage.getItem(`nivela_progress_${currentEmail}`);
  const p = stored ? JSON.parse(stored) : {
    points: 0, streak: 0, level: 'I1',
    lessonsCompleted: 0, totalLessons: 3,
    badges: 0, accuracy: 0,
    level1Complete: false, level2Complete: false, level3Complete: false,
    dailyChallenges: [false, false, false, false, false],
  };

  // Stats row
  const statValues = document.querySelectorAll('.stat-value');
  statValues[0].textContent = p.points > 0 ? 'Top 5%' : '--';
  statValues[1].textContent = p.badges;
  statValues[2].textContent = p.accuracy + '%';

  // Progress banner
  document.querySelector('.progress-banner-points').textContent = p.points + ' P';
  document.querySelector('.progress-banner-streak').textContent =
    `${p.streak}-day streak · Level ${p.level}`;
  document.querySelector('.progress-banner-meta').textContent =
    `${p.level} · ${p.lessonsCompleted}/${p.totalLessons} lessons completed`;
  const pct = p.totalLessons > 0
    ? Math.round((p.lessonsCompleted / p.totalLessons) * 100)
    : 0;
  document.querySelector('.progress-banner-right .progress-fill').style.width = pct + '%';

  // --- Daily challenge: 5 challenges, same list as challenges.html ---
  const DAILY_CHALLENGES = [
    { text: 'Complete lessons in the shortest possible time',  meta: '5 lessons · ~ 30 min', icon: 'icon-lightning.svg' },
    { text: 'Get a score of 80% or higher in 2 lessons',      meta: '5 lessons · ~ 30 min', icon: 'icon-book.svg'      },
    { text: 'Get 5 correct answers in a row in 2 lessons',    meta: '5 lessons · ~ 30 min', icon: 'icon-target.svg'    },
    { text: 'Complete 3 lessons in less than 1 hour',         meta: '5 lessons · ~ 30 min', icon: 'icon-lightning.svg' },
    { text: 'Complete a lesson with a perfect score',         meta: '5 lessons · ~ 30 min', icon: 'icon-star.svg'      },
  ];

  // Migrate from old schema if needed
  if (!Array.isArray(p.dailyChallenges) || p.dailyChallenges.length !== 5) {
    p.dailyChallenges = [false, false, false, false, false];
  }

  const completedCount = p.dailyChallenges.filter(Boolean).length;
  const activeIdx      = p.dailyChallenges.findIndex(done => !done);
  const allDone        = activeIdx === -1;

  // Progress bar shows overall daily challenge completion
  document.querySelector('.challenge-progress-fill').style.width =
    Math.round(completedCount / 5 * 100) + '%';

  const challengeCard  = document.getElementById('daily-challenge-card');
  const challengeBtn   = document.getElementById('daily-challenge-start');
  const completeBadge  = document.getElementById('challenge-complete-badge');

  if (allDone) {
    challengeCard.classList.add('is-complete');
    completeBadge.style.display   = '';
    completeBadge.textContent     = '✓ All challenges done today!';
    document.getElementById('challenge-text').textContent = 'Come back tomorrow for new challenges.';
    document.getElementById('challenge-meta').textContent = '';
    document.getElementById('challenge-icon').src = '../assets/img/icon-trophy.svg';
    challengeBtn.textContent = 'DONE ✓';
    challengeBtn.className   = 'btn-success';
    challengeBtn.disabled    = true;
  } else {
    const active = DAILY_CHALLENGES[activeIdx];
    document.getElementById('challenge-text').textContent = active.text;
    document.getElementById('challenge-meta').textContent = active.meta;
    document.getElementById('challenge-icon').src = `../assets/img/${active.icon}`;

    challengeBtn.addEventListener('click', () => {
      localStorage.setItem('nivela_lesson_mode', 'challenge');
      localStorage.setItem('nivela_challenge_type', 'daily');
      localStorage.setItem('nivela_challenge_origin', 'dashboard');
      localStorage.setItem('nivela_challenge_index', String(activeIdx));
      localStorage.setItem('nivela_current_block', '1');
      localStorage.setItem('nivela_lesson_origin', 'dashboard.html');
      localStorage.setItem('nivela_lesson_hearts', '5');
      localStorage.setItem('nivela_lesson_wrongs', '0');
      globalThis.location.href = 'lesson-match.html';
    });
  }

  // --- Weekly challenge ------------------------------------------------
  const WEEKLY_CHALLENGES = [
    { text: 'Complete all 3 levels in Block 1',             meta: '3 levels · ~ 1.5 hrs',  icon: 'icon-path.svg'      },
    { text: 'Earn 50 or more points this week',             meta: 'All levels · ongoing',   icon: 'icon-trophy.svg'    },
    { text: 'Maintain a 5-day consecutive learning streak', meta: 'Daily · ~ 5 days',       icon: 'icon-lightning.svg' },
  ];

  if (!Array.isArray(p.weeklyChallenges) || p.weeklyChallenges.length !== 3) {
    p.weeklyChallenges = [false, false, false];
  }

  const wCompleted = p.weeklyChallenges.filter(Boolean).length;
  const wActiveIdx = p.weeklyChallenges.findIndex(done => !done);
  const wAllDone   = wActiveIdx === -1;

  document.getElementById('weekly-progress-fill').style.width =
    Math.round(wCompleted / 3 * 100) + '%';

  const weeklyCard  = document.getElementById('weekly-challenge-card');
  const weeklyBtn   = document.getElementById('weekly-challenge-start');
  const weeklyBadge = document.getElementById('weekly-complete-badge');

  if (wAllDone) {
    weeklyCard.classList.add('is-complete');
    weeklyBadge.style.display = '';
    document.getElementById('weekly-challenge-text').textContent = 'Come back next week for new challenges!';
    document.getElementById('weekly-challenge-meta').textContent = '';
    document.getElementById('weekly-challenge-icon').src = '../assets/img/icon-trophy.svg';
    weeklyBtn.textContent = 'DONE ✓';
    weeklyBtn.disabled    = true;
  } else {
    const wa = WEEKLY_CHALLENGES[wActiveIdx];
    document.getElementById('weekly-challenge-text').textContent = wa.text;
    document.getElementById('weekly-challenge-meta').textContent = wa.meta;
    document.getElementById('weekly-challenge-icon').src = `../assets/img/${wa.icon}`;
    weeklyBtn.addEventListener('click', () => {
      localStorage.setItem('nivela_lesson_mode', 'challenge');
      localStorage.setItem('nivela_challenge_type', 'weekly');
      localStorage.setItem('nivela_challenge_origin', 'dashboard');
      localStorage.setItem('nivela_challenge_index', String(wActiveIdx));
      localStorage.setItem('nivela_current_block', '1');
      localStorage.setItem('nivela_lesson_origin', 'dashboard.html');
      localStorage.setItem('nivela_lesson_hearts', '5');
      localStorage.setItem('nivela_lesson_wrongs', '0');
      globalThis.location.href = 'lesson-match.html';
    });
  }

  // --- Level cards: reset all, then apply state from progress ---
  const cards = document.querySelectorAll('.level-card');

  cards.forEach(card => {
    card.classList.remove('is-complete', 'is-locked');
    const icon = card.querySelector('.level-status-icon');
    if (icon) icon.remove();
  });

  function addCheck(card) {
    const img = document.createElement('img');
    img.className = 'level-status-icon';
    img.src = '../assets/img/icon-check.svg';
    img.alt = 'Completado';
    card.querySelector('.level-top').appendChild(img);
  }

  function addPadlock(card) {
    card.classList.add('is-locked');
    const img = document.createElement('img');
    img.className = 'level-status-icon';
    img.src = '../assets/img/icon-padlock.svg';
    img.alt = 'Bloqueado';
    card.querySelector('.level-top').appendChild(img);
  }

  // Level 1
  if (p.level1Complete) addCheck(cards[0]);

  // Level 2: unlocks when level 1 done
  if (!p.level1Complete) {
    addPadlock(cards[1]);
  } else if (p.level2Complete) {
    addCheck(cards[1]);
  }

  // Level 3: unlocks when level 2 done
  if (!p.level2Complete) {
    addPadlock(cards[2]);
  } else if (p.level3Complete) {
    addCheck(cards[2]);
  }

  // --- Toast for locked levels ---
  const toast = document.getElementById('locked-toast');
  let toastTimer = null;

  function showLockedToast() {
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // --- Click handlers for all level cards ---
  cards.forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      if (card.classList.contains('is-locked')) {
        showLockedToast();
      } else {
        localStorage.setItem('nivela_lesson_mode', 'lesson');
        localStorage.setItem('nivela_current_level', i + 1);
        localStorage.setItem('nivela_current_block', '1');
        localStorage.setItem('nivela_lesson_origin', 'dashboard.html');
        localStorage.setItem('nivela_lesson_hearts', '5');
        localStorage.setItem('nivela_lesson_wrongs', '0');
        globalThis.location.href = 'lesson-match.html';
      }
    });
  });
})();
