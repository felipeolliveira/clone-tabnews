import { Client } from "pg";

async function query(...queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(...queryObject);
    await client.end();
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    await client?.end();
  }
}

function getSSL() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production";
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSL(),
  });

  await client.connect();
  return client;
}

export const database = {
  query,
  getNewClient,
};
