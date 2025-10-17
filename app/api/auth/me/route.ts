import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { query } from "@/lib/db"
import type { User } from "@/lib/auth-types"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Get current user from JWT token
    const session = await getCurrentUser()

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Fetch user from database to get latest data
    const users = await query<User>(
      "SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1",
      [session.userId]
    )

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      )
    }

    const user = users[0]

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
    console.error("[me] Error:", error)

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
