-- ============================================================================
-- QUEUE NUMBER FIX - MIGRATION SQL
-- ============================================================================
-- Apply this migration to add queuenumber support to existing bookings table
-- Date: January 15, 2026
--
-- IMPORTANT: Run this in Supabase SQL Editor BEFORE deploying code changes
-- ============================================================================

-- Step 1: Add queuenumber column (if it doesn't already exist)
ALTER TABLE public.bookings
ADD COLUMN IF NOT EXISTS queuenumber VARCHAR(10);

-- Step 2: Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_queuenumber 
ON public.bookings(queuenumber);

-- Step 3: Create composite index for barber + date lookups (used in queue generation)
CREATE INDEX IF NOT EXISTS idx_bookings_barber_date 
ON public.bookings(barber, date);

-- Step 4: Verify the migration was successful
-- Run this query to confirm:
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'bookings' 
-- ORDER BY ordinal_position;
--
-- You should see a row with: queuenumber | character varying | YES
