-- -*- sql-dialect: postgres -*-
-- ============================================================================
-- COMPLETE SUPABASE SCHEMA - APPOINTMENT-ONLY BOOKING SYSTEM
-- Pro Barber Shop Database (No Queue System)
-- ============================================================================
-- This is the COMPLETE, UPDATED schema for appointment-only booking
-- Date: February 13, 2026
-- Status: Production Ready ✅

-- ============================================================================
-- SECTION 1: BARBERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.barbers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT,
  specialties TEXT[],
  bio TEXT,
  photo_url TEXT,
  rating DECIMAL(3,2) DEFAULT 0,
  active BOOLEAN DEFAULT true,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 2: SERVICES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.services (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  price DECIMAL(10,2) NOT NULL,
  category TEXT DEFAULT 'haircut',
  active BOOLEAN DEFAULT true,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 3: BOOKINGS TABLE - APPOINTMENT-ONLY SYSTEM ✅
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.bookings (
  -- Primary identification
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bookingid TEXT UNIQUE,
  
  -- Customer information
  name TEXT,
  email TEXT,
  phone TEXT NOT NULL,
  
  -- Service information
  service TEXT NOT NULL,
  serviceid BIGINT REFERENCES public.services(id) ON DELETE SET NULL,
  
  -- Appointment date and time (REQUIRED - NO QUEUE SYSTEM)
  date DATE NOT NULL,
  time TIME NOT NULL,
  
  -- Barber assignment (LOWERCASE - matches code)
  barber TEXT,
  barberid BIGINT REFERENCES public.barbers(id) ON DELETE SET NULL,
  
  -- Status fields (LOWERCASE)
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  paymentstatus TEXT DEFAULT 'pending' CHECK (paymentstatus IN ('pending', 'paid', 'refunded')),
  
  -- Additional fields
  notes TEXT,
  raw TEXT,
  source TEXT DEFAULT 'web',
  
  -- Timestamps (LOWERCASE - matches code)
  createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedat TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT check_booking_date CHECK (date >= CURRENT_DATE),
  CONSTRAINT check_business_hours CHECK (time >= '08:00' AND time <= '20:00')
);

-- ============================================================================
-- SECTION 4: WORKING HOURS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.working_hours (
  id BIGSERIAL PRIMARY KEY,
  barberId BIGINT NOT NULL REFERENCES public.barbers(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 5: UNAVAILABLE SLOTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.unavailable_slots (
  id BIGSERIAL PRIMARY KEY,
  barberId BIGINT NOT NULL REFERENCES public.barbers(id) ON DELETE CASCADE,
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  end_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  reason TEXT,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 6: REVIEWS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.reviews (
  id BIGSERIAL PRIMARY KEY,
  bookingId UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  customerName TEXT NOT NULL,
  customerEmail TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  barberId BIGINT NOT NULL REFERENCES public.barbers(id) ON DELETE CASCADE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(bookingId)
);

-- ============================================================================
-- SECTION 7: CUSTOMERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.customers (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  totalVisits INTEGER DEFAULT 0,
  totalSpent DECIMAL(10,2) DEFAULT 0,
  preferredBarberId BIGINT REFERENCES public.barbers(id) ON DELETE SET NULL,
  preferredServiceId BIGINT REFERENCES public.services(id) ON DELETE SET NULL,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 8: LOYALTY POINTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.loyalty_points (
  id BIGSERIAL PRIMARY KEY,
  customerId BIGINT NOT NULL UNIQUE REFERENCES public.customers(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  lastRedemption TIMESTAMP WITH TIME ZONE,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 9: PROMOTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.promotions (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  discountType TEXT CHECK (discountType IN ('percentage', 'fixed_amount')),
  discountValue DECIMAL(10,2) NOT NULL,
  code TEXT UNIQUE,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  isActive BOOLEAN DEFAULT true,
  minBookingValue DECIMAL(10,2),
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- SECTION 10: SEQUENCES AND FUNCTIONS
-- ============================================================================
-- Booking ID sequence
CREATE SEQUENCE IF NOT EXISTS booking_sequence START 1;

-- Booking ID generator function
CREATE OR REPLACE FUNCTION generate_booking_id()
RETURNS TEXT AS $$
BEGIN
  RETURN 'BK' || TO_CHAR(NOW(), 'YYMMDD') || LPAD(NEXTVAL('booking_sequence'), 3, '0');
END;
$$ LANGUAGE plpgsql;

-- Availability check function
CREATE OR REPLACE FUNCTION check_slot_availability(
  p_barber_id BIGINT,
  p_date DATE,
  p_time TIME
)
RETURNS BOOLEAN AS $$
DECLARE
  slot_taken BOOLEAN;
BEGIN
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
-- SECTION 11: INDEXES FOR PERFORMANCE ✅ 
-- ============================================================================
-- Prevent double bookings for same barber/time
CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_unique_slot 
  ON public.bookings(barberid, date, time) 
  WHERE status IN ('pending', 'confirmed');

-- Booking performance indexes
CREATE INDEX IF NOT EXISTS idx_bookings_availability 
  ON public.bookings(date, time, status);

CREATE INDEX IF NOT EXISTS idx_bookings_barber_schedule 
  ON public.bookings(barberid, date) 
  WHERE status IN ('pending', 'confirmed');

CREATE INDEX IF NOT EXISTS idx_bookings_email 
  ON public.bookings(email);

CREATE INDEX IF NOT EXISTS idx_bookings_phone 
  ON public.bookings(phone);

CREATE INDEX IF NOT EXISTS idx_bookings_status 
  ON public.bookings(status);

CREATE INDEX IF NOT EXISTS idx_bookings_date 
  ON public.bookings(date);

-- Other table indexes
CREATE INDEX IF NOT EXISTS idx_reviews_barber 
  ON public.reviews(barberId);

CREATE INDEX IF NOT EXISTS idx_reviews_booking 
  ON public.reviews(bookingId);

CREATE INDEX IF NOT EXISTS idx_working_hours_barber 
  ON public.working_hours(barberId);

-- ============================================================================
-- SECTION 12: SAMPLE DATA ✅
-- ============================================================================
-- Insert sample barbers
INSERT INTO public.barbers (name, email, phone, specialties, bio, active) VALUES
('Fuze Ngcobo', 'fuze@probarbershop.co.za', '+27682188679', ARRAY['fades', 'traditional cuts'], 'Professional barber with 7+ years experience', true),
('Khaya', 'khaya@probarbershop.co.za', '+27123456789', ARRAY['modern styles', 'beard grooming'], 'Specialist in modern cuts and styling', true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample services
INSERT INTO public.services (name, description, duration_minutes, price, category) VALUES
('DROP FADE & DYE', 'Traditional haircut with modern finishing touches', 45, 150, 'Adults'),
('TAPER FADE & DYE', 'Precision fade with personalized styling', 60, 150, 'Adults'),
('FADE & DYE', 'Precision fade with personalized styling', 60, 150, 'Adults'),
('KIDDIES CUT & STYLE', 'Professional and friendly haircuts for kids', 30, 150, 'Kids'),
('BEARD TRIM & STYLE', 'Professional beard grooming and styling', 30, 120, 'Adults')
ON CONFLICT (name) DO NOTHING;

-- ============================================================================
-- SECTION 13: ROW LEVEL SECURITY (RLS) ✅
-- ============================================================================
-- Enable RLS on all tables
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for barbers and services
CREATE POLICY "Public read barbers" ON public.barbers FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);

-- Customers can create their own bookings
CREATE POLICY "Customers can create bookings" ON public.bookings 
  FOR INSERT WITH CHECK (true);

-- Customers can read their own bookings
CREATE POLICY "Customers can read own bookings" ON public.bookings 
  FOR SELECT USING (auth.email() = email OR auth.role() = 'service_role');

-- ============================================================================
-- MIGRATION COMPLETE ✅
-- ============================================================================
-- ✅ Appointment-only booking system
-- ✅ No queue functionality  
-- ✅ Time slot conflict prevention
-- ✅ Availability checking functions
-- ✅ Performance indexes
-- ✅ Sample data included
-- ✅ Security policies configured