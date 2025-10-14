/*
  # Create Food Requests Table

  1. New Tables
    - `requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `organization_name` (text)
      - `people_count` (integer)
      - `location` (text)
      - `needed_by` (timestamptz)
      - `urgency` (text)
      - `preferences` (text, nullable)
      - `contact` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `requests` table
    - Add policies for authenticated users to:
      - View all requests (NGOs need to see all requests)
      - Create their own requests
      - Update their own requests
      - Delete their own requests
*/

CREATE TABLE IF NOT EXISTS public.requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  organization_name TEXT NOT NULL,
  people_count INTEGER NOT NULL,
  location TEXT NOT NULL,
  needed_by TIMESTAMP WITH TIME ZONE NOT NULL,
  urgency TEXT NOT NULL,
  preferences TEXT,
  contact TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view all requests"
ON public.requests
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can create their own requests"
ON public.requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests"
ON public.requests
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own requests"
ON public.requests
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE TRIGGER update_requests_updated_at
BEFORE UPDATE ON public.requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
