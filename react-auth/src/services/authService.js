// src/services/authService.js

const USERS_KEY = "frontend_auth_users";
const SESSION_KEY = "frontend_auth_session";

const getUsers = () => {
  try {
    const users = localStorage.getItem(USERS_KEY);

    if (!users) {
      return [];
    }

    const parsedUsers = JSON.parse(users);

    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getSession = () => {
  try {
    const session = localStorage.getItem(SESSION_KEY);

    if (!session) {
      return null;
    }

    return JSON.parse(session);
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

const saveSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

const generateId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
};

const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;

  return safeUser;
};

const validateRegistration = ({ name, email, password }) => {
  if (!name?.trim()) {
    throw new Error("Please enter your name.");
  }

  if (!email?.trim()) {
    throw new Error("Please enter your email address.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.trim())) {
    throw new Error("Please enter a valid email address.");
  }

  if (!password) {
    throw new Error("Please enter a password.");
  }

  if (password.length < 8) {
    throw new Error("Password must contain at least 8 characters.");
  }
};

const validateLogin = ({ email, password }) => {
  if (!email?.trim()) {
    throw new Error("Please enter your email address.");
  }

  if (!password) {
    throw new Error("Please enter your password.");
  }
};

export const authService = {
  register({ name, email, password }) {
    validateRegistration({
      name,
      email,
      password,
    });

    const normalizedEmail = email.trim().toLowerCase();

    const users = getUsers();

    const existingUser = users.find(
      (user) => user.email === normalizedEmail
    );

    if (existingUser) {
      throw new Error(
        "An account with this email already exists. Please login instead."
      );
    }

    const newUser = {
      id: generateId(),
      name: name.trim(),
      email: normalizedEmail,

      // DEMO ONLY.
      // Never store plaintext passwords in a real application.
      password,

      role: "USER",
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    saveUsers(users);

    const safeUser = sanitizeUser(newUser);

    saveSession(safeUser);

    return safeUser;
  },

  login({ email, password }) {
    validateLogin({
      email,
      password,
    });

    const normalizedEmail = email.trim().toLowerCase();

    const users = getUsers();

    const user = users.find(
      (item) => item.email === normalizedEmail
    );

    if (!user) {
      throw new Error(
        "No account found with this email address."
      );
    }

    if (user.password !== password) {
      throw new Error("Incorrect password.");
    }

    const safeUser = sanitizeUser(user);

    saveSession(safeUser);

    return safeUser;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser() {
    return getSession();
  },

  isAuthenticated() {
    return Boolean(getSession());
  },

  clearAllData() {
    localStorage.removeItem(USERS_KEY);
    localStorage.removeItem(SESSION_KEY);
  },
};