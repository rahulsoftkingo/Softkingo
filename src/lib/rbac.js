// src/lib/rbac.js
export function hasRole(user, role) {
  if (!user || !user.roles) return false;
  return user.roles.includes(role);
}

export function hasAnyRole(user, rolesArray = []) {
  if (!user || !user.roles) return false;
  return rolesArray.some((r) => user.roles.includes(r));
}
