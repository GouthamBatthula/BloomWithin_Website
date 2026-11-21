
"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { PRODUCT, formatINR } from "@/lib/product";

export function CheckoutForm({ price }: { price: number | null }) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");

    const businessNumber = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER;

    if (!businessNumber) {
      setError("WhatsApp contact is not configured. Please contact BloomWithin.");
      return;
    }

    const customerName = String(form.get("customerName") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const addressLine1 = String(form.get("addressLine1") || "").trim();
    const addressLine2 = String(form.get("addressLine2") || "").trim();
    const city = String(form.get("city") || "").trim();
    const state = String(form.get("state") || "").trim();
    const postalCode = String(form.get("postalCode") || "").trim();

    const address = [
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
    ].filter(Boolean).join(", ");

    const total = formatINR(price! * quantity);

    const message = [
      "Hello BloomWithin! I'd like to place an order.",
      "",
      `Product: ${PRODUCT.name}`,
      `Quantity: ${quantity}`,
      `Total: ${total}`,
      "",
      "Customer details:",
      `Name: ${customerName}`,
      `Mobile: ${phone}`,
      `Email: ${email}`,
      `Delivery address: ${address}`,
      "",
      "Please confirm my order and delivery details.",
    ].join("\n");

    const number = businessNumber.replace(/\D/g, "");
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

    window.location.href = whatsappUrl;
  }

  if (price === null) {
    return (
      <div className="border border-[#c4d0c0] bg-[#edf1e9] p-5 text-sm leading-6">
        Checkout is unavailable until the product price is configured.
        Please contact BloomWithin for assistance.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <label>
        Full name
        <input
          required
          name="customerName"
          className="field mt-2"
          autoComplete="name"
        />
      </label>

      <label>
        Indian mobile number
        <input
          required
          name="phone"
          className="field mt-2"
          inputMode="tel"
          pattern="(\+91)?[6-9][0-9]{9}"
          placeholder="9876543210"
          autoComplete="tel"
        />
      </label>

      <label>
        Email address
        <input
          required
          type="email"
          name="email"
          className="field mt-2"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>

      <label>
        Address line 1
        <input
          required
          name="addressLine1"
          className="field mt-2"
          autoComplete="address-line1"
        />
      </label>

      <label>
        Address line 2 <span className="text-[#6e796f]">(optional)</span>
        <input
          name="addressLine2"
          className="field mt-2"
          autoComplete="address-line2"
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label>
          City
          <input
            required
            name="city"
            className="field mt-2"
            autoComplete="address-level2"
          />
        </label>

        <label>
          State
          <input
            required
            name="state"
            className="field mt-2"
            autoComplete="address-level1"
          />
        </label>
      </div>

      <label>
        PIN code
        <input
          required
          name="postalCode"
          className="field mt-2"
          inputMode="numeric"
          pattern="[1-9][0-9]{5}"
          autoComplete="postal-code"
        />
      </label>

      <div>
        <p className="mb-2 text-sm font-semibold">Quantity</p>

        <div className="flex w-fit items-center border border-[#c6d0c1]">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="p-3"
            disabled={quantity === 1}
            onClick={() => setQuantity(quantity - 1)}
          >
            <Minus size={16} />
          </button>

          <span className="w-9 text-center text-sm font-bold">
            {quantity}
          </span>

          <button
            type="button"
            aria-label="Increase quantity"
            className="p-3"
            disabled={quantity === PRODUCT.maxQuantity}
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="border-y border-[#d9e1d5] py-4 text-sm">
        <div className="flex justify-between">
          <span>Bloom Diary × {quantity}</span>
          <span>{formatINR(price * quantity)}</span>
        </div>

        <div className="mt-3 flex justify-between font-bold">
          <span>Total</span>
          <span>{formatINR(price * quantity)}</span>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-[#a14c3e]">
          {error}
        </p>
      )}

      <button className="button" type="submit">
        Place order via WhatsApp
      </button>

      <p className="text-xs leading-5 text-[#68766b]">
        Your WhatsApp message will be prepared automatically.
        Please press Send in WhatsApp to submit your order.
      </p>
    </form>
  );
}
