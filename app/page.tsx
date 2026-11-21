import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MapPin,
  PackageCheck,
} from "lucide-react";

import { Header, Footer } from "@/components/site-chrome";
import { formatINR, productPricePaise, PRODUCT } from "@/lib/product";

const details = [
  "Product materials and page count to be confirmed.",
  "Product dimensions to be confirmed.",
  "Final product imagery to be added before launch.",
];

export default function Home() {
  const price = productPricePaise();

  return (
    <>
      <Header />

      <main>
        {/* HERO SECTION */}
        <section className="grainy-gradient grid min-h-[650px] items-center gap-12 px-6 py-16 md:grid-cols-2 md:px-12 md:py-20">          <div>
            <p className="eyebrow">A space to return to</p>

            <h1 className="mt-4 max-w-xl text-5xl leading-[.98] md:text-7xl">
              Make room for what’s blooming within.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-black">
              Bloom Diary is a considered home for your quiet thoughts,
              everyday notes, and future selves.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* <Link href="/checkout" className="button">
                Buy Bloom Diary <ArrowUpRight size={16} />
              </Link> */}

              <a href="#story" className="button button-light">
                Discover the diary <ArrowDown size={16} />
              </a>
            </div>

            <p className="mt-7 text-sm text-[var(--muted)]">
              {formatINR(price)}
              <span className="mx-2">·</span>
              Ships across India
            </p>
          </div>

          
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[490px] overflow-hidden rounded-2xl">
            <Image
              src="/products/bloom-diary/cover.png"
              alt="BloomWithin Bloom Diary"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 490px"
              className="object-cover"
            />
          </div>

        </section>

        {/* STORY SECTION */}
        <section
          id="story"
          className="bg-[var(--soft-pink)] py-20"
        >
          <div className="shell grid gap-10 md:grid-cols-[1fr_1.3fr]">
            <p className="eyebrow">The intention</p>

            <div>
              <h2 className="text-4xl leading-tight md:text-5xl">
                A diary designed to meet you wherever you are.
              </h2>

              <p className="mt-6 max-w-2xl leading-7 text-[var(--muted)]">
                We’re intentionally holding back unverified product
                claims until Bloom Diary’s final details are confirmed.
                The space is here; the specifics will follow.
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCT DETAILS */}
        
{/* BLOOM DIARY PRODUCT SHOWCASE */}
<section id="details" className="shell py-24">
  <div className="grid items-center gap-14 md:grid-cols-2">

    {/* PRODUCT IMAGE GALLERY */}
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 overflow-hidden rounded-2xl bg-[var(--soft-pink)]">
        <img
          src="/products/bloom-diary/cover.png"
          alt="Bloom Diary cover"
          className="h-[420px] w-full object-cover"
        />
      </div>

      <div className="overflow-hidden rounded-xl">
        <img
          src="/products/bloom-diary/style1.png"
          alt="Bloom Diary lifestyle"
          className="h-52 w-full object-cover"
        />
      </div>

      <div className="overflow-hidden rounded-xl">
        <img
          src="/products/bloom-diary/style2.png"
          alt="Bloom Diary details"
          className="h-52 w-full object-cover"
        />
      </div>
    </div>

    {/* PRODUCT INFORMATION */}
    <div className="md:py-8">
      <p className="eyebrow">A little space for yourself</p>

      <h2 className="mt-5 text-5xl leading-tight">
        Meet your new favourite diary.
      </h2>

      <p className="mt-6 leading-8 text-[var(--muted)]">
        Bloom Diary is a considered home for your quiet thoughts,
        everyday notes, and future selves. A space to pause,
        reflect and let your thoughts bloom.
      </p>

      <div className="my-8 border-y border-[var(--border)] py-6">
        <p className="text-sm text-[var(--muted)]">
          BloomWithin · Bloom Diary
        </p>

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
          Delivery across India
        </p>
      </div>

      <Link
        href="/products/bloom-diary"
        className="button w-full md:w-auto"
      >
        Get your Bloom Diary <ArrowUpRight size={17} />
      </Link>

      <p className="mt-4 text-xs text-[var(--muted)]">
        A little reminder to make room for yourself.
      </p>
    </div>

  </div>
</section>


        {/* DELIVERY BENEFITS */}
        <section className="border-y border-[var(--border)] bg-white py-16">
          <div className="shell grid gap-8 md:grid-cols-3">
            <div>
              <PackageCheck className="text-[var(--orange)]" />

              <h3 className="mt-4 text-2xl">
                Thoughtful dispatch
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Shipping timing will be confirmed before launch.
              </p>
            </div>

            <div>
              <MapPin className="text-[var(--pink)]" />

              <h3 className="mt-4 text-2xl">
                Across India
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Delivery is planned for addresses throughout India.
              </p>
            </div>

            <div>
              <Check className="text-[var(--orange)]" />

              <h3 className="mt-4 text-2xl">
                Human confirmation
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                After ordering, you confirm your details through WhatsApp.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="shell py-20">
          <p className="eyebrow">Frequently asked</p>

          <h2 className="mt-3 text-4xl">
            A few things to know
          </h2>

          <div className="mt-8 divide-y divide-[var(--border)] border-y border-[var(--border)]">
            <FAQ
              q="How do I place an order?"
              a="Complete checkout and then use the WhatsApp link to manually send your order details to our team."
            />

            <FAQ
              q="When is my order confirmed?"
              a="Opening WhatsApp does not confirm an order. Confirmation and delivery details will be communicated by the business."
            />

            <FAQ
              q="How much is delivery?"
              a="Delivery information and any applicable charges will be confirmed with final business details before launch."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className="group py-5">
      <summary className="cursor-pointer list-none font-semibold">
        {q}
        <span className="float-right text-xl text-[var(--pink)]">
          +
        </span>
      </summary>

      <p className="max-w-2xl pt-3 text-sm leading-6 text-[var(--muted)]">
        {a}
      </p>
    </details>
  );
}
