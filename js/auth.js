/* =====================================================
   ZYMOMAX — Auth (Login / Register / Account)
   Uses localStorage for user management
   ===================================================== */

const AUTH_KEY = 'zym_users';
const SESSION_KEY = 'zym_session';

/* ---- User DB helpers ---- */
function getUsers() { return JSON.parse(localStorage.getItem(AUTH_KEY) || '[]'); }
function saveUsers(users) { localStorage.setItem(AUTH_KEY, JSON.stringify(users)); }
function getSession() { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
function saveSession(user) { localStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
function clearSession() { localStorage.removeItem(SESSION_KEY); }
function isLoggedIn() { return !!getSession(); }
window.isLoggedIn = isLoggedIn;
window.getSession = getSession;

/* ---- Update nav based on auth state ---- */
function updateAuthNav() {
  const session = getSession();
  const navActions = document.querySelector('.nav-actions');
  if (!navActions) return;
  const loginBtn = navActions.querySelector('#nav-login-btn');
  const accountBtn = navActions.querySelector('#nav-account-btn');
  if (session) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (accountBtn) { accountBtn.style.display = 'flex'; accountBtn.textContent = '👤 ' + session.name.split(' ')[0]; }
  } else {
    if (loginBtn) loginBtn.style.display = '';
    if (accountBtn) accountBtn.style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', updateAuthNav);

/* ---- Register ---- */
function registerUser(name, email, phone, password) {
  const users = getUsers();
  if (users.find(u => u.email === email)) return { ok: false, msg: 'Email already registered.' };
  const user = { id: 'u_' + Date.now(), name, email, phone, password: btoa(password), orders: [], addresses: [], createdAt: new Date().toISOString() };
  users.push(user);
  saveUsers(users);
  saveSession({ id: user.id, name, email, phone });
  return { ok: true };
}
window.registerUser = registerUser;

/* ---- Login ---- */
function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === btoa(password));
  if (!user) return { ok: false, msg: 'Invalid email or password.' };
  saveSession({ id: user.id, name: user.name, email: user.email, phone: user.phone });
  return { ok: true };
}
window.loginUser = loginUser;

/* ---- Logout ---- */
function logoutUser() {
  clearSession();
  window.location.href = 'index.html';
}
window.logoutUser = logoutUser;

/* ---- Get current user full profile ---- */
function getCurrentUserFull() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find(u => u.id === session.id) || null;
}
window.getCurrentUserFull = getCurrentUserFull;

/* ---- Update user profile ---- */
function updateUserProfile(updates) {
  const session = getSession();
  if (!session) return false;
  const users = getUsers();
  const idx = users.findIndex(u => u.id === session.id);
  if (idx < 0) return false;
  Object.assign(users[idx], updates);
  saveUsers(users);
  // Update session name/phone if changed
  if (updates.name || updates.phone) {
    saveSession({ ...session, name: updates.name || session.name, phone: updates.phone || session.phone });
  }
  return true;
}
window.updateUserProfile = updateUserProfile;

/* ---- Save Order to User ---- */
function saveOrderToUser(order) {
  const session = getSession();
  if (!session) return;
  const users = getUsers();
  const user = users.find(u => u.id === session.id);
  if (!user) return;
  if (!user.orders) user.orders = [];
  user.orders.unshift(order);
  saveUsers(users);
}
window.saveOrderToUser = saveOrderToUser;

/* ---- Auth Page Logic (login.html) ---- */
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const tabBtns = document.querySelectorAll('.auth-tab-btn');

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      const targetTab = document.getElementById(tab + '-tab');
      if (targetTab) targetTab.classList.add('active');
    });
  });

  // Login form submit
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const result = loginUser(email, password);
      if (result.ok) {
        showToast('Welcome back! Redirecting...', 'success');
        setTimeout(() => { window.location.href = 'account.html'; }, 1200);
      } else {
        showToast(result.msg, 'error');
      }
    });
  }

  // Register form submit
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const phone = document.getElementById('reg-phone').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirm = document.getElementById('reg-confirm').value;
      if (password !== confirm) { showToast('Passwords do not match.', 'error'); return; }
      if (password.length < 6) { showToast('Password must be at least 6 characters.', 'error'); return; }
      const result = registerUser(name, email, phone, password);
      if (result.ok) {
        showToast('Account created! Welcome to Zymomax!', 'success');
        setTimeout(() => { window.location.href = 'account.html'; }, 1200);
      } else {
        showToast(result.msg, 'error');
      }
    });
  }

  // If already logged in, redirect
  if ((loginForm || registerForm) && isLoggedIn()) {
    window.location.href = 'account.html';
  }
});
