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

  const setError = (wrap, errSpan, msg) => {
    wrap.classList.add('is-error');
    errSpan.textContent = msg;
    errSpan.classList.add('visible');
  };

  const clearError = (wrap, errSpan) => {
    wrap.classList.remove('is-error');
    errSpan.classList.remove('visible');
  };

  const setPasswordError = () => {
    wrapPassword.classList.add('is-error');
    passwordHint.style.color = '#ef4444';
  };

  const clearPasswordError = () => {
    wrapPassword.classList.remove('is-error');
    passwordHint.style.color = '';
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
    inp.addEventListener('input', () => { clearError(wrap, err); updateBtn(); });
  });
  passwordInput.addEventListener('input', () => { clearPasswordError(); updateBtn(); });

  continueBtn.addEventListener('click', () => {
    let valid = true;

    if (!nameInput.value.trim()) {
      setError(wrapName, errName, 'Name is required'); valid = false;
    }
    if (!lastnameInput.value.trim()) {
      setError(wrapLastname, errLastname, 'Lastname is required'); valid = false;
    }
    if (!emailInput.value.trim()) {
      setError(wrapEmail, errEmail, 'Email is required'); valid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      setError(wrapEmail, errEmail, 'Enter a valid email address'); valid = false;
    }
    if (!passwordInput.value || !validatePassword(passwordInput.value)) {
      setPasswordError(); valid = false;
    }
    if (!confirmInput.value) {
      setError(wrapConfirm, errConfirm, 'Please confirm your password'); valid = false;
    } else if (confirmInput.value !== passwordInput.value) {
      setError(wrapConfirm, errConfirm, 'Passwords do not match'); valid = false;
    }

    if (!valid) return;

    const accounts = JSON.parse(localStorage.getItem('nivela_accounts') || '[]');
    if (accounts.some(a => a.email === emailInput.value.trim())) {
      setError(wrapEmail, errEmail, 'This email is already registered'); return;
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
