import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.111.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPPORT_EMAIL = "support@squeegeemaids.com";
const FROM_EMAIL = "Squeegee Maids <support@squeegeemaids.com>";

type QuotePayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  bedrooms?: string;
  bathrooms?: string;
  frequency?: string;
  notes?: string;
};

type EmailMessage = {
  from: string;
  to: string;
  reply_to?: string;
  subject: string;
  text: string;
  html: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validatePayload(data: unknown): data is QuotePayload {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.name === "string" && d.name.trim().length > 0 &&
    typeof d.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
    typeof d.phone === "string" && d.phone.trim().length >= 10 &&
    typeof d.service === "string" && d.service.trim().length > 0
  );
}

function buildSupportEmail(p: QuotePayload): EmailMessage {
  const rows: [string, string][] = [
    ["Name", p.name],
    ["Email", p.email],
    ["Phone", p.phone],
    ["Service Type", p.service],
    ["Bedrooms", p.bedrooms ?? "—"],
    ["Bathrooms", p.bathrooms ?? "—"],
    ["Frequency", p.frequency ?? "—"],
    ["Notes", p.notes?.trim() ? p.notes : "—"],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table style="font-family:Arial,sans-serif;border-collapse:collapse;font-size:15px">
    <tr><td colspan="2" style="padding:12px 0 16px;font-size:18px;font-weight:bold">New Quote Request</td></tr>
    ${rows.map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#555;font-weight:bold">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`).join("")}
  </table>`;
  return {
    from: FROM_EMAIL,
    to: SUPPORT_EMAIL,
    reply_to: p.email,
    subject: `New Quote Request from ${p.name}`,
    text,
    html,
  };
}

function buildCustomerEmail(p: QuotePayload): EmailMessage {
  const firstName = p.name.split(" ")[0] || p.name;
  const text = [
    `Hi ${firstName},`,
    "",
    "Thanks for requesting a free quote from Squeegee Maids! We've received your details:",
    "",
    `Service: ${p.service}`,
    p.bedrooms ? `Bedrooms: ${p.bedrooms}` : "",
    p.bathrooms ? `Bathrooms: ${p.bathrooms}` : "",
    p.frequency ? `Frequency: ${p.frequency}` : "",
    "",
    "We'll review your request and reply with an exact price within 24 hours.",
    "",
    "If you need anything sooner, call or text us at (971) 302-4242.",
    "",
    "Thanks for choosing Squeegee Maids!",
    "— The Squeegee Maids Team",
  ].filter(Boolean).join("\n");

  const html = `<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
    <h1 style="font-size:22px;margin:0 0 16px">Thanks for your quote request, ${escapeHtml(firstName)}!</h1>
    <p style="font-size:16px;line-height:1.6">We've received your details and will reply with an exact price within 24 hours.</p>
    <div style="background:#f6f7f9;border-radius:12px;padding:20px;margin:20px 0">
      <p style="margin:0 0 8px;font-weight:bold">Here's what you requested:</p>
      <p style="margin:4px 0">Service: ${escapeHtml(p.service)}</p>
      ${p.bedrooms ? `<p style="margin:4px 0">Bedrooms: ${escapeHtml(p.bedrooms)}</p>` : ""}
      ${p.bathrooms ? `<p style="margin:4px 0">Bathrooms: ${escapeHtml(p.bathrooms)}</p>` : ""}
      ${p.frequency ? `<p style="margin:4px 0">Frequency: ${escapeHtml(p.frequency)}</p>` : ""}
    </div>
    <p style="font-size:16px;line-height:1.6">Need something sooner? Call or text us at <a href="tel:+19713024242" style="color:#0284c7">(971) 302-4242</a>.</p>
    <p style="font-size:16px;line-height:1.6">Thanks for choosing Squeegee Maids!</p>
    <p style="font-size:14px;color:#888;margin-top:24px">— The Squeegee Maids Team</p>
  </div>`;

  return {
    from: FROM_EMAIL,
    to: p.email,
    subject: "We got your quote request! — Squeegee Maids",
    text,
    html,
  };
}

async function sendEmail(email: EmailMessage, apiKey: string): Promise<void> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
      signal: controller.signal,
    });

    if (!res.ok) {
      const detail = await res.text();
      throw new Error(`Resend API error ${res.status} sending to ${email.to}: ${detail}`);
    }

    const data = await res.json().catch(() => null);
    if (!data || !data.id) {
      throw new Error(`Resend did not return a message id for ${email.to}`);
    }
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(`Resend API timed out after 10s sending to ${email.to}`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

  const body = await req.json();

const raw = body as Record<string, unknown>;

const payload: QuotePayload = {
  name: String(raw.name ?? raw.fullName ?? "").trim(),
  email: String(raw.email ?? "").trim(),
  phone: String(raw.phone ?? "").trim(),
  service: String(raw.service ?? raw.serviceType ?? "").trim(),
  bedrooms: raw.bedrooms ? String(raw.bedrooms) : undefined,
  bathrooms: raw.bathrooms ? String(raw.bathrooms) : undefined,
  frequency: raw.frequency ? String(raw.frequency) : undefined,
  notes: raw.notes
    ? String(raw.notes)
    : raw.message
      ? String(raw.message)
      : undefined,
};

if (!validatePayload(payload)) {
  return new Response(
    JSON.stringify({
      error: "Please enter your name, a valid email, a 10-digit phone number, and select a service.",
    }),
    {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
}

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: dbError } = await supabase.from("quote_requests").insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      service: payload.service,
      bedrooms: payload.bedrooms ?? null,
      bathrooms: payload.bathrooms ?? null,
      frequency: payload.frequency ?? null,
      notes: payload.notes?.trim() ? payload.notes : null,
    });

    if (dbError) {
      console.error("DB insert failed:", dbError.message);
      return new Response(JSON.stringify({ error: "Could not save your request. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    try {
      const rawKey = Deno.env.get("RESEND_API_KEY");
      const apiKey = rawKey?.trim().replace(/^["'`]+|["'`]+$/g, "");
      if (!apiKey) {
        throw new Error("RESEND_API_KEY is not set or is empty.");
      }
      if (!apiKey.startsWith("re_")) {
        console.warn("RESEND_API_KEY does not start with 're_' — it may be stored incorrectly.");
      }

      const results = await Promise.allSettled([
        sendEmail(buildSupportEmail(payload), apiKey),
        sendEmail(buildCustomerEmail(payload), apiKey),
      ]);

      const failures = results
        .filter((r): r is PromiseRejectedResult => r.status === "rejected")
        .map((r) => (r.reason instanceof Error ? r.reason.message : String(r.reason)));

      if (failures.length > 0) {
        throw new Error(failures.join(" | "));
      }
    } catch (emailErr) {
      const errMsg = emailErr instanceof Error ? emailErr.message : String(emailErr);
      console.error("Email sending failed:", errMsg);
      return new Response(
        JSON.stringify({ error: `Your request was saved, but email notifications failed: ${errMsg}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong while sending your request. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
