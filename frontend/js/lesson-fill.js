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
    ? EXERCISE_DATA.challenge.fill
    : EXERCISE_DATA[`b${block}`][`l${level}`].fill;

  document.getElementById('fill-instruction').textContent = data.instruction;
  document.getElementById('fill-image-desc').textContent  = data.imageDesc;

  const sentences    = data.sentences;
  const total        = sentences.length;
  const progressFill = document.getElementById('lesson-progress-fill');
  const counterEl    = document.getElementById('fill-counter');
  const beforeEl     = document.getElementById('fill-before');
  const blankEl      = document.getElementById('fill-blank');
  const afterEl      = document.getElementById('fill-after');
  const optionsEl    = document.getElementById('fill-options');
  const checkBtn     = document.getElementById('check-btn');
  const skipBtn      = document.getElementById('skip-btn');
  const bottomBar    = document.getElementById('bottom-bar');
  const feedbackSec  = document.getElementById('feedback-section');
  const feedbackCard = document.getElementById('feedback-card');
  const feedbackLbl  = document.getElementById('feedback-label');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackTitle= document.getElementById('feedback-title');
  const feedbackSub  = document.getElementById('feedback-subtitle');
  const nextBtn      = document.getElementById('next-btn');

  let currentIdx  = 0;
  let selectedOpt = null;

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

  function updateProgress(idx) {
    const base = 33;
    const range = 33;
    const pct = base + Math.round((idx / total) * range);
    progressFill.style.width = pct + '%';
  }

  function renderSentence(idx) {
    const s = sentences[idx];
    counterEl.textContent = `${idx + 1} / ${total}`;
    updateProgress(idx);

    beforeEl.textContent = s.before ? s.before + ' ' : '';
    afterEl.textContent  = s.after  ? ' ' + s.after  : '';
    blankEl.textContent  = '_______';
    blankEl.className    = 'fill-blank';

    optionsEl.innerHTML = '';
    selectedOpt = null;
    checkBtn.disabled = true;

    s.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'fill-option-btn';
      btn.textContent = opt;
      btn.dataset.optIdx = String(i);
      btn.addEventListener('click', () => selectOption(btn, opt, i));
      optionsEl.appendChild(btn);
    });

    hideFeedback();
  }

  function selectOption(btn, text, idx) {
    document.querySelectorAll('.fill-option-btn').forEach(b => b.classList.remove('is-selected'));
    btn.classList.add('is-selected');
    blankEl.textContent = text;
    blankEl.classList.add('is-filled');
    selectedOpt = idx;
    checkBtn.disabled = false;
  }

  function showFeedback(correct, correctText) {
    if (!correct) registerWrong();
    bottomBar.style.display = 'none';
    feedbackSec.style.display = '';

    if (correct) {
      delete feedbackSec.dataset.type;
      delete feedbackCard.dataset.type;
      feedbackLbl.textContent   = 'Feedback';
      feedbackLbl.style.color   = '';
      feedbackTitle.textContent = 'Correct!';
      feedbackSub.textContent   = 'Keep going!';
      feedbackIcon.src          = '../assets/img/icon-check-circle.svg';
      blankEl.classList.remove('is-filled');
      blankEl.classList.add('is-correct');
      document.querySelectorAll('.fill-option-btn').forEach(b => {
        b.disabled = true;
        if (Number.parseInt(b.dataset.optIdx, 10) === sentences[currentIdx].answer) {
          b.classList.add('is-correct');
        }
      });
    } else {
      feedbackSec.dataset.type  = 'wrong';
      feedbackCard.dataset.type = 'wrong';
      feedbackLbl.textContent   = 'Feedback';
      feedbackLbl.style.color   = '#dc2626';
      feedbackTitle.textContent = 'Not quite!';
      feedbackSub.textContent   = `Correct answer: ${correctText}`;
      feedbackIcon.src          = '../assets/img/icon-close.svg';
      blankEl.classList.remove('is-filled');
      blankEl.classList.add('is-wrong');
      document.querySelectorAll('.fill-option-btn').forEach(b => {
        b.disabled = true;
        const i = Number.parseInt(b.dataset.optIdx, 10);
        if (i === sentences[currentIdx].answer) b.classList.add('is-correct');
        else if (i === selectedOpt) b.classList.add('is-wrong');
      });
    }

    nextBtn.textContent = currentIdx + 1 < total ? 'NEXT' : 'CONTINUE';
  }

  function hideFeedback() {
    feedbackSec.style.display = 'none';
    bottomBar.style.display   = '';
    delete feedbackSec.dataset.type;
    delete feedbackCard.dataset.type;
  }

  checkBtn.addEventListener('click', () => {
    if (selectedOpt === null) return;
    const s       = sentences[currentIdx];
    const correct = selectedOpt === s.answer;
    showFeedback(correct, s.options[s.answer]);
  });

  skipBtn.addEventListener('click', () => {
    const s = sentences[currentIdx];
    showFeedback(false, s.options[s.answer]);
  });

  nextBtn.addEventListener('click', () => {
    currentIdx++;
    if (currentIdx < total) {
      renderSentence(currentIdx);
    } else {
      progressFill.style.width = '66%';
      globalThis.location.href = 'lesson-dialogue.html';
    }
  });

  function triggerExit(e, destination) {
    if (e) e.preventDefault();
    localStorage.setItem('nivela_exit_return', 'lesson-fill.html');
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
      triggerExit(e, href && href !== '#' ? href : 'dashboard.html');
    });
  });

  renderSentence(0);
})();
