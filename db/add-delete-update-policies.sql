-- ============================================================================
-- ADD DELETE AND UPDATE POLICIES FOR ADMIN ACCESS
-- ============================================================================
-- This migration adds Row Level Security policies to allow admins to delete
-- and update bookings data. Previously only INSERT and SELECT were allowed.
-- 
-- Run this in your Supabase SQL Editor
-- ============================================================================

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Admins can delete bookings" ON public.bookings;
DROP POLICY IF EXISTS "Admins can update bookings" ON public.bookings;

-- Add DELETE policy for service_role (admin access)
CREATE POLICY "Admins can delete bookings" ON public.bookings 
  FOR DELETE 
  USING (auth.role() = 'service_role');

-- Add UPDATE policy for service_role (admin access)
CREATE POLICY "Admins can update bookings" ON public.bookings 
  FOR UPDATE 
  USING (auth.role() = 'service_role');

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- After running this migration, verify policies exist:
-- 
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd 
-- FROM pg_policies 
-- WHERE tablename = 'bookings';
-- 
-- You should see:
-- - "Customers can create bookings" (FOR INSERT)
-- - "Customers can read own bookings" (FOR SELECT)
-- - "Admins can delete bookings" (FOR DELETE) ← NEW
-- - "Admins can update bookings" (FOR UPDATE) ← NEW
-- ============================================================================

-- Optional: Add policy to allow deletion of old/completed bookings
-- Uncomment if you want automatic cleanup capability:
-- 
-- CREATE POLICY "Allow delete old bookings" ON public.bookings 
--   FOR DELETE 
--   USING (
--     date < CURRENT_DATE - INTERVAL '30 days' OR 
--     status IN ('completed', 'cancelled')
--   );
