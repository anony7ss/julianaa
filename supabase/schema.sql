create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  color text,
  created_at timestamptz not null default now()
);

create table if not exists public.authors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  subtitle text,
  content text not null,
  cover_image_url text,
  category_id uuid references public.categories(id) on delete set null,
  author_id uuid references public.authors(id) on delete set null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  views integer not null default 0 check (views >= 0),
  featured boolean not null default false,
  breaking_news boolean not null default false,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz,
  scheduled_at timestamptz
);

alter table public.posts
  add column if not exists scheduled_at timestamptz;

create table if not exists public.admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete set null,
  admin_name text,
  action text not null,
  resource_type text not null,
  resource_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.love_quotes (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.rankings (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.ranking_items (
  id uuid primary key default gen_random_uuid(),
  ranking_id uuid not null references public.rankings(id) on delete cascade,
  position integer not null check (position > 0),
  title text,
  description text
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create index if not exists posts_status_published_at_idx
  on public.posts (status, published_at desc)
  where status = 'published';

create index if not exists posts_featured_published_idx
  on public.posts (published_at desc)
  where status = 'published' and featured = true;

create index if not exists posts_breaking_published_idx
  on public.posts (published_at desc)
  where status = 'published' and breaking_news = true;

create index if not exists posts_category_id_idx on public.posts (category_id);
create index if not exists posts_author_id_idx on public.posts (author_id);
create index if not exists posts_scheduled_at_idx on public.posts (scheduled_at);
create index if not exists timeline_events_event_date_idx on public.timeline_events (event_date);
create index if not exists ranking_items_ranking_position_idx
  on public.ranking_items (ranking_id, position);
create index if not exists admin_audit_logs_created_at_idx
  on public.admin_audit_logs (created_at desc);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.authors enable row level security;
alter table public.posts enable row level security;
alter table public.love_quotes enable row level security;
alter table public.timeline_events enable row level security;
alter table public.rankings enable row level security;
alter table public.ranking_items enable row level security;
alter table public.admin_audit_logs enable row level security;

drop policy if exists "profiles_select_own_or_admin" on public.profiles;
create policy "profiles_select_own_or_admin"
on public.profiles for select
to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles_admin_manage" on public.profiles;
create policy "profiles_admin_manage"
on public.profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "categories_public_read" on public.categories;
create policy "categories_public_read"
on public.categories for select
to anon, authenticated
using (true);

drop policy if exists "categories_admin_manage" on public.categories;
create policy "categories_admin_manage"
on public.categories for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "authors_public_read" on public.authors;
create policy "authors_public_read"
on public.authors for select
to anon, authenticated
using (true);

drop policy if exists "authors_admin_manage" on public.authors;
create policy "authors_admin_manage"
on public.authors for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "posts_public_read_published" on public.posts;
create policy "posts_public_read_published"
on public.posts for select
to anon, authenticated
using (status = 'published' and (scheduled_at is null or scheduled_at <= now()));

drop policy if exists "posts_admin_manage" on public.posts;
create policy "posts_admin_manage"
on public.posts for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "quotes_public_read_active" on public.love_quotes;
create policy "quotes_public_read_active"
on public.love_quotes for select
to anon, authenticated
using (active = true);

drop policy if exists "quotes_admin_manage" on public.love_quotes;
create policy "quotes_admin_manage"
on public.love_quotes for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "timeline_public_read" on public.timeline_events;
create policy "timeline_public_read"
on public.timeline_events for select
to anon, authenticated
using (true);

drop policy if exists "timeline_admin_manage" on public.timeline_events;
create policy "timeline_admin_manage"
on public.timeline_events for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "rankings_public_read" on public.rankings;
create policy "rankings_public_read"
on public.rankings for select
to anon, authenticated
using (true);

drop policy if exists "rankings_admin_manage" on public.rankings;
create policy "rankings_admin_manage"
on public.rankings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "ranking_items_public_read" on public.ranking_items;
create policy "ranking_items_public_read"
on public.ranking_items for select
to anon, authenticated
using (true);

drop policy if exists "ranking_items_admin_manage" on public.ranking_items;
create policy "ranking_items_admin_manage"
on public.ranking_items for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "admin_audit_logs_admin_read" on public.admin_audit_logs;
create policy "admin_audit_logs_admin_read"
on public.admin_audit_logs for select
to authenticated
using (public.is_admin());

drop policy if exists "admin_audit_logs_admin_insert" on public.admin_audit_logs;
create policy "admin_audit_logs_admin_insert"
on public.admin_audit_logs for insert
to authenticated
with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-covers',
  'post-covers',
  true,
  5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "post_covers_public_read" on storage.objects;
create policy "post_covers_public_read"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'post-covers');

drop policy if exists "post_covers_admin_insert" on storage.objects;
create policy "post_covers_admin_insert"
on storage.objects for insert
to authenticated
with check (bucket_id = 'post-covers' and public.is_admin());

drop policy if exists "post_covers_admin_update" on storage.objects;
create policy "post_covers_admin_update"
on storage.objects for update
to authenticated
using (bucket_id = 'post-covers' and public.is_admin())
with check (bucket_id = 'post-covers' and public.is_admin());

drop policy if exists "post_covers_admin_delete" on storage.objects;
create policy "post_covers_admin_delete"
on storage.objects for delete
to authenticated
using (bucket_id = 'post-covers' and public.is_admin());
