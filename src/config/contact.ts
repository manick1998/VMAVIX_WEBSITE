/**
 * Single source of truth for every way a visitor can reach VMAVIX.
 */

/** Digits only, full international format — required by wa.me links. */
export const WHATSAPP_NUMBER = "919361099051";

/** Human-readable, used for tel: links and on-screen display. */
export const PHONE_DISPLAY = "+91 93610 99051";
export const PHONE_E164 = "+919361099051";

export const EMAIL = "hello@vmavix.com";
export const LEGAL_EMAIL = "legal@vmavix.com";

export interface EnquiryPayload {
  name: string;
  email: string;
  company?: string;
  scope: string;
  timeline: string;
  message?: string;
}

/**
 * Formats an enquiry as a WhatsApp message.
 * Uses plain newlines — wa.me handles the encoding.
 */
export function buildWhatsAppMessage(p: EnquiryPayload): string {
  const lines = [
    "*New project enquiry — VMAVIX*",
    "",
    `*Name:* ${p.name}`,
    `*Email:* ${p.email}`,
  ];

  if (p.company?.trim()) lines.push(`*Company:* ${p.company}`);

  lines.push(
    "",
    `*Scope:* ${p.scope}`,
    `*Timeline:* ${p.timeline}`
  );

  if (p.message?.trim()) lines.push("", `*Brief:*`, p.message);

  lines.push("", "_Sent from vmavix.com_");

  return lines.join("\n");
}

/** Full wa.me deep link with the enquiry pre-filled. */
export function buildWhatsAppUrl(p: EnquiryPayload): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppMessage(p)
  )}`;
}

/** Short WhatsApp link for the floating button / quick contact. */
export function quickWhatsAppUrl(
  text = "Hi VMAVIX, I'd like to discuss a project."
): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
