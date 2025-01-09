import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const kv = getRequestContext().env.KV_ORDER
  const body = await request.json() as { key: string, value: object };
  const { key, value } = body;

  await kv.put(key, JSON.stringify(value));
  return NextResponse.json({ message: 'OK' }, { status: 201 })
}
