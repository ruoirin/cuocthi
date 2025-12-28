-- Drop the permissive INSERT and UPDATE policies
-- All modifications should go through the increment_download_count() RPC function
DROP POLICY "Anyone can insert download counts" ON public.resource_downloads;
DROP POLICY "Anyone can increment download counts" ON public.resource_downloads;