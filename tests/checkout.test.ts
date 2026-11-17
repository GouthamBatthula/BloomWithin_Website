import { describe, expect, it } from "vitest";
import { checkoutSchema, whatsappUrl } from "../lib/checkout";

const valid = { customerName:"Asha Sharma", phone:"9876543210", addressLine1:"12 Garden Road", city:"Pune", state:"Maharashtra", postalCode:"411001", quantity:1, idempotencyKey:"d9497c1d-294c-4b45-a2c8-3064b3f22a87" };
describe("checkout validation", () => {
  it("accepts a valid checkout", () => expect(checkoutSchema.safeParse(valid).success).toBe(true));
  it("rejects invalid phone", () => expect(checkoutSchema.safeParse({...valid, phone:"12345"}).success).toBe(false));
  it("rejects invalid PIN", () => expect(checkoutSchema.safeParse({...valid, postalCode:"000000"}).success).toBe(false));
  it("rejects missing address", () => expect(checkoutSchema.safeParse({...valid, addressLine1:""}).success).toBe(false));
  it("rejects invalid quantity", () => expect(checkoutSchema.safeParse({...valid, quantity:6}).success).toBe(false));
  it("generates a safely encoded WhatsApp URL", () => { process.env.WHATSAPP_BUSINESS_NUMBER="919876543210"; const url=whatsappUrl({...valid, addressLine2:"", orderNumber:"BW-TEST", unitPricePaise:129900, totalPaise:129900}); expect(url).toContain("wa.me/919876543210"); expect(url).toContain("BloomWithin"); });
});
