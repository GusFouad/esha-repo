// ── DOM References ──
const form         = document.getElementById('loginForm');
const emailInput   = document.getElementById('email');
const passwordInput= document.getElementById('password');
const emailError   = document.getElementById('emailError');
const passwordError= document.getElementById('passwordError');
const loginBtn     = document.getElementById('loginBtn');
const btnSpinner   = document.getElementById('btnSpinner');
const btnText      = loginBtn.querySelector('.btn-text');
const toggleBtn    = document.getElementById('togglePassword');
const eyeIcon      = document.getElementById('eyeIcon');
const successMsg   = document.getElementById('successMsg');

// ── Password Visibility Toggle ──
toggleBtn.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

  // Swap eye icon
  eyeIcon.innerHTML = isPassword
    ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
       <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
       <line x1="1" y1="1" x2="23" y2="23"/>`
    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
       <circle cx="12" cy="12" r="3"/>`;
});

// ── Validation Helpers ──
function validateEmail(value) {
  if (!value.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
  return '';
}

function validatePassword(value) {
  if (!value) return 'Password is required.';
  if (value.length < 6) return 'Password must be at least 6 characters.';
  return '';
}

function setFieldState(input, errorEl, message) {
  if (message) {
    input.classList.add('invalid');
    errorEl.textContent = message;
  } else {
    input.classList.remove('invalid');
    errorEl.textContent = '';
  }
}

// Live validation on blur
emailInput.addEventListener('blur', () => {
  setFieldState(emailInput, emailError, validateEmail(emailInput.value));
});

passwordInput.addEventListener('blur', () => {
  setFieldState(passwordInput, passwordError, validatePassword(passwordInput.value));
});

// Clear error on input
emailInput.addEventListener('input', () => {
  if (emailInput.classList.contains('invalid')) {
    setFieldState(emailInput, emailError, validateEmail(emailInput.value));
  }
});

passwordInput.addEventListener('input', () => {
  if (passwordInput.classList.contains('invalid')) {
    setFieldState(passwordInput, passwordError, validatePassword(passwordInput.value));
  }
});

// ── Form Submit ──
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailMsg    = validateEmail(emailInput.value);
  const passwordMsg = validatePassword(passwordInput.value);

  setFieldState(emailInput,    emailError,    emailMsg);
  setFieldState(passwordInput, passwordError, passwordMsg);

  if (emailMsg || passwordMsg) return;

  // Show loading state
  loginBtn.disabled  = true;
  btnText.textContent = 'Signing in…';
  btnSpinner.hidden  = false;

  // Simulate async auth (replace with real API call)
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Show success
  form.hidden        = true;
  successMsg.hidden  = false;

  // Reset after demo
  setTimeout(() => {
    form.hidden        = false;
    successMsg.hidden  = true;
    loginBtn.disabled  = false;
    btnText.textContent = 'Sign In';
    btnSpinner.hidden  = true;
    form.reset();
    emailInput.classList.remove('invalid');
    passwordInput.classList.remove('invalid');
    emailError.textContent    = '';
    passwordError.textContent = '';
  }, 3000);
});

