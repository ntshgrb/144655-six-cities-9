const USER_EMAIL = 'email';

export const getUserEmail = (): string => {
  const email = localStorage.getItem(USER_EMAIL);
  return email ?? '';
};

export const saveUserEmail = (email: string): void => {
  localStorage.setItem(USER_EMAIL, email);
};
