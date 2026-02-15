-- ============================================================================
-- DELETE Feb 16, 2026 bookings
-- ============================================================================

-- 1. Preview what will be deleted (RUN THIS FIRST)
SELECT 
  bookingid,
  date,
  time,
  barber,
  queuenumber,
  status,
  name
FROM bookings
WHERE date = '2026-02-16';

-- 2. DELETE all Feb 16 bookings (UNCOMMENT TO RUN)
DELETE FROM bookings WHERE date = '2026-02-16';

-- 3. Verify deletion
SELECT COUNT(*) as remaining_bookings FROM bookings WHERE date = '2026-02-16';
