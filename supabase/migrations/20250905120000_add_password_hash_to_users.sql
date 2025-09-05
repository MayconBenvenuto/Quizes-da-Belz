-- Add password hash column to users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password_hash text;

-- Optional index if lookups by name become frequent (composite for first/last names)
CREATE INDEX IF NOT EXISTS users_name_idx ON public.users (first_name, last_name);
