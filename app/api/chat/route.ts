import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/chatbot/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_CHARS = 500;
const MAX_HISTORY = 8;

// Simple in-memory rate limiter per IP.
// NOTE: for production a durable shared store (Upstash Redis / Vercel KV)
// is better — serverless instances do not share memory.
const hits = new Map<string, { minute: number[]; hour: number[] }>();
const MINUTE_LIMIT = 12;
const HOUR_LIMIT = 60;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const minuteWindow = now - 60_000;
  const hourWindow = now - 3_600_000;
  const entry = hits.get(ip) ?? { minute: [], hour: [] };
  entry.minute = entry.minute.filter((t) => t > minuteWindow);
  entry.hour = entry.hour.filter((t) => t > hourWindow);
  if (entry.minute.length >= MINUTE_LIMIT || entry.hour.length >= HOUR_LIMIT) {
    hits.set(ip, entry);
    return false;
  }
  entry.minute.push(now);
  entry.hour.push(now);
  hits.set(ip, entry);
  return true;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function sanitizeMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) {
    return null;
  }
  const raw = (body as { messages: unknown[] }).messages;
  const valid: ChatMessage[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") return null;
    const { role, content } = item as { role?: unknown; content?: unknown };
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") return null;
    valid.push({ role, content: content.slice(0, MAX_CHARS) });
  }
  if (valid.length === 0) return null;
  return valid.slice(-MAX_HISTORY);
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is not set");
    return NextResponse.json(
      { message: "The assistant is not available right now. Please use the contact form." },
      { status: 500 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { message: "Too many questions right now, please try again in a minute or use the contact form." },
      { status: 429 },
    );
  }

  const messages = sanitizeMessages(await request.json().catch(() => null));
  if (!messages) {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const model = process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";

  let upstream: Response;
  try {
    upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        stream: true,
        temperature: 0.4,
        max_tokens: 500,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    });
  } catch (err) {
    console.error("Groq request failed:", err);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    console.error("Groq responded with status:", upstream.status);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta.length > 0) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // ignore partial/keep-alive chunks
            }
          }
        }
      } catch (err) {
        console.error("Stream error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
