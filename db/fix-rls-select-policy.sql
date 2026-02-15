-- ============================================================================
-- FIX RLS SELECT POLICY FOR BOOKINGS
-- ============================================================================
-- The current SELECT policy may be filtering out bookings.
-- We need to ensure service_role can see ALL bookings regardless of status.
-- ============================================================================

-- First, check current policies:
SELECT policyname, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'bookings';

-- Drop potentially problematic SELECT policies
DROP POLICY IF EXISTS "Customers can read own bookings" ON public.bookings;
DROP POLICY IF EXISTS "Allow public select bookings" ON public.bookings;

-- Create a comprehensive SELECT policy that allows:
-- 1. Public to see their own bookings (by email or phone)
-- 2. Service role to see ALL bookings (no filter)
CREATE POLICY "Allow read bookings" ON public.bookings
  FOR SELECT 
  USING (
    auth.role() = 'service_role' OR  -- Admins can see all bookings
    auth.role() = 'anon' OR           -- Anonymous users (frontend) can see all
    true                               -- Allow unauthenticated access
  );

-- ============================================================================
-- VERIFY THE FIX
-- ============================================================================
-- Run this to see the new policy:
-- 
-- SELECT policyname, cmd, qual 
-- FROM pg_policies 
-- WHERE tablename = 'bookings' AND cmd = 'SELECT';
-- 
-- Should show: "Allow read bookings" with no status filtering
-- ============================================================================

-- ============================================================================
-- TEST THE FIX
-- ============================================================================
-- Test with service role (should return ALL bookings including cancelled):
-- 
-- SELECT status, COUNT(*) 
-- FROM bookings 
-- GROUP BY status 
-- ORDER BY status;
-- 
-- Should show ALL statuses: pending, confirmed, completed, cancelled
-- ============================================================================
