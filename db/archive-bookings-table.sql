-- ============================================================================
-- ARCHIVED BOOKINGS TABLE - FOR HISTORICAL DATA PRESERVATION
-- ============================================================================
-- Purpose: Store old bookings for reporting and analytics
-- This table mirrors the bookings table structure but without date constraints
-- Use the archive API to move old bookings here to keep active bookings clean
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.archived_bookings (
  -- Primary identification
  id UUID PRIMARY KEY,
  bookingid TEXT UNIQUE,
  
  -- Customer information
  name TEXT,
  email TEXT,
  phone TEXT,
  
  -- Service information
  service TEXT,
  serviceid BIGINT REFERENCES public.services(id) ON DELETE SET NULL,
  
  -- Appointment date and time
  date DATE,
  time TIME,
  
  -- Barber assignment
  barber TEXT,
  barberid BIGINT REFERENCES public.barbers(id) ON DELETE SET NULL,
  
  -- Status fields
  status TEXT,
  paymentstatus TEXT,
  
  -- Additional fields
  notes TEXT,
  raw TEXT,
  source TEXT,
  
  -- Original timestamps
  createdat TIMESTAMP WITH TIME ZONE,
  updatedat TIMESTAMP WITH TIME ZONE,
  
  -- Archive metadata
  archived_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  archived_by TEXT DEFAULT 'admin'
);

-- ============================================================================
-- INDEXES FOR ARCHIVED BOOKINGS
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_archived_bookings_date ON public.archived_bookings(date);
CREATE INDEX IF NOT EXISTS idx_archived_bookings_status ON public.archived_bookings(status);
CREATE INDEX IF NOT EXISTS idx_archived_bookings_phone ON public.archived_bookings(phone);
CREATE INDEX IF NOT EXISTS idx_archived_bookings_archived_at ON public.archived_bookings(archived_at);

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES FOR ARCHIVED BOOKINGS
-- ============================================================================
ALTER TABLE public.archived_bookings ENABLE ROW LEVEL SECURITY;

-- Allow admins to read archived bookings
CREATE POLICY "Admins can read archived bookings"
  ON public.archived_bookings
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Allow admins to insert (through archive operation)
CREATE POLICY "Admins can insert archived bookings"
  ON public.archived_bookings
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Check archived bookings count
-- SELECT COUNT(*), status, date FROM public.archived_bookings GROUP BY status, date ORDER BY date DESC;

-- View recent archives
-- SELECT * FROM public.archived_bookings ORDER BY archived_at DESC LIMIT 10;

-- Check archiving by date range
-- SELECT COUNT(*), DATE_TRUNC('month', date) as month FROM public.archived_bookings GROUP BY month ORDER BY month DESC;
