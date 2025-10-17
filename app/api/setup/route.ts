import { NextResponse } from "next/server"
import { getPool } from "@/lib/db"
import fs from "fs"
import path from "path"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Read the SQL setup file
    const sqlPath = path.join(process.cwd(), "lib", "db-setup.sql")
    const sqlScript = fs.readFileSync(sqlPath, "utf8")

    // Get database connection
    const pool = getPool()

    // Execute the setup script
    await pool.query(sqlScript)

    return NextResponse.json(
      {
        success: true,
        message: "Database tables created successfully",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("[setup] Database setup error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Failed to setup database",
        details: error.message,
      },
      { status: 500 }
    )
  }
}
