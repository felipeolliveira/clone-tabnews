import { query } from "infra/database";
import { NextResponse } from "next/server";

export async function GET(req) {
  return NextResponse.json({ status: 'healthy' }, { status: 200 })
}