-- Add email column to users for Supabase auth linkage
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS email text;
CREATE UNIQUE INDEX IF NOT EXISTS users_email_key ON public.users (lower(email));
