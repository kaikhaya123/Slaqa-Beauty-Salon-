# 📦 Booking Archive System Guide

## Overview
The archive system allows you to move old bookings from the active `bookings` table to the `archived_bookings` table. This keeps your active bookings list clean and fast while preserving historical data for reporting and analytics.

---

## ⚙️ Setup (One-Time)

### Step 1: Run SQL Migration
Open Supabase SQL Editor and run the migration:

```bash
# In Supabase Dashboard:
1. Go to SQL Editor
2. Click "New Query"
3. Copy/paste contents of: db/archive-bookings-table.sql
4. Click "Run"
```

This creates:
- `archived_bookings` table (same structure as bookings)
- Indexes for performance
- RLS policies for security

### Step 2: Environment Variable
Add to `.env.local`:

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Find your service role key in:
- Supabase Dashboard → Settings → API → service_role key (secret)

---

## 🎯 How to Use

### From Admin Dashboard

1. **Go to Bookings Page** (`/admin/bookings`)
2. **Locate "Archive Old Bookings" Section** (orange box)
3. **Select Age**: Choose how old bookings should be (30, 60, 90 days, etc.)
4. **Optional Status Filter**: Archive only specific status (completed, cancelled, etc.)
5. **Click "Preview"**: See how many bookings will be archived
6. **Click "Archive"**: Confirm and move bookings to archive

### Archive Workflow

```
Select criteria → Preview count → Confirm → Bookings moved to archive
```

**Safety Features:**
- Preview before archiving (shows exact count)
- Confirmation modal prevents accidents
- Bookings are copied to archive BEFORE deletion
- If copy fails, nothing is deleted

---

## 📊 API Usage

### Preview Archive (GET)
```javascript
// Preview bookings that will be archived
const response = await fetch('/api/admin/bookings/archive?olderThanDays=90&status=completed')
const data = await response.json()

console.log(data.count) // Number of bookings
console.log(data.bookings) // Array of booking objects
```

**Query Parameters:**
- `olderThanDays` - Archive bookings older than N days
- `beforeDate` - Archive bookings before specific date (YYYY-MM-DD)
- `status` - Filter by status (optional)

### Archive Bookings (POST)
```javascript
// Archive bookings
const response = await fetch('/api/admin/bookings/archive', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    olderThanDays: 90,
    status: 'completed' // optional
  })
})

const result = await response.json()
console.log(result.archivedCount) // Number archived
console.log(result.message) // Success message
```

**Request Body:**
- `olderThanDays` OR `beforeDate` (required)
- `status` - Filter by status (optional)

---

## 🗄️ Database Schema

### archived_bookings Table
```sql
- id (UUID) - Original booking ID
- All original booking fields preserved
- archived_at (TIMESTAMP) - When it was archived
- archived_by (TEXT) - Who archived it (default: 'admin')
```

### Indexes
- `date` - Fast filtering by date
- `status` - Fast filtering by status
- `phone` - Fast customer lookup
- `archived_at` - Fast sorting by archive date

---

## 🔍 Querying Archived Data

### Recent Archives
```sql
SELECT * FROM archived_bookings 
ORDER BY archived_at DESC 
LIMIT 10;
```

### Monthly Summary
```sql
SELECT 
  COUNT(*), 
  status,
  DATE_TRUNC('month', date) as month 
FROM archived_bookings 
GROUP BY status, month 
ORDER BY month DESC;
```

### Customer History
```sql
SELECT * FROM archived_bookings 
WHERE phone = '+27123456789'
ORDER BY date DESC;
```

### Revenue Report (Archived)
```sql
SELECT 
  service,
  COUNT(*) as total_bookings,
  DATE_TRUNC('month', date) as month
FROM archived_bookings
WHERE status = 'completed'
GROUP BY service, month
ORDER BY month DESC, total_bookings DESC;
```

---

## 🔒 Security

### Row Level Security (RLS)
- ✅ RLS enabled on `archived_bookings`
- ✅ Only admins (service_role) can read/write
- ✅ API uses service_role key (bypasses customer RLS)

### Best Practices
1. **Never share service_role key** - Keep in `.env.local` only
2. **Regular archives** - Schedule monthly or quarterly
3. **Backup first** - Take Supabase backup before large archives
4. **Test on staging** - Try with small date range first

---

## 📅 Recommended Archive Schedule

### Option 1: Monthly Cleanup
```
Archive completed/cancelled bookings older than 60 days
Run on 1st of each month
```

### Option 2: Quarterly Deep Clean
```
Archive all bookings older than 90 days
Run quarterly (Jan 1, Apr 1, Jul 1, Oct 1)
```

### Option 3: Status-Based
```
Completed: Archive after 30 days
Cancelled: Archive after 14 days
Pending/Confirmed: Keep indefinitely (or manual review)
```

---

## 🚀 Automated Archiving (Optional)

### Supabase Edge Function (Cron)
Create a scheduled function to auto-archive:

```typescript
// supabase/functions/auto-archive/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  // Archive completed bookings older than 60 days
  const response = await fetch('https://your-site.com/api/admin/bookings/archive', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('SERVICE_ROLE_KEY')}`
    },
    body: JSON.stringify({
      olderThanDays: 60,
      status: 'completed'
    })
  })
  
  return new Response(JSON.stringify(await response.json()))
})
```

Schedule in Supabase Dashboard:
- Go to Database → Cron Jobs
- Create job to run monthly

---

## 🛠️ Troubleshooting

### "Service role key not configured"
- Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Restart Next.js dev server

### "Failed to preview archive"
- Check Supabase connection
- Verify table exists (run migration)
- Check browser console for errors

### "Archived but failed to delete"
- Bookings copied to archive successfully
- Manual cleanup needed: Note the IDs and delete from Supabase dashboard

### No bookings found
- Check date range (bookings might not be old enough)
- Verify status filter matches your data
- Run preview to see exact criteria

---

## 📈 Benefits

✅ **Performance**: Active bookings load faster
✅ **Organization**: Clean separation of current vs historical
✅ **Reporting**: Preserved data for analytics
✅ **Safety**: Preview before archiving
✅ **Flexibility**: Filter by age and status
✅ **Compliance**: Data retention for records

---

## 🔄 Restore from Archive (if needed)

If you need to restore archived bookings:

```sql
-- View archived booking
SELECT * FROM archived_bookings WHERE id = 'booking-uuid';

-- Restore specific booking
INSERT INTO bookings 
SELECT 
  id, bookingid, name, email, phone, service, serviceid,
  date, time, barber, barberid, status, paymentstatus,
  notes, raw, source, createdat, updatedat
FROM archived_bookings 
WHERE id = 'booking-uuid';

-- Delete from archive
DELETE FROM archived_bookings WHERE id = 'booking-uuid';
```

---

## 📞 Support

If you encounter issues:
1. Check error messages in browser console
2. Verify Supabase dashboard for table/policy issues
3. Test with small date ranges first
4. Check API logs in Supabase Functions

---

**Happy Archiving! 📦✨**
