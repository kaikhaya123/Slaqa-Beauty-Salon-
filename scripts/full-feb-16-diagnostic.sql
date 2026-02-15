-- ============================================================================
-- COMPREHENSIVE DIAGNOSTIC FOR FEB 16 RED SLOT ISSUE
-- ============================================================================

-- STEP 1: Check what barber IDs exist
SELECT DISTINCT barberid, barber 
FROM bookings 
WHERE date = '2026-02-16';

-- STEP 2: See ALL bookings for Feb 16 (with exact time format)
SELECT 
  bookingid,
  date,
  time::text as original_time,
  SUBSTRING(time::text, 1, 5) as time_formatted_hhmmm,
  barber,
  barberid,
  status,
  createdat
FROM bookings
WHERE date = '2026-02-16'
ORDER BY time;

-- STEP 3: Simulate the exact API query (CHANGE barberid to your actual ID)
SELECT 
  SUBSTRING(time::text, 1, 5) as taken_slot
FROM bookings
WHERE date = '2026-02-16'
  AND barberid = 1  -- ⚠️ CHANGE THIS to your barber ID
  AND status IN ('pending', 'confirmed');

-- STEP 4: Check slot_updates table
SELECT * FROM slot_updates 
WHERE date = '2026-02-16' 
ORDER BY createdat DESC;

-- STEP 5: If you want to FORCE delete everything for Feb 16:
-- DELETE FROM bookings WHERE date = '2026-02-16';
-- DELETE FROM slot_updates WHERE date = '2026-02-16';

-- STEP 6: Check if Realtime is enabled
SELECT schemaname, tablename 
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
  AND tablename IN ('bookings', 'slot_updates');
