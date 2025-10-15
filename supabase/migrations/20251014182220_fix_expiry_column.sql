ALTER TABLE public.donations
ALTER COLUMN expiry SET DEFAULT (now() + interval '3 days');
