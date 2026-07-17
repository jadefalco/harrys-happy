import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/content/site-config";

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company: string;
  location: string;
  employees?: string;
  currentProvider?: string;
  services?: string[];
  message?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<ContactPayload>;

  if (!body.name || !body.email || !body.company || !body.location) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is not set. See .env.local.example for setup instructions."
    );
    return NextResponse.json(
      { error: "Email service is not configured yet." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  const html = `
    <h2>New site assessment request</h2>
    <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(body.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(body.phone ?? "-")}</p>
    <p><strong>Company:</strong> ${escapeHtml(body.company)}</p>
    <p><strong>Location:</strong> ${escapeHtml(body.location)}</p>
    <p><strong>Employees:</strong> ${escapeHtml(body.employees ?? "-")}</p>
    <p><strong>Current provider:</strong> ${escapeHtml(body.currentProvider ?? "-")}</p>
    <p><strong>Interested services:</strong> ${escapeHtml((body.services ?? []).join(", ") || "-")}</p>
    <p><strong>Message:</strong><br/>${escapeHtml(body.message ?? "-")}</p>
  `;

  try {
    await resend.emails.send({
      from: `${siteConfig.name} Website <onboarding@resend.dev>`,
      to: siteConfig.email,
      replyTo: body.email,
      subject: `New site assessment request from ${body.company}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Resend send failed", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
