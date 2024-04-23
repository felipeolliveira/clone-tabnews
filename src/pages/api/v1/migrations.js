import path from 'node:path';
import migrationRunner from 'node-pg-migrate'
import { database } from 'infra/database'

// Dry-run
export default async function migrations(req, res) {
  const dbClient = await database.getNewClient()
  const migrationsPath = path.resolve('infra', 'migrations')
  const defaultMigrationOptions = {
    dbClient,
    direction: 'up',
    dir: migrationsPath,
    dryRun: false,
    migrationsTable: 'pgmigrations',
    verbose: true,
  }

  if (req.method === 'POST') {
    const migratedMigrations = await migrationRunner(defaultMigrationOptions)
    await dbClient.end()

    if (migratedMigrations.length > 0) {
      return res.status(201).json(migratedMigrations)
    }

    return res.status(200).json(migratedMigrations)
  }

  if (req.method === 'GET') {
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: true
    })

    await dbClient.end()

    return res.status(200).json(pendingMigrations)
  }

  return res.status(405).end()
}