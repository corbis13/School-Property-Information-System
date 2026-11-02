-- Focused asset-table migration. For the complete app policy set, run the
-- updated supabase-setup.sql file as well.

alter table public.assets enable row level security;

drop policy if exists "Allow public read access to assets" on public.assets;
drop policy if exists "Allow authenticated read access to assets" on public.assets;
create policy "Allow authenticated read access to assets" on public.assets
  for select to authenticated using (true);

drop policy if exists "Allow public insert access to assets" on public.assets;
drop policy if exists "Allow public update access to assets" on public.assets;
drop policy if exists "Allow public delete access to assets" on public.assets;
drop policy if exists "Allow authenticated insert access to assets" on public.assets;
drop policy if exists "Allow authenticated update access to assets" on public.assets;
drop policy if exists "Allow authenticated delete access to assets" on public.assets;

create policy "Allow authenticated insert access to assets" on public.assets
  for insert to authenticated with check (true);

create policy "Allow authenticated update access to assets" on public.assets
  for update to authenticated using (true) with check (true);

create policy "Allow authenticated delete access to assets" on public.assets
  for delete to authenticated using (true);

create or replace function public.get_public_asset_qr(asset_lookup text)
returns table (
  asset_id text,
  property_no text,
  inventory_type text,
  item_classification text,
  item_brand_model text,
  status text
)
language sql
stable
security definer
set search_path = ''
as $$
  select a.asset_id, a.property_no, a.inventory_type,
         a.item_classification, a.item_brand_model, a.status
  from public.assets as a
  where a.asset_id = asset_lookup or a.property_no = asset_lookup
  limit 1;
$$;

revoke all on function public.get_public_asset_qr(text) from public;
grant execute on function public.get_public_asset_qr(text) to anon, authenticated;

notify pgrst, 'reload schema';
