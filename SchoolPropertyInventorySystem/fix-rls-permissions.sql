-- ============================================================================
-- RUN THIS IN SUPABASE SQL EDITOR TO FIX UNASSIGNED RECORD UPDATES & SAVING
-- This restores permission for the applet (anon role) to INSERT, UPDATE, and DELETE assets
-- ============================================================================

-- 1. Enable public (anon) write access to assets
drop policy if exists "Allow public insert access to assets" on public.assets;
drop policy if exists "Allow public update access to assets" on public.assets;
drop policy if exists "Allow public delete access to assets" on public.assets;
drop policy if exists "Allow authenticated insert access to assets" on public.assets;
drop policy if exists "Allow authenticated update access to assets" on public.assets;
drop policy if exists "Allow authenticated delete access to assets" on public.assets;

create policy "Allow public insert access to assets" on public.assets
  for insert to anon, authenticated with check (true);

create policy "Allow public update access to assets" on public.assets
  for update to anon, authenticated using (true) with check (true);

create policy "Allow public delete access to assets" on public.assets
  for delete to anon, authenticated using (true);

-- 2. Notify PostgREST to immediately reload schema cache
notify pgrst, 'reload schema';
