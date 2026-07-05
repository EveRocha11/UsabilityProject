(() => {
  const emailInput    = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const wrapEmail     = document.getElementById('wrap-email');
  const wrapPassword  = document.getElementById('wrap-password');
  const toggleBtn     = document.getElementById('toggle-password');
  const signInBtn     = document.querySelector('.cta-sign-in');
  const hintEl        = document.querySelector('.login-card .hint');
  const hintOriginal  = hintEl.textContent;

  // Seed demo account + her progress data
  const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
  if (!accounts.some(a => a.email === 'ana@nivela.com')) {
    accounts.push({ email: 'ana@nivela.com', password: 'Test1234', name: 'Ana', lastname: 'García' });
    localStorage.setItem('nivela_accounts', JSON.stringify(accounts));
  }
  if (!localStorage.getItem('nivela_progress_ana@nivela.com')) {
    localStorage.setItem('nivela_progress_ana@nivela.com', JSON.stringify({
      points: 2450, streak: 7, level: 'I2',
      lessonsCompleted: 2, totalLessons: 3,
      badges: 12, accuracy: 94,
      level1Complete: true, dailyChallenges: [true, false, false, false, false],
    }));
  }

  const setError = (wrap) => wrap.classList.add('is-error');
  const clearError = (wrap) => wrap.classList.remove('is-error');

  const showMsg = (msg, isError = true) => {
    hintEl.textContent = msg;
    hintEl.style.color = isError ? '#ef4444' : '';
  };
  const resetHint = () => { hintEl.textContent = hintOriginal; hintEl.style.color = ''; };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const updateBtn = () => {
    signInBtn.classList.toggle('is-active', !!(emailInput.value.trim() && passwordInput.value));
  };

  toggleBtn.addEventListener('click', () => {
    const isText = passwordInput.type === 'text';
    passwordInput.type = isText ? 'password' : 'text';
    toggleBtn.querySelector('.eye-open').style.display   = isText ? 'block' : 'none';
    toggleBtn.querySelector('.eye-closed').style.display = isText ? 'none'  : 'block';
  });

  emailInput.addEventListener('input', ()    => { clearError(wrapEmail);    resetHint(); updateBtn(); });
  passwordInput.addEventListener('input', () => { clearError(wrapPassword); resetHint(); updateBtn(); });

  signInBtn.addEventListener('click', () => {
    const email    = emailInput.value.trim();
    const password = passwordInput.value;

    // Validate fields one at a time, show specific message in hint area
    if (!email) {
      setError(wrapEmail);
      showMsg('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError(wrapEmail);
      showMsg('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setError(wrapPassword);
      showMsg('Please enter your password.');
      return;
    }

    const stored = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
    const match  = stored.find(a => a.email === email && a.password === password);

    if (!match) {
      setError(wrapEmail);
      setError(wrapPassword);
      showMsg('Incorrect email or password. Please try again.');
      return;
    }

    localStorage.setItem('nivela_current_email', email);
    globalThis.location.href = 'dashboard.html';
  });

  [emailInput, passwordInput].forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') signInBtn.click(); });
  });
})();
