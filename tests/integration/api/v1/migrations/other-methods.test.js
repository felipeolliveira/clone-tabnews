import { database } from "infra/database";
import { orchestrator } from "tests/orchestrator";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await cleanDatabase();
});

async function getStatus() {
  const response = await fetch("http://localhost:3000/api/v1/status", {
    method: "GET",
  });
  return await response.json();
}

test("other methods to /api/v1/migrations should return 405 and cannot open more then 1 connection", async () => {
  const responseStatusBeforeMigrations = await getStatus();
  expect(
    responseStatusBeforeMigrations.dependencies.database.opened_connections,
  ).toBe(1);

  const migrationResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    { method: "DELETE" },
  );
  expect(migrationResponse.status).toBe(405);

  const responseStatusAfterMigrations = await getStatus();
  expect(
    responseStatusAfterMigrations.dependencies.database.opened_connections,
  ).toBe(1);
});
