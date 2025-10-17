import { NextResponse } from "next/server"
import { clearAuthCookie } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function POST() {
  try {
    // Clear authentication cookie
    await clearAuthCookie()

    return NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("[logout] Error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    )
  }
}
