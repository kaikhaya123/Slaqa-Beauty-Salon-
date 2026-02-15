-- ============================================================================
-- DEBUG: Check time format issues for Feb 16
-- ============================================================================

-- 1. See exact time format in bookings table
SELECT 
  bookingid,
  date,
  time,
  LENGTH(time::text) as time_length,
  time::text as time_as_text,
  SUBSTRING(time::text, 1, 5) as time_truncated,
  barber,
  barberid,
  status
FROM bookings
WHERE date = '2026-02-16'
ORDER BY time;

-- 2. Check if any records exist in slot_updates
SELECT 
  id,
  date,
  "time",
  barberid,
  status,
  createdat
FROM slot_updates
WHERE date = '2026-02-16'
ORDER BY createdat DESC;

-- 3. Test the exact query the API uses
SELECT time, barber
FROM bookings
WHERE date = '2026-02-16'
  AND status IN ('pending', 'confirmed')
  AND barberid = 1; -- Change this to your barber ID

-- 4. See all time slots formatted correctly
SELECT 
  bookingid,
  date,
  CASE 
    WHEN LENGTH(time::text) >= 5 THEN SUBSTRING(time::text, 1, 5)
    ELSE time::text
  END as formatted_time,
  barber,
  status
FROM bookings
WHERE date = '2026-02-16';
