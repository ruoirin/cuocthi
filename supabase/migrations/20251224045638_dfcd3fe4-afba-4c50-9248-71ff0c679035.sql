-- Create table to track resource download counts
CREATE TABLE public.resource_downloads (
    id SERIAL PRIMARY KEY,
    resource_id INTEGER NOT NULL UNIQUE,
    download_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read download counts (public data)
CREATE POLICY "Anyone can view download counts" 
ON public.resource_downloads 
FOR SELECT 
USING (true);

-- Allow anyone to update download counts (for incrementing)
CREATE POLICY "Anyone can increment download counts" 
ON public.resource_downloads 
FOR UPDATE 
USING (true);

-- Allow inserts for new resources
CREATE POLICY "Anyone can insert download counts" 
ON public.resource_downloads 
FOR INSERT 
WITH CHECK (true);

-- Create function to increment download count
CREATE OR REPLACE FUNCTION public.increment_download_count(p_resource_id INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    new_count INTEGER;
BEGIN
    INSERT INTO public.resource_downloads (resource_id, download_count)
    VALUES (p_resource_id, 1)
    ON CONFLICT (resource_id) 
    DO UPDATE SET 
        download_count = resource_downloads.download_count + 1,
        updated_at = now()
    RETURNING download_count INTO new_count;
    
    RETURN new_count;
END;
$$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_resource_downloads_updated_at
BEFORE UPDATE ON public.resource_downloads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.resource_downloads;