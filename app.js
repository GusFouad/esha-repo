/* app.js — login form interactions */

(function () {
  'use strict';

  const form       = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const pwInput    = document.getElementById('password');
  const emailErr   = document.getElementById('emailError');
  const pwErr      = document.getElementById('passwordError');
  const submitBtn  = document.getElementById('submitBtn');
  const spinner    = document.getElementById('spinner');
  const btnText    = submitBtn.querySelector('.btn-text');
  const togglePw   = document.getElementById('togglePw');
  const eyeIcon    = document.getElementById('eyeIcon');

  /* ── Password visibility toggle ── */
  const eyeOpen = `
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>`;
  const eyeOff = `
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
             a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
             a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>`;

  togglePw.addEventListener('click', () => {
    const isText = pwInput.type === 'text';
    pwInput.type = isText ? 'password' : 'text';
    eyeIcon.innerHTML = isText ? eyeOpen : eyeOff;
    togglePw.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
  });

  /* ── Validation helpers ── */
  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  function clearError(input, errEl) {
    input.classList.remove('invalid');
    errEl.textContent = '';
  }

  function showError(input, errEl, msg) {
    input.classList.add('invalid');
    errEl.textContent = msg;
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      showError(emailInput, emailErr, 'Email address is required.');
      return false;
    }
    if (!isValidEmail(val)) {
      showError(emailInput, emailErr, 'Please enter a valid email address.');
      return false;
    }
    clearError(emailInput, emailErr);
    return true;
  }

  function validatePassword() {
    const val = pwInput.value;
    if (!val) {
      showError(pwInput, pwErr, 'Password is required.');
      return false;
    }
    if (val.length < 6) {
      showError(pwInput, pwErr, 'Password must be at least 6 characters.');
      return false;
    }
    clearError(pwInput, pwErr);
    return true;
  }

  /* Live validation on blur */
  emailInput.addEventListener('blur', validateEmail);
  pwInput.addEventListener('blur', validatePassword);
  emailInput.addEventListener('input', () => clearError(emailInput, emailErr));
  pwInput.addEventListener('input', () => clearError(pwInput, pwErr));

  /* ── Form submit ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailOk = validateEmail();
    const pwOk    = validatePassword();
    if (!emailOk || !pwOk) return;

    /* Show loading state */
    submitBtn.disabled = true;
    btnText.textContent = 'Signing in…';
    spinner.hidden = false;

    /* Simulate async auth (replace with real fetch) */
    await new Promise(r => setTimeout(r, 1800));

    spinner.hidden = true;
    submitBtn.disabled = false;
    btnText.textContent = 'Sign In';

    /* Show success banner */
    let successEl = document.getElementById('successMsg');
    if (!successEl) {
      successEl = document.createElement('p');
      successEl.id = 'successMsg';
      successEl.className = 'success-msg';
      successEl.textContent = '✓ Signed in successfully! Redirecting…';
      form.before(successEl);
    }
    successEl.style.display = 'block';

    /* Animate dots on panel */
    const dots = document.querySelectorAll('.dot');
    let i = 0;
    const dotInterval = setInterval(() => {
      dots.forEach(d => d.classList.remove('active'));
      dots[i % dots.length].classList.add('active');
      i++;
    }, 500);
    setTimeout(() => clearInterval(dotInterval), 3000);
  });
})();

