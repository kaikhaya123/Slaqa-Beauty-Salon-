-- ============================================================================
-- DIAGNOSTIC: Check Queue Number Issues
-- ============================================================================

-- 1. See all bookings for a specific date and barber
-- Replace 'YYYY-MM-DD' with your date, and 'Franky' with your barber name
SELECT 
  bookingid,
  date,
  time,
  barber,
  barberid,
  queuenumber,
  status,
  createdat
FROM bookings
WHERE date = '2026-02-16'  -- Change this to your test date
  AND LOWER(barber) = LOWER('Franky')  -- Change this to your barber
ORDER BY createdat DESC;

-- 2. Count bookings per day per barber (to see the actual queue count)
SELECT 
  date,
  barber,
  COUNT(*) as booking_count,
  STRING_AGG(queuenumber, ', ' ORDER BY queuenumber) as queue_numbers
FROM bookings
WHERE status IN ('pending', 'confirmed')
  AND date >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY date, barber
ORDER BY date DESC, barber;

-- 3. Find if there are old test bookings that should be deleted
SELECT 
  COUNT(*) as total_bookings,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
  COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_count,
  MIN(date) as oldest_booking_date,
  MAX(date) as newest_booking_date
FROM bookings;

-- 4. If you want to clean up old test bookings from past dates:
-- UNCOMMENT TO DELETE (BE CAREFUL!)
-- DELETE FROM bookings WHERE date < CURRENT_DATE;

-- 5. If you want to reset queue numbers for today:
-- UNCOMMENT TO RESET (BE CAREFUL!)
-- UPDATE bookings SET queuenumber = NULL WHERE date = CURRENT_DATE;
