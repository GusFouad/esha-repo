/* ── app.js — Login page logic ── */

const form        = document.getElementById('loginForm');
const emailInput  = document.getElementById('email');
const passInput   = document.getElementById('password');
const emailError  = document.getElementById('emailError');
const passError   = document.getElementById('passwordError');
const submitBtn   = document.getElementById('submitBtn');
const btnLoader   = document.getElementById('btnLoader');
const successMsg  = document.getElementById('successMsg');
const toggleBtn   = document.getElementById('togglePassword');
const eyeIcon     = document.getElementById('eyeIcon');

/* ── Toggle password visibility ── */
toggleBtn.addEventListener('click', () => {
  const isPassword = passInput.type === 'password';
  passInput.type = isPassword ? 'text' : 'password';
  eyeIcon.innerHTML = isPassword
    ? /* eye-off */
      `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
       <line x1="1" y1="1" x2="23" y2="23"/>`
    : /* eye */
      `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
       <circle cx="12" cy="12" r="3"/>`;
});

/* ── Validation helpers ── */
function isValidEmail(val) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
}

function showError(input, errorEl, msg) {
  input.classList.add('input-error');
  errorEl.textContent = msg;
}

function clearError(input, errorEl) {
  input.classList.remove('input-error');
  errorEl.textContent = '';
}

/* Live validation on blur */
emailInput.addEventListener('blur', () => {
  if (!emailInput.value.trim()) {
    showError(emailInput, emailError, 'Email is required.');
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
  } else {
    clearError(emailInput, emailError);
  }
});

passInput.addEventListener('blur', () => {
  if (!passInput.value) {
    showError(passInput, passError, 'Password is required.');
  } else if (passInput.value.length < 6) {
    showError(passInput, passError, 'Password must be at least 6 characters.');
  } else {
    clearError(passInput, passError);
  }
});

/* Clear errors on input */
emailInput.addEventListener('input', () => clearError(emailInput, emailError));
passInput.addEventListener('input',  () => clearError(passInput,  passError));

/* ── Form submit ── */
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;

  if (!emailInput.value.trim()) {
    showError(emailInput, emailError, 'Email is required.');
    valid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, emailError, 'Please enter a valid email address.');
    valid = false;
  }

  if (!passInput.value) {
    showError(passInput, passError, 'Password is required.');
    valid = false;
  } else if (passInput.value.length < 6) {
    showError(passInput, passError, 'Password must be at least 6 characters.');
    valid = false;
  }

  if (!valid) return;

  /* Simulate async login */
  submitBtn.disabled = true;
  btnLoader.classList.add('visible');

  setTimeout(() => {
    btnLoader.classList.remove('visible');
    submitBtn.disabled = false;
    successMsg.classList.remove('hidden');
    form.reset();
  }, 1800);
});

