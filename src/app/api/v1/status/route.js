import { query } from "infra/database";
import { NextResponse } from "next/server";

export const dymamic = 'force-dynamic'

export async function GET() {
  const databaseName = process.env.POSTGRES_DB

  const maxConnections = await query('SHOW max_connections;')
  const openedConnections = await query({
    text: 'SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [ databaseName ]
  })
  const version = await query('SHOW server_version;')

  const maxConnectionsValue = maxConnections.rows[ 0 ].max_connections
  const openedConnectionsValue = openedConnections.rows[ 0 ].count
  const versionValue = version.rows[ 0 ].server_version

  return NextResponse.json({
    updated_at: new Date().toISOString(),
    dependencies: {
      database: {
        status: 'healthy',
        max_connections: parseInt(maxConnectionsValue),
        opened_connections: openedConnectionsValue,
        version: versionValue
      }
    }
  }, { status: 200 })
}