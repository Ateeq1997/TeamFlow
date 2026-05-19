type BackendUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
};

const users: BackendUser[] = [
  {
    id: "u-1",
    name: "Avery Stone",
    email: "demo@teamflow.dev",
    password: "demo123",
    avatar: "AS",
  },
];

const otpStore = new Map<string, string>();

function token() {
  return `tk_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function loginUser(email: string, password: string) {
  const normalized = normalizeEmail(email);
  const user = users.find((u) => u.email === normalized && u.password === password);
  if (!user) {
    return { ok: false as const, message: "Invalid email or password" };
  }

  return {
    ok: true as const,
    user: { name: user.name, email: user.email, avatar: user.avatar },
    token: token(),
  };
}

export function signupUser(name: string, email: string, password: string) {
  const normalized = normalizeEmail(email);
  if (users.some((u) => u.email === normalized)) {
    return { ok: false as const, message: "User already exists" };
  }

  users.push({
    id: `u-${users.length + 1}`,
    name,
    email: normalized,
    password,
    avatar: name.slice(0, 2).toUpperCase() || "US",
  });

  return { ok: true as const, message: "Account created" };
}

export function createOtp(email: string) {
  const normalized = normalizeEmail(email);
  const existingUser = users.some((u) => u.email === normalized);
  if (!existingUser) {
    return { ok: false as const, message: "Email not found" };
  }

  const otp = "123456";
  otpStore.set(normalized, otp);
  return { ok: true as const, otp, message: "OTP sent" };
}

export function verifyOtp(email: string, otp: string) {
  const normalized = normalizeEmail(email);
  const storedOtp = otpStore.get(normalized);

  if (!storedOtp || storedOtp !== otp) {
    return { ok: false as const, message: "Invalid OTP" };
  }

  otpStore.delete(normalized);
  return { ok: true as const, message: "OTP verified" };
}
