-- Vaazhkai foundation schema. Public site is read-only: no admin, no auth, no forms yet.

create or replace function public.set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- Key/value site-wide settings (links, name, tagline). Everything here is PUBLIC: never store secrets.
create table public.site_settings (
  key         text primary key,
  value       text not null,
  updated_at  timestamptz not null default now()
);

create table public.stories (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title         text not null,
  eyebrow       text,
  excerpt       text,
  body          text,
  image_key     text,               -- name of a bundled frontend asset (e.g. 'vaazhkai-cat'); no Storage needed
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table public.resources (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text,
  url          text not null check (url ~ '^https://'),
  image_key    text,
  published    boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create trigger site_settings_updated before update on public.site_settings
  for each row execute function public.set_updated_at();
create trigger stories_updated before update on public.stories
  for each row execute function public.set_updated_at();
create trigger resources_updated before update on public.resources
  for each row execute function public.set_updated_at();

-- Row Level Security: anon/authenticated may only READ public content. No write policies exist.
alter table public.site_settings enable row level security;
alter table public.stories       enable row level security;
alter table public.resources     enable row level security;

create policy "public read site_settings" on public.site_settings
  for select to anon, authenticated using (true);
create policy "public read published stories" on public.stories
  for select to anon, authenticated using (published);
create policy "public read published resources" on public.resources
  for select to anon, authenticated using (published);

-- Defense in depth: strip Supabase's default write grants too.
revoke all on public.site_settings, public.stories, public.resources from anon, authenticated;
grant select on public.site_settings, public.stories, public.resources to anon, authenticated;
