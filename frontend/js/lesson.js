(() => {
  // Exercises per level
  const ALL_EXERCISES = {
    1: [
      'Her first name is Anna, nice to meet you.',
      'I have been studying English for two years.',
      'She works at the hospital every morning.',
    ],
    2: [
      'If I had more time, I would study every day.',
      'She would have called you if she had known.',
      'What would you do if you won the lottery?',
    ],
    3: [
      'The report was written by the manager.',
      'English is spoken all over the world.',
      'The cake was eaten before I arrived.',
    ],
    challenge: [
      'Can you repeat that more slowly, please?',
      'I really enjoy learning new languages.',
      'Practice makes perfect, keep going!',
    ],
  };

  const mode     = localStorage.getItem('nivela_lesson_mode') || 'lesson';
  const level    = Number.parseInt(localStorage.getItem('nivela_current_level') || '1', 10);
  const EXERCISES = mode === 'challenge'
    ? ALL_EXERCISES.challenge
    : (ALL_EXERCISES[level] || ALL_EXERCISES[1]);
  const TOTAL    = EXERCISES.length;

  let current       = 0;
  let hasRecorded   = false;
  let recordingTimer = null;

  // Update header avatar from localStorage
  const email    = localStorage.getItem('nivela_current_email');
  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  const user     = accounts.find(a => a.email === email);
  if (user) document.getElementById('header-avatar').textContent = user.name[0].toUpperCase();

  // Elements
  const sentenceBubble  = document.getElementById('sentence-bubble');
  const progressFill    = document.getElementById('lesson-progress-fill');
  const speakBtn        = document.getElementById('speak-btn');
  const speakLabel      = document.getElementById('speak-label');
  const checkBtn        = document.getElementById('check-btn');
  const skipBtn         = document.getElementById('skip-btn');
  const bottomBar       = document.getElementById('bottom-bar');
  const feedbackSection = document.getElementById('feedback-section');
  const feedbackLabel   = document.getElementById('feedback-label');
  const feedbackCard    = document.getElementById('feedback-card');
  const feedbackIcon    = document.getElementById('feedback-icon');
  const feedbackTitle   = document.getElementById('feedback-title');
  const feedbackSub     = document.getElementById('feedback-subtitle');
  const continueBtn     = document.getElementById('continue-btn');
  const speakerIcon     = document.getElementById('speaker-icon');
  const closeBtn        = document.getElementById('close-btn');

  function load() {
    sentenceBubble.textContent = EXERCISES[current];
    hasRecorded = false;
    if (recordingTimer) clearTimeout(recordingTimer);
    speakBtn.dataset.state = 'idle';
    updateSpeakBtn();
    checkBtn.disabled = true;
    bottomBar.style.display = '';
    feedbackSection.style.display = 'none';
    progressFill.style.width = Math.round((current / TOTAL) * 100) + '%';
  }

  function updateSpeakBtn() {
    const s = speakBtn.dataset.state;
    let label = 'CLICK TO SPEAK';
    if (s === 'recording') label = 'RECORDING...';
    else if (s === 'done') label = 'RECORDED ✓';
    speakLabel.textContent = label;
    speakBtn.classList.toggle('is-recording', s === 'recording');
    speakBtn.classList.toggle('is-done',      s === 'done');
  }

  // Speaker icon: TTS via Web Speech API
  speakerIcon.addEventListener('click', () => {
    if ('speechSynthesis' in globalThis) {
      globalThis.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(EXERCISES[current]);
      utt.lang = 'en-US';
      globalThis.speechSynthesis.speak(utt);
    }
  });

  // Mic button: simulate recording cycle
  speakBtn.addEventListener('click', () => {
    const s = speakBtn.dataset.state;
    if (s === 'idle') {
      speakBtn.dataset.state = 'recording';
      updateSpeakBtn();
      recordingTimer = setTimeout(() => {
        speakBtn.dataset.state = 'done';
        updateSpeakBtn();
        hasRecorded = true;
        checkBtn.disabled = false;
      }, 2500);
    } else if (s === 'recording') {
      clearTimeout(recordingTimer);
      speakBtn.dataset.state = 'done';
      updateSpeakBtn();
      hasRecorded = true;
      checkBtn.disabled = false;
    } else {
      speakBtn.dataset.state = 'idle';
      updateSpeakBtn();
      hasRecorded = false;
      checkBtn.disabled = true;
    }
  });

  skipBtn.addEventListener('click', () => showFeedback('skip'));
  checkBtn.addEventListener('click', () => { if (hasRecorded) showFeedback('correct'); });

  function showFeedback(type) {
    bottomBar.style.display = 'none';
    feedbackSection.style.display = '';
    feedbackSection.dataset.type = type;

    if (type === 'correct') {
      feedbackLabel.textContent = 'Feedback';
      feedbackTitle.textContent = 'Great job, you did well';
      feedbackSub.textContent   = 'Keep going';
      feedbackIcon.src          = '../assets/img/icon-check-circle.svg';
      feedbackCard.dataset.type = 'correct';
    } else {
      feedbackLabel.textContent = 'Skipped';
      feedbackTitle.textContent = 'No worries, practice when you can';
      feedbackSub.textContent   = 'You can always replay this exercise later';
      feedbackIcon.src          = '../assets/img/icon-close.svg';
      feedbackCard.dataset.type = 'skip';
    }
  }

  continueBtn.addEventListener('click', () => {
    current++;
    if (current >= TOTAL) {
      globalThis.location.href = 'lesson-complete.html';
    } else {
      load();
    }
  });

  closeBtn.addEventListener('click', () => {
    globalThis.location.href = 'dashboard.html';
  });

  load();
})();
