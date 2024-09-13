import { database } from "infra/database";
import { orchestrator } from "tests/orchestrator";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await cleanDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    describe("Running pending migrations", () => {
      test("Fot the first time", async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: "POST",
          },
        );
        expect(response.status).toBe(201);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
      });
      test("For the second time", async () => {
        const secondResponse = await fetch(
          "http://localhost:3000/api/v1/migrations",
          { method: "POST" },
        );
        expect(secondResponse.status).toBe(200);

        const secondResponseBody = await secondResponse.json();

        expect(Array.isArray(secondResponseBody)).toBe(true);
        expect(secondResponseBody.length).toBe(0);
      });
    });
  });
});
