-- ============================================================================
-- REAL-TIME SLOT TRACKING TABLE
-- Tracks slot availability changes with timestamps for real-time updates
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.slot_updates (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  barberid BIGINT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('available', 'taken', 'released')),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  reason TEXT DEFAULT 'booking_created', -- booking_created, booking_cancelled, etc
  createdat TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- CREATE INDEXES FOR FAST LOOKUPS
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_slot_updates_date_barber ON public.slot_updates(date, barberid, createdat DESC);
CREATE INDEX IF NOT EXISTS idx_slot_updates_timestamp ON public.slot_updates(createdat DESC);
CREATE INDEX IF NOT EXISTS idx_slot_updates_booking ON public.slot_updates(booking_id);

-- ============================================================================
-- ENABLE REAL-TIME POSTGRES UPDATES FOR SUPABASE REALTIME
-- ============================================================================
ALTER TABLE public.slot_updates REPLICA IDENTITY FULL;

-- Enable Realtime for this table (Supabase specific)
ALTER PUBLICATION supabase_realtime ADD TABLE public.slot_updates;

-- ============================================================================
-- TRIGGER TO AUTO-LOG SLOT CHANGES ON BOOKING INSERT
-- ============================================================================
CREATE OR REPLACE FUNCTION public.log_slot_taken()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if booking is being created (not updated)
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.slot_updates (date, time, barberid, status, booking_id, reason)
    VALUES (NEW.date, NEW.time, NEW.barberid, 'taken', NEW.id, 'booking_created')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_log_slot_taken ON public.bookings;

CREATE TRIGGER trigger_log_slot_taken
AFTER INSERT ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.log_slot_taken();

-- ============================================================================
-- FUNCTION TO GET RECENT SLOT CHANGES (last 5 minutes)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_recent_slot_changes(p_date DATE, p_barber_id BIGINT)
RETURNS TABLE("time" TIME, status TEXT, changed_at TIMESTAMP WITH TIME ZONE) AS $$
SELECT 
  "time",
  status,
  createdat
FROM public.slot_updates
WHERE date = p_date 
  AND barberid = p_barber_id
  AND createdat > NOW() - INTERVAL '5 minutes'
ORDER BY createdat DESC;
$$ LANGUAGE sql;
