import ProductGallery from "@/components/product-gallery";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Header, Footer } from "@/components/site-chrome";
import { formatINR, productPricePaise, PRODUCT } from "@/lib/product";

export default function BloomDiaryPage() {
  const price = productPricePaise();

  return (
    <>
      <Header />

      <main className="shell py-10 md:py-16">

        {/* BREADCRUMB */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--pink)]"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        {/* PRODUCT SECTION */}
        <section className="grid gap-12 lg:grid-cols-2 lg:gap-16">

          {/* IMAGE GALLERY */}
            <ProductGallery />

          {/* PRODUCT INFORMATION */}
          <div className="lg:sticky lg:top-24 lg:self-start">

            <p className="eyebrow">
              BLOOMWITHIN · THE BLOOM COLLECTION
            </p>

            <h1 className="mt-5 text-5xl leading-tight md:text-6xl">
              Bloom Diary
            </h1>

            <p className="mt-5 text-base leading-8 text-[var(--muted)]">
              {PRODUCT.description}
            </p>

            {/* PRICE */}
            <div className="mt-8 border-y border-[var(--border)] py-6">
            <div className="flex items-center gap-3">
                <span className="text-3xl font-semibold text-black">
                ₹1,299
                </span>

                <span className="text-base text-[var(--muted)] line-through">
                ₹1,499
                </span>

                <span className="rounded-full bg-[var(--soft-pink)] px-3 py-1 text-xs font-semibold text-[var(--pink)]">
                13% OFF
                </span>
            </div>

            <p className="mt-2 text-sm text-[var(--muted)]">
                Inclusive of applicable taxes
            </p>
            </div>

            {/* PURCHASE BUTTON */}
            <Link
              href="/checkout"
              className="button mt-8 w-full py-4"
            >
              Buy Now
              <ArrowUpRight size={18} />
            </Link>

            <p className="mt-4 text-center text-xs text-[var(--muted)]">
              A little space for everything within you.
            </p>

            {/* BENEFITS */}
            <div className="mt-10 grid gap-5 border-t border-[var(--border)] pt-7">

              <div className="flex items-center gap-3">
                <Truck className="text-[var(--pink)]" size={21} />
                <span className="text-sm">
                  Delivery across India
                </span>
              </div>

              <div className="flex items-center gap-3">
                <PackageCheck className="text-[var(--orange)]" size={21} />
                <span className="text-sm">
                  Carefully prepared for dispatch
                </span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[var(--pink)]" size={21} />
                <span className="text-sm">
                  Order confirmation through WhatsApp
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* PRODUCT STORY */}
        <section className="mt-24 rounded-3xl bg-[var(--soft-pink)] px-7 py-16 text-center md:px-20">

          <p className="eyebrow">A space for you</p>

          <h2 className="mx-auto mt-5 max-w-2xl text-4xl leading-tight md:text-5xl">
            Your thoughts deserve a place to bloom.
          </h2>

          <p className="mx-auto mt-6 max-w-xl leading-8 text-[var(--muted)]">
            Some thoughts are meant to be written.
            Some dreams are meant to be remembered.
            Give yourself a space to pause, reflect,
            and discover what is growing within.
          </p>

        </section>

        {/* FINAL CTA */}
        <section className="py-20 text-center">

          <p className="eyebrow">Your journey begins here</p>

          <h2 className="mt-4 text-4xl">
            Make room for yourself.
          </h2>

          <Link
            href="/checkout"
            className="button mt-8"
          >
            Get your Bloom Diary
            <ArrowUpRight size={17} />
          </Link>

        </section>

      </main>

      <Footer />
    </>
  );
}
