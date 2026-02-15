-- ============================================================================
-- CLEANUP: Remove Old Test Bookings (OPTIONAL)
-- ============================================================================

-- WARNING: This will permanently delete data. Review carefully before running!

-- 1. See what will be deleted (RUN THIS FIRST)
SELECT 
  bookingid,
  date,
  barber,
  queuenumber,
  status,
  createdat,
  CASE 
    WHEN date < CURRENT_DATE THEN 'Past date'
    WHEN createdat < NOW() - INTERVAL '30 days' THEN 'Old test booking'
    ELSE 'Keep'
  END as reason
FROM bookings
WHERE date < CURRENT_DATE 
   OR createdat < NOW() - INTERVAL '30 days'
ORDER BY createdat DESC;

-- 2. DELETE old test bookings from past dates (UNCOMMENT TO RUN)
-- DELETE FROM bookings WHERE date < CURRENT_DATE;

-- 3. Or DELETE very old test bookings (30+ days old) (UNCOMMENT TO RUN)
-- DELETE FROM bookings WHERE createdat < NOW() - INTERVAL '30 days';

-- 4. Verify cleanup worked
SELECT 
  COUNT(*) as total_remaining,
  MIN(date) as earliest_booking_date,
  MAX(date) as latest_booking_date,
  MIN(createdat) as oldest_created,
  MAX(createdat) as newest_created
FROM bookings;
