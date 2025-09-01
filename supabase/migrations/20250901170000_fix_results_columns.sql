-- Add missing columns to results table if they don't exist
DO $$
BEGIN
    -- Add total_points column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'results' AND column_name = 'total_points') THEN
        ALTER TABLE public.results ADD COLUMN total_points INTEGER DEFAULT 0;
    END IF;
    
    -- Add completion_time column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'results' AND column_name = 'completion_time') THEN
        ALTER TABLE public.results ADD COLUMN completion_time INTEGER DEFAULT 0;
    END IF;
END $$;

-- Add comments to describe the columns
COMMENT ON COLUMN public.results.score IS 'Number of correct answers (out of total questions)';
COMMENT ON COLUMN public.results.total_points IS 'Total points including time-based bonus (50 base + up to 50 time bonus per correct answer)';
COMMENT ON COLUMN public.results.completion_time IS 'Total time in seconds to complete the quiz';
