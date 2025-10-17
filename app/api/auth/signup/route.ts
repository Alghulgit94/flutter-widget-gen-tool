import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { hashPassword, generateToken, setAuthCookie, isValidEmail, isValidPassword } from "@/lib/auth"
import type { User, UserWithPassword } from "@/lib/auth-types"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password
    const passwordValidation = isValidPassword(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { success: false, error: passwordValidation.error },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUsers = await query<UserWithPassword>(
      "SELECT * FROM users WHERE email = $1",
      [email.toLowerCase()]
    )

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Insert new user
    const newUsers = await query<User>(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at, updated_at`,
      [name, email.toLowerCase(), passwordHash]
    )

    const user = newUsers[0]

    // Generate JWT token
    const token = await generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    })

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("[signup] Error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    )
  }
}
