import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.111.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPPORT_EMAIL = "support@squeegeemaids.com";
const FROM_EMAIL = "Squeegee Maids <onboarding@resend.dev>";

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

function buildSupportEmail(p: QuotePayload) {
  const rows = [
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
    ${rows.map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#555;font-weight:bold">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(String(v))}</td></tr>`).join("")}
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

function buildCustomerEmail(p: QuotePayload) {
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

type EmailMessage = {
  from: string;
  to: string;
  reply_to?: string;
  subject: string;
  text: string;
  html: string;
};

async function sendEmail(email: EmailMessage): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend API error ${res.status}: ${detail}`);
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
    if (!validatePayload(body)) {
      return new Response(JSON.stringify({ error: "Invalid request. Please fill out all required fields." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = body as QuotePayload;

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

    const supportEmail = buildSupportEmail(payload);
    const customerEmail = buildCustomerEmail(payload);

    const results = await Promise.allSettled([
      sendEmail(supportEmail),
      sendEmail(customerEmail),
    ]);

    const [supportResult, customerResult] = results;
    if (supportResult.status === "rejected") {
      console.error("Support notification email failed:", supportResult.reason);
    }
    if (customerResult.status === "rejected") {
      console.error("Customer confirmation email failed:", customerResult.reason);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(JSON.stringify({ error: "Something went wrong while sending your request. Please try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
