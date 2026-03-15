export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('coursehub-token');
}

export function clearToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('coursehub-token');
}

export function isLoggedIn() {
  return Boolean(getToken());
}
