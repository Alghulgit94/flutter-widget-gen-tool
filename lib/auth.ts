import bcrypt from "bcrypt"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { SessionPayload } from "./auth-types"

const JWT_SECRET = process.env.JWT_SECRET || "default-secret-change-in-production"
const secret = new TextEncoder().encode(JWT_SECRET)

const SALT_ROUNDS = 12 // Industry standard for bcrypt

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

// Password verification
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// Generate JWT token
export async function generateToken(payload: SessionPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Token expires in 7 days
    .sign(secret)

  return token
}

// Verify JWT token
export async function verifyToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as SessionPayload
  } catch (error) {
    console.error("[auth] Token verification failed:", error)
    return null
  }
}

// Set authentication cookie
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

// Get authentication cookie
export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")?.value
}

// Clear authentication cookie
export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

// Get current user from request
export async function getCurrentUser(): Promise<SessionPayload | null> {
  const token = await getAuthCookie()

  if (!token) {
    return null
  }

  return verifyToken(token)
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation
export function isValidPassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" }
  }

  return { valid: true }
}
