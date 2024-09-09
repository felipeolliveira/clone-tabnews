import path from "node:path";
import migrationRunner from "node-pg-migrate";
import { database } from "infra/database";

export default async function migrations(req, res) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const migrationsPath = path.resolve("infra", "migrations");
    const defaultMigrationOptions = {
      dbClient,
      direction: "up",
      dir: migrationsPath,
      dryRun: false,
      migrationsTable: "pgmigrations",
      verbose: true,
    };

    // Live-run migrations
    if (req.method === "POST") {
      const migratedMigrations = await migrationRunner(defaultMigrationOptions);

      if (migratedMigrations.length > 0) {
        return res.status(201).json(migratedMigrations);
      }

      return res.status(200).json(migratedMigrations);
    }

    // Dry-run migrations
    if (req.method === "GET") {
      const pendingMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: true,
      });

      return res.status(200).json(pendingMigrations);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await dbClient.end();
  }
}
