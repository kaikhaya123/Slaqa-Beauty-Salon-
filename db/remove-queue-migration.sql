-- ============================================================================
-- REMOVE QUEUE SYSTEM MIGRATION
-- Pro Barber Shop Database - Updated for Appointment-Only System
-- ============================================================================
-- This migration removes queue functionality and focuses on appointment booking
-- Date: February 13, 2026
-- Purpose: Simplify booking system to appointment-only model

-- ============================================================================
-- STEP 1: DROP QUEUE-RELATED INDEXES
-- ============================================================================
DROP INDEX IF EXISTS public.idx_bookings_queuenumber;

-- ============================================================================
-- STEP 2: REMOVE QUEUE NUMBER COLUMN
-- ============================================================================
ALTER TABLE public.bookings DROP COLUMN IF EXISTS queuenumber;

-- ============================================================================ 
-- STEP 3: ADD UNIQUE CONSTRAINT FOR TIME SLOT BOOKING
-- ============================================================================
-- Prevent double bookings for the same barber at the same time
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_unique_slot 
  ON public.bookings(barberid, date, time) 
  WHERE status IN ('pending', 'confirmed');

-- ============================================================================
-- STEP 4: ADD APPOINTMENT-SPECIFIC INDEXES
-- ============================================================================
-- Index for checking availability by date and time
CREATE INDEX IF NOT EXISTS idx_bookings_availability 
  ON public.bookings(date, time, status);

-- Index for barber schedule lookup  
CREATE INDEX IF NOT EXISTS idx_bookings_barber_schedule 
  ON public.bookings(barberid, date) 
  WHERE status IN ('pending', 'confirmed');

-- ============================================================================
-- STEP 5: UPDATE BOOKING ID GENERATION (Remove queue prefix)
-- ============================================================================
-- Create a simple booking ID generator function
CREATE OR REPLACE FUNCTION generate_booking_id()
RETURNS TEXT AS $$
BEGIN
  RETURN 'BK' || TO_CHAR(NOW(), 'YYMMDD') || LPAD(NEXTVAL('booking_sequence'), 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Create sequence for booking IDs
CREATE SEQUENCE IF NOT EXISTS booking_sequence START 1;

-- ============================================================================
-- STEP 6: UPDATE EXISTING DATA
-- ============================================================================
-- Update existing bookings to have clean booking IDs without queue numbers
UPDATE public.bookings 
SET bookingid = generate_booking_id() 
WHERE bookingid IS NULL OR bookingid LIKE '%FN-%' OR bookingid LIKE '%KH-%' OR bookingid LIKE '%GN-%';

-- ============================================================================
-- STEP 7: ADD BOOKING CONSTRAINTS
-- ============================================================================
-- Add constraint to prevent booking in the past (except for today)
ALTER TABLE public.bookings 
ADD CONSTRAINT check_booking_date 
CHECK (date >= CURRENT_DATE);

-- Add constraint for business hours
ALTER TABLE public.bookings 
ADD CONSTRAINT check_business_hours 
CHECK (time >= '08:00' AND time <= '20:00');

-- ============================================================================
-- STEP 8: CREATE AVAILABILITY CHECK FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION check_slot_availability(
  p_barber_id BIGINT,
  p_date DATE,
  p_time TIME
)
RETURNS BOOLEAN AS $$
DECLARE
  slot_taken BOOLEAN;
BEGIN
  -- Check if slot is already booked
  SELECT EXISTS(
    SELECT 1 FROM public.bookings 
    WHERE barberid = p_barber_id 
    AND date = p_date 
    AND time = p_time 
    AND status IN ('pending', 'confirmed')
  ) INTO slot_taken;
  
  RETURN NOT slot_taken;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- MIGRATION COMPLETE 
-- ============================================================================
-- Queue system removed ✅
-- Appointment-only booking system ready ✅
-- Time slot conflicts prevented ✅
-- Availability checking enabled ✅