(() => {
  const nameInput     = document.getElementById('signup-name');
  const lastnameInput = document.getElementById('signup-lastname');
  const emailInput    = document.getElementById('signup-email');
  const passwordInput = document.getElementById('signup-password');
  const confirmInput  = document.getElementById('signup-confirm');

  const wrapName     = document.getElementById('wrap-name');
  const wrapLastname = document.getElementById('wrap-lastname');
  const wrapEmail    = document.getElementById('wrap-email');
  const wrapPassword = document.getElementById('wrap-password');
  const wrapConfirm  = document.getElementById('wrap-confirm');

  const errName      = document.getElementById('err-name');
  const errLastname  = document.getElementById('err-lastname');
  const errEmail     = document.getElementById('err-email');
  const errConfirm   = document.getElementById('err-confirm');
  const passwordHint = document.getElementById('password-hint');

  const continueBtn    = document.querySelector('.cta-continue');
  const togglePassword = document.getElementById('toggle-password');
  const toggleConfirm  = document.getElementById('toggle-confirm');

  // WCAG 4.1.3 — aria-invalid comunica errores a tecnologías asistivas
  const setError = (wrap, errSpan, msg, inp) => {
    wrap.classList.add('is-error');
    errSpan.textContent = msg;
    errSpan.classList.add('visible');
    if (inp) inp.setAttribute('aria-invalid', 'true');
  };

  const clearError = (wrap, errSpan, inp) => {
    wrap.classList.remove('is-error');
    errSpan.classList.remove('visible');
    if (inp) inp.setAttribute('aria-invalid', 'false');
  };

  const setPasswordError = () => {
    wrapPassword.classList.add('is-error');
    passwordHint.style.color = '#ef4444';
    passwordInput.setAttribute('aria-invalid', 'true');
  };

  const clearPasswordError = () => {
    wrapPassword.classList.remove('is-error');
    passwordHint.style.color = '';
    passwordInput.setAttribute('aria-invalid', 'false');
  };

  const validateEmail    = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pass)  => pass.length >= 8 && /[A-Z]/.test(pass) && /\d/.test(pass);

  const makeToggle = (btn, input) => {
    btn.addEventListener('click', () => {
      const isText = input.type === 'text';
      input.type = isText ? 'password' : 'text';
      btn.querySelector('.eye-open').style.display   = isText ? 'block' : 'none';
      btn.querySelector('.eye-closed').style.display = isText ? 'none'  : 'block';
    });
  };

  makeToggle(togglePassword, passwordInput);
  makeToggle(toggleConfirm,  confirmInput);

  const updateBtn = () => {
    const filled = nameInput.value.trim() &&
                   lastnameInput.value.trim() &&
                   emailInput.value.trim() &&
                   passwordInput.value &&
                   confirmInput.value;
    continueBtn.classList.toggle('is-active', !!filled);
  };

  // Clear errors while typing
  const pairs = [
    [nameInput,     wrapName,     errName],
    [lastnameInput, wrapLastname, errLastname],
    [emailInput,    wrapEmail,    errEmail],
    [confirmInput,  wrapConfirm,  errConfirm],
  ];
  pairs.forEach(([inp, wrap, err]) => {
    inp.addEventListener('input', () => { clearError(wrap, err, inp); updateBtn(); });
  });
  passwordInput.addEventListener('input', () => { clearPasswordError(); updateBtn(); });

  continueBtn.addEventListener('click', () => {
    let valid = true;
    let firstInvalidInput = null;

    if (!nameInput.value.trim()) {
      setError(wrapName, errName, 'Name is required', nameInput); valid = false;
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    }
    if (!lastnameInput.value.trim()) {
      setError(wrapLastname, errLastname, 'Lastname is required', lastnameInput); valid = false;
      if (!firstInvalidInput) firstInvalidInput = lastnameInput;
    }
    if (!emailInput.value.trim()) {
      setError(wrapEmail, errEmail, 'Email is required', emailInput); valid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(wrapEmail, errEmail, 'Enter a valid email address', emailInput); valid = false;
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    }
    if (!passwordInput.value || !validatePassword(passwordInput.value)) {
      setPasswordError(); valid = false;
      if (!firstInvalidInput) firstInvalidInput = passwordInput;
    }
    if (!confirmInput.value) {
      setError(wrapConfirm, errConfirm, 'Please confirm your password', confirmInput); valid = false;
      if (!firstInvalidInput) firstInvalidInput = confirmInput;
    } else if (confirmInput.value !== passwordInput.value) {
      setError(wrapConfirm, errConfirm, 'Passwords do not match', confirmInput); valid = false;
      if (!firstInvalidInput) firstInvalidInput = confirmInput;
    }

    if (!valid) {
      if (firstInvalidInput) firstInvalidInput.focus();
      return;
    }

    const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
    if (accounts.some(a => a.email === emailInput.value.trim())) {
      setError(wrapEmail, errEmail, 'This email is already registered', emailInput); 
      emailInput.focus();
      return;
    }

    accounts.push({
      email:    emailInput.value.trim(),
      password: passwordInput.value,
      name:     nameInput.value.trim(),
      lastname: lastnameInput.value.trim(),
    });
    localStorage.setItem('nivela_accounts', JSON.stringify(accounts));
    localStorage.setItem('nivela_current_email', emailInput.value.trim());
    globalThis.location.href = 'dashboard.html';
  });

  confirmInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') continueBtn.click();
  });
})();
