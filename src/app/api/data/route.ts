import { NextRequest, NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

/**
 * 注文情報をKVに保存する
 * 
 * @param request 
 * @returns NextResponse
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // リクエストボディを取得
  const body = await request.json() as { key: string, value: object };
  const { key, value } = body;

  // KVのインスタンスを取得
  const kv = getRequestContext().env.KV_ORDER
  await kv.put(key, JSON.stringify(value));
  return NextResponse.json({ message: 'OK' }, { status: 201 })
}
