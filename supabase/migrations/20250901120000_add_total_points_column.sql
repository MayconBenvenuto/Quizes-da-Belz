-- Add total_points column to results table for time-based scoring
ALTER TABLE public.results ADD COLUMN total_points INTEGER DEFAULT 0;

-- Add completion_time column to track how long it took to complete the quiz
ALTER TABLE public.results ADD COLUMN completion_time INTEGER DEFAULT 0; -- tempo em segundos

-- Update existing records to calculate total_points based on score
-- Assuming average response time for existing results
UPDATE public.results SET total_points = score * 75 WHERE total_points = 0;

-- Add comments to describe the columns
COMMENT ON COLUMN public.results.score IS 'Number of correct answers (out of total questions)';
COMMENT ON COLUMN public.results.total_points IS 'Total points including time-based bonus (50 base + up to 50 time bonus per correct answer)';
COMMENT ON COLUMN public.results.completion_time IS 'Total time in seconds to complete the quiz';
