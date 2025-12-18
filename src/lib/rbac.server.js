
// src/lib/rbac.server.js

export function isAdmin(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('admin');
}

export function isManager(session) {
  const roles = session?.user?.roles || [];
  return roles.includes('manager');
}

export function canCreateUsers(session) {
  return isAdmin(session) || isManager(session);
}

export function canEditUsers(session) {
  return isAdmin(session);
}

export function canChangeRoles(session) {
  return isAdmin(session);
}
