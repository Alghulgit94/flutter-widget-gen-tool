import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { verifyPassword, generateToken, setAuthCookie, isValidEmail } from "@/lib/auth"
import type { UserWithPassword } from "@/lib/auth-types"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Missing email or password" },
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

    // Find user by email
    const users = await query<UserWithPassword>(
      "SELECT * FROM users WHERE email = $1",
      [email.toLowerCase()]
    )

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const user = users[0]

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      )
    }

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
      { status: 200 }
    )
  } catch (error: any) {
    console.error("[login] Error:", error)

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
