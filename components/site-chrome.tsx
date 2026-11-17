
import Link from "next/link";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-[var(--border)]">
      <div className="shell flex h-18 items-center justify-between py-4">
        <Link
          href="/"
          className="font-[Fraunces] text-2xl tracking-[-.06em]"
        >
          BloomWithin
        </Link>

        <nav className="hidden gap-7 text-sm md:flex">
          <a href="/#story" className="hover:text-[var(--pink)]">The diary</a>
          <a href="/#details" className="hover:text-[var(--pink)]">Details</a>
          <a href="/#faq" className="hover:text-[var(--pink)]">FAQ</a>
        </nav>

        <Link className="button !px-4 !py-2.5 text-xs" href="/checkout">
          Buy now <ArrowUpRight size={15} />
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] py-12 text-white">
      <div className="shell grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="font-[Fraunces] text-3xl tracking-[-.06em]">
            BloomWithin
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            A quieter corner for thoughts worth keeping.
          </p>
        </div>

        <div>
          <p className="eyebrow !text-[var(--orange)]">Information</p>
          <div className="mt-4 grid gap-2 text-sm text-white/85">
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms & conditions</Link>
            <Link href="/shipping">Shipping & delivery</Link>
            <Link href="/cancellations">Cancellations & refunds</Link>
          </div>
        </div>

        <div>
          <p className="eyebrow !text-[var(--pink)]">Contact</p>
          <p className="mt-4 text-sm leading-6 text-white/85">
            Business contact information will be added before launch.
          </p>
          <div className="mt-4 flex gap-3 text-[var(--pink)]">
            <Instagram size={18} />
            <MessageCircle size={18} />
          </div>
        </div>
      </div>

      <div className="shell mt-12 border-t border-white/20 pt-5 text-xs text-white/60">
        © {new Date().getFullYear()} BloomWithin. All rights reserved.
      </div>
    </footer>
  );
}
