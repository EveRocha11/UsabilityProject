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
    ? EXERCISE_DATA.challenge.dialogue
    : EXERCISE_DATA[`b${block}`][`l${level}`].dialogue;

  document.getElementById('dialogue-instruction').textContent = data.instruction;

  const chars       = data.characters;
  const lines       = data.lines;
  const progressFill= document.getElementById('lesson-progress-fill');
  const charsRow    = document.getElementById('dialogue-chars-row');
  const chatEl      = document.getElementById('dialogue-chat');
  const choicesEl   = document.getElementById('dialogue-choices');
  const continueBtn = document.getElementById('continue-btn');

  // Render character legend
  chars.forEach((name, i) => {
    const pill = document.createElement('div');
    pill.className = 'dialogue-char-pill';
    pill.innerHTML = `<span class="dialogue-char-avatar av-${i}">${name[0]}</span>${name}`;
    charsRow.appendChild(pill);
  });

  let lineIdx = 0;
  const totalChoice = lines.filter(l => l.isChoice).length;
  let choicesDone   = 0;

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

  function updateProgress() {
    const base  = 66;
    const range = 34;
    const pct   = base + Math.round((choicesDone / Math.max(totalChoice, 1)) * range);
    progressFill.style.width = pct + '%';
  }
  updateProgress();

  // Which side a character goes on: char 0 = left, others = right
  function isRight(charIdx) {
    return charIdx !== 0;
  }

  function addBubble(charIdx, htmlContent) {
    const row = document.createElement('div');
    row.className = `dialogue-bubble-row${isRight(charIdx) ? ' row-right' : ''}`;

    const av = document.createElement('div');
    av.className = `dialogue-bubble-av av-${charIdx}`;
    av.textContent = chars[charIdx][0];

    const bubble = document.createElement('div');
    bubble.className = 'dialogue-bubble';
    bubble.innerHTML = htmlContent;

    row.appendChild(av);
    row.appendChild(bubble);
    chatEl.appendChild(row);
    chatEl.scrollTop = chatEl.scrollHeight;
  }

  function advanceLine() {
    if (lineIdx >= lines.length) {
      choicesEl.style.display = 'none';
      progressFill.style.width = '100%';
      continueBtn.style.display = '';
      return;
    }

    const line = lines[lineIdx];

    if (line.isChoice) {
      const displayed = escapeHtml(line.text).replaceAll('{blank}', '<span class="bubble-chosen">___</span>');
      addBubble(line.char, displayed);
      showChoices(line);
    } else {
      addBubble(line.char, escapeHtml(line.text));
      lineIdx++;
      setTimeout(advanceLine, 600);
    }
  }

  function showChoices(line) {
    choicesEl.innerHTML = '';
    choicesEl.style.display = '';

    line.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'dialogue-choice-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleChoice(btn, i, line, opt));
      choicesEl.appendChild(btn);
    });
  }

  function handleChoice(btn, idx, line, text) {
    const allBtns = choicesEl.querySelectorAll('.dialogue-choice-btn');

    if (idx === line.answer) {
      btn.classList.add('is-correct');
      allBtns.forEach(b => { b.disabled = true; });

      // Replace last bubble's blank with the chosen text
      const lastBubble = chatEl.lastElementChild.querySelector('.dialogue-bubble');
      if (lastBubble) {
        const filled = escapeHtml(line.text).replaceAll('{blank}', `<span class="bubble-chosen">${escapeHtml(text)}</span>`);
        lastBubble.innerHTML = filled;
      }

      choicesDone++;
      updateProgress();
      lineIdx++;

      setTimeout(() => {
        choicesEl.style.display = 'none';
        advanceLine();
      }, 500);
    } else {
      btn.classList.add('is-wrong');
      registerWrong();
      setTimeout(() => btn.classList.remove('is-wrong'), 600);
    }
  }

  function escapeHtml(str) {
    return str
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;');
  }

  continueBtn.addEventListener('click', () => {
    globalThis.location.href = 'lesson-complete.html';
  });

  function triggerExit(e, destination) {
    if (e) e.preventDefault();
    localStorage.setItem('nivela_exit_return', 'lesson-dialogue.html');
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
      if (href === 'modal-accessibility.html') return;
      triggerExit(e, href && href !== '#' ? href : 'dashboard.html');
    });
  });
  const avatarLink = document.querySelector('.avatar-link');
  if (avatarLink) {
    avatarLink.addEventListener('click', e => triggerExit(e, 'profile.html'));
  }

  // Start conversation
  setTimeout(advanceLine, 300);
})();
