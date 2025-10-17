import { Pool } from "pg"

// Singleton pattern for database connection pool
let pool: Pool | null = null

export function getPool(): Pool {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
      throw new Error("DATABASE_URL environment variable is not set")
    }

    pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false, // CockroachDB requires SSL
      },
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    })

    // Handle pool errors
    pool.on("error", (err) => {
      console.error("[db] Unexpected error on idle client", err)
      process.exit(-1)
    })
  }

  return pool
}

// Helper function to execute queries with automatic connection management
export async function query<T = any>(text: string, params?: any[]): Promise<T[]> {
  const pool = getPool()
  const client = await pool.connect()

  try {
    const result = await client.query(text, params)
    return result.rows
  } finally {
    client.release()
  }
}

// Close the pool (useful for cleanup in tests or shutdown)
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
  }
}
