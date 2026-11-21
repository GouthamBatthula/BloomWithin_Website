
import { z } from "zod";
import { PRODUCT } from "./product";

const clean = (value: string) => value.trim().replace(/\s+/g, " ");

export const checkoutSchema = z.object({
  customerName: z.string().transform(clean).pipe(z.string().min(2).max(100)),
  phone: z.string().transform((v) => v.replace(/[\s-]/g, "")).pipe(z.string().regex(/^(?:\+91)?[6-9]\d{9}$/, "Enter a valid Indian mobile number")),
  email: z.string().trim().email("Enter a valid email address").max(254),
  addressLine1: z.string().transform(clean).pipe(z.string().min(5).max(200)),
  addressLine2: z.string().transform(clean).pipe(z.string().max(200)).optional().default(""),
  city: z.string().transform(clean).pipe(z.string().min(2).max(80)),
  state: z.string().transform(clean).pipe(z.string().min(2).max(80)),
  postalCode: z.string().transform((v) => v.trim()).pipe(z.string().regex(/^[1-9]\d{5}$/, "Enter a valid 6-digit PIN code")),
  quantity: z.coerce.number().int().min(1).max(PRODUCT.maxQuantity),
  idempotencyKey: z.string().uuid(),
  website: z.string().max(0).optional().default(""),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

export function whatsappUrl(
  order: {
    orderNumber: string;
    quantity: number;
    unitPricePaise: number;
    totalPaise: number;
  } & Pick<
    CheckoutInput,
    | "customerName"
    | "phone"
    | "email"
    | "addressLine1"
    | "addressLine2"
    | "city"
    | "state"
    | "postalCode"
  >
): string | null {
  const number = process.env.WHATSAPP_BUSINESS_NUMBER?.replace(/\D/g, "");
  if (!number) return null;

  const money = (paise: number) => `₹${(paise / 100).toFixed(2)}`;

  const address = [
    order.addressLine1,
    order.addressLine2,
    order.city,
    order.state,
    order.postalCode,
  ].filter(Boolean).join(", ");

  const message = [
    "BloomWithin — Bloom Diary order",
    `Order: ${order.orderNumber}`,
    `Quantity: ${order.quantity}`,
    `Unit price: ${money(order.unitPricePaise)}`,
    `Total: ${money(order.totalPaise)}`,
    `Customer: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Email: ${order.email}`,
    `Delivery address: ${address}`,
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
