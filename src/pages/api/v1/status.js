import { database } from "infra/database";

export const dymamic = 'force-dynamic'

export default async function status(req, res) {
  const databaseName = process.env.POSTGRES_DB

  const maxConnections = await database.query('SHOW max_connections;')
  const openedConnections = await database.query({
    text: 'SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;',
    values: [ databaseName ]
  })
  const version = await database.query('SHOW server_version;')

  const maxConnectionsValue = maxConnections.rows[ 0 ].max_connections
  const openedConnectionsValue = openedConnections.rows[ 0 ].count
  const versionValue = version.rows[ 0 ].server_version

  return res.status(200).json({
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