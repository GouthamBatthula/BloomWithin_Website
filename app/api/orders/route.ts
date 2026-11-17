import { NextRequest, NextResponse } from "next/server";
import { checkoutSchema, whatsappUrl } from "@/lib/checkout";
import { productPricePaise } from "@/lib/product";
import { allowCheckout } from "@/lib/rate-limit";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

function orderNumber() { return `BW-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 5).toUpperCase()}`; }

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!allowCheckout(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 16_384) return NextResponse.json({ error: "Request too large" }, { status: 413 });
  let body: unknown;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields.", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ error: "Unable to submit this order." }, { status: 400 });
  const unitPricePaise = productPricePaise();
  if (unitPricePaise === null) return NextResponse.json({ error: "The product price is not configured. Please contact us." }, { status: 503 });
  const data = parsed.data; const totalPaise = unitPricePaise * data.quantity;
  const db = supabaseAdmin();
  const { data: saved, error } = await db.from("orders").insert({
    order_number: orderNumber(), idempotency_key: data.idempotencyKey, customer_name: data.customerName,
    phone: data.phone, address_line1: data.addressLine1, address_line2: data.addressLine2 || null,
    city: data.city, state: data.state, postal_code: data.postalCode, quantity: data.quantity,
    unit_price_paise: unitPricePaise, total_paise: totalPaise, status: "awaiting_whatsapp"
  }).select("order_number").single();
  if (error?.code === "23505") {
    const { data: existing } = await db.from("orders").select("order_number, quantity, unit_price_paise, total_paise").eq("idempotency_key", data.idempotencyKey).maybeSingle();
    if (existing) return NextResponse.json({ orderNumber: existing.order_number, whatsappUrl: whatsappUrl({ ...data, orderNumber: existing.order_number, quantity: existing.quantity, unitPricePaise: existing.unit_price_paise, totalPaise: existing.total_paise }) });
  }
  if (error || !saved) { console.error("Order creation failed", error?.code); return NextResponse.json({ error: "We could not save your order. Please try again." }, { status: 503 }); }
  return NextResponse.json({ orderNumber: saved.order_number, whatsappUrl: whatsappUrl({ ...data, orderNumber: saved.order_number, unitPricePaise, totalPaise }) }, { status: 201 });
}
