(() => {
  const email  = localStorage.getItem('nivela_current_email');
  const mode   = localStorage.getItem('nivela_lesson_mode') || 'lesson';
  const level  = Number.parseInt(localStorage.getItem('nivela_current_level') || '1', 10);

  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  const user     = accounts.find(a => a.email === email);
  if (user) document.querySelector('.avatar').textContent = user.name[0].toUpperCase();

  const LEVEL_MAP = {
    1: { key: 'level1Complete', min: 1 },
    2: { key: 'level2Complete', min: 2 },
    3: { key: 'level3Complete', min: 3 },
  };

  function applyLevelCompletion(p) {
    const entry = LEVEL_MAP[level];
    if (!entry) return;
    p[entry.key] = true;
    if (p.lessonsCompleted < entry.min) p.lessonsCompleted = entry.min;
  }

  function ensureArrays(p) {
    if (!Array.isArray(p.dailyChallenges)  || p.dailyChallenges.length  !== 5)
      p.dailyChallenges  = [false, false, false, false, false];
    if (!Array.isArray(p.weeklyChallenges) || p.weeklyChallenges.length !== 3)
      p.weeklyChallenges = [false, false, false];
  }

  function applyChallenge(p) {
    const chIdx  = Number.parseInt(localStorage.getItem('nivela_challenge_index') || '0', 10);
    const chType = localStorage.getItem('nivela_challenge_type') || 'daily';
    ensureArrays(p);

    if (chType === 'weekly') {
      p.weeklyChallenges[chIdx] = true;
      p.points = (p.points || 0) + 15;
    } else {
      p.dailyChallenges[chIdx] = true;
      p.points = (p.points || 0) + 8;
    }

    localStorage.removeItem('nivela_challenge_index');
    localStorage.removeItem('nivela_challenge_type');
  }

  if (email) {
    const key    = `nivela_progress_${email}`;
    const stored = localStorage.getItem(key);
    const p      = stored ? JSON.parse(stored) : {
      points: 0, streak: 0, level: 'I2',
      lessonsCompleted: 0, totalLessons: 3,
      badges: 0, accuracy: 0,
      level1Complete: false, level2Complete: false, level3Complete: false,
      dailyChallenges:  [false, false, false, false, false],
      weeklyChallenges: [false, false, false],
    };

    if (mode === 'challenge') {
      applyChallenge(p);
    } else {
      applyLevelCompletion(p);
      p.points = (p.points || 0) + 4;
    }

    localStorage.setItem(key, JSON.stringify(p));
    localStorage.removeItem('nivela_lesson_mode');
    localStorage.removeItem('nivela_challenge_origin');
  }

  document.querySelector('.lesson-next-btn').addEventListener('click', () => {
    const dest = localStorage.getItem('nivela_lesson_origin') || 'dashboard.html';
    localStorage.removeItem('nivela_lesson_origin');
    globalThis.location.href = dest;
  });
})();
