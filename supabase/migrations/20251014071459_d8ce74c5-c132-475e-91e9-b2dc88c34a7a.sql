-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create storage bucket for food images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('food-images', 'food-images', true);

-- Create donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  food_type TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  pickup_location TEXT NOT NULL,
  expiry TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own donations"
ON public.donations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own donations"
ON public.donations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own donations"
ON public.donations
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own donations"
ON public.donations
FOR DELETE
USING (auth.uid() = user_id);

-- Storage policies for food images
CREATE POLICY "Food images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'food-images');

CREATE POLICY "Users can upload food images"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'food-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own food images"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'food-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own food images"
ON storage.objects
FOR DELETE
USING (bucket_id = 'food-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Trigger for updated_at
CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();