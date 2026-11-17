create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  idempotency_key uuid not null unique,
  customer_name text not null check (char_length(customer_name) between 2 and 100),
  phone text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  postal_code text not null check (postal_code ~ '^[1-9][0-9]{5}$'),
  quantity integer not null check (quantity between 1 and 5),
  unit_price_paise integer not null check (unit_price_paise >= 0),
  total_paise integer not null check (total_paise = quantity * unit_price_paise),
  status text not null default 'awaiting_whatsapp' check (status in ('awaiting_whatsapp', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
alter table public.orders enable row level security;
-- No policies: anon/authenticated users cannot select, insert, update, or delete.
-- Server uses the service role, which bypasses RLS and is never exposed to clients.
