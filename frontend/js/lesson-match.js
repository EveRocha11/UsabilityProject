(() => {
  // Load user
  const email    = localStorage.getItem('nivela_current_email');
  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  const user     = accounts.find(a => a.email === email);
  if (user) document.getElementById('header-avatar').textContent = user.name[0].toUpperCase();

  // Resolve exercise data
  const mode  = localStorage.getItem('nivela_lesson_mode') || 'lesson';
  const block = localStorage.getItem('nivela_current_block') || '1';
  const level = Number.parseInt(localStorage.getItem('nivela_current_level') || '1', 10);

  const data = mode === 'challenge'
    ? EXERCISE_DATA.challenge.match
    : EXERCISE_DATA[`b${block}`][`l${level}`].match;

  document.getElementById('match-instruction').textContent = data.instruction;

  // Shuffle helper
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const pairs = data.pairs;
  const total = pairs.length;

  const leftItems  = pairs.map((p, i) => ({ text: p.left,  pairIdx: i }));
  const rightItems = shuffle(pairs.map((p, i) => ({ text: p.right, pairIdx: i })));

  const leftCol  = document.getElementById('match-left');
  const rightCol = document.getElementById('match-right');
  const counter  = document.getElementById('match-counter');
  const progressFill = document.getElementById('lesson-progress-fill');
  const continueBtn  = document.getElementById('continue-btn');

  // Hearts
  let hearts = Number.parseInt(localStorage.getItem('nivela_lesson_hearts') || '5', 10);
  let wrongs = Number.parseInt(localStorage.getItem('nivela_lesson_wrongs') || '0', 10);
  const heartsSpan = document.querySelector('.lesson-hearts span');
  heartsSpan.textContent = hearts;

  function registerWrong() {
    wrongs++;
    localStorage.setItem('nivela_lesson_wrongs', String(wrongs));
    if (wrongs % 3 === 0) {
      hearts = Math.max(0, hearts - 1);
      heartsSpan.textContent = hearts;
      localStorage.setItem('nivela_lesson_hearts', String(hearts));
      if (hearts === 0) {
        const origin = localStorage.getItem('nivela_lesson_origin') || 'dashboard.html';
        setTimeout(() => { globalThis.location.href = origin; }, 800);
      }
    }
  }

  function updateProgress(matched) {
    const pct = Math.round((matched / total) * 33);
    progressFill.style.width = pct + '%';
    counter.textContent = `${matched} / ${total} matched`;
  }
  updateProgress(0);

  function makeCard(text, pairIdx, side) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'match-card';
    btn.dataset.pairIdx = String(pairIdx);
    btn.dataset.side = side;
    btn.textContent = text;
    return btn;
  }

  leftItems.forEach(item  => leftCol.appendChild(makeCard(item.text,  item.pairIdx,  'left')));
  rightItems.forEach(item => rightCol.appendChild(makeCard(item.text, item.pairIdx, 'right')));

  let selectedLeft  = null;
  let matchedCount  = 0;

  document.querySelectorAll('.match-card').forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('is-correct') || card.classList.contains('is-wrong')) return;

      if (card.dataset.side === 'left') {
        document.querySelectorAll('.match-card[data-side="left"].is-selected')
          .forEach(c => c.classList.remove('is-selected'));
        selectedLeft = card;
        card.classList.add('is-selected');
        return;
      }

      // Right card clicked
      if (!selectedLeft) return;

      const leftIdx  = Number.parseInt(selectedLeft.dataset.pairIdx, 10);
      const rightIdx = Number.parseInt(card.dataset.pairIdx, 10);

      if (leftIdx === rightIdx) {
        selectedLeft.classList.remove('is-selected');
        selectedLeft.classList.add('is-correct');
        selectedLeft.disabled = true;
        card.classList.add('is-correct');
        card.disabled = true;
        selectedLeft = null;
        matchedCount++;
        updateProgress(matchedCount);

        if (matchedCount === total) {
          progressFill.style.width = '33%';
          continueBtn.disabled = false;
          continueBtn.classList.add('is-ready');
        }
      } else {
        const wrongLeft = selectedLeft;
        selectedLeft = null;
        wrongLeft.classList.remove('is-selected');
        wrongLeft.classList.add('is-wrong');
        card.classList.add('is-wrong');
        registerWrong();
        setTimeout(() => {
          wrongLeft.classList.remove('is-wrong');
          card.classList.remove('is-wrong');
        }, 600);
      }
    });
  });

  function triggerExit(e, destination) {
    if (e) e.preventDefault();
    localStorage.setItem('nivela_exit_return', 'lesson-match.html');
    localStorage.setItem('nivela_exit_destination', destination || 'dashboard.html');
    globalThis.location.href = 'exit-modal.html';
  }

  const lessonOrigin = localStorage.getItem('nivela_lesson_origin') || 'dashboard.html';

  // Mark the correct sidebar item as active based on where the lesson was started
  document.querySelectorAll('.nav-item').forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === lessonOrigin);
  });

  document.getElementById('close-btn').addEventListener('click', e => triggerExit(e, lessonOrigin));
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href === 'modal-accessibility.html') return; // header-controls.js opens modal
      triggerExit(e, href && href !== '#' ? href : 'dashboard.html');
    });
  });
  const avatarLink = document.querySelector('.avatar-link');
  if (avatarLink) {
    avatarLink.addEventListener('click', e => triggerExit(e, 'profile.html'));
  }

  continueBtn.addEventListener('click', () => {
    globalThis.location.href = 'lesson-fill.html';
  });
})();
