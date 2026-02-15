# 🗑️ DELETE BOOKINGS - Setup & Usage Guide

This guide explains how to enable deletion of booking data and use the admin API endpoint.

---

## 📋 **Step 1: Add Database Policies**

### **Run the SQL Migration:**

1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Open the file: `db/add-delete-update-policies.sql`
4. Copy and paste the SQL into the editor
5. Click **Run**

### **What This Does:**
- ✅ Allows admins (service_role) to DELETE bookings
- ✅ Allows admins (service_role) to UPDATE bookings
- ✅ Keeps customer security intact (customers can only read/create their own bookings)

---

## 🔑 **Step 2: Set Environment Variable**

Add your Supabase Service Role Key to your environment:

### **Local Development (.env.local):**
```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### **Where to Find It:**
1. Go to **Supabase Dashboard** → **Settings** → **API**
2. Copy the **service_role** key (NOT the anon key)
3. **⚠️ IMPORTANT:** This key bypasses RLS - never expose it to the client!

### **Production (Vercel/Netlify):**
Add `SUPABASE_SERVICE_ROLE_KEY` to your deployment environment variables.

---

## 🔧 **Step 3: Use the API Endpoint**

### **API Endpoint:**
```
/api/admin/bookings/delete
```

### **Delete Examples:**

#### **1. Delete by Specific Date**
```bash
# Preview what will be deleted (GET)
GET /api/admin/bookings/delete?date=2026-02-15

# Delete (POST)
POST /api/admin/bookings/delete
Content-Type: application/json

{
  "date": "2026-02-15"
}
```

#### **2. Delete All Bookings Before a Date**
```bash
# Delete all bookings before Feb 15, 2026
POST /api/admin/bookings/delete
Content-Type: application/json

{
  "beforeDate": "2026-02-15"
}
```

#### **3. Delete by Status**
```bash
# Delete all cancelled bookings
POST /api/admin/bookings/delete
Content-Type: application/json

{
  "status": "cancelled"
}
```

#### **4. Delete by Booking ID**
```bash
# Delete specific booking
POST /api/admin/bookings/delete
Content-Type: application/json

{
  "bookingId": "550e8400-e29b-41d4-a716-446655440000"
}
```

#### **5. Delete by Multiple Criteria**
```bash
# Delete completed bookings from January
POST /api/admin/bookings/delete
Content-Type: application/json

{
  "status": "completed",
  "beforeDate": "2026-02-01"
}
```

---

## 💻 **JavaScript/Fetch Usage**

### **From Admin Dashboard:**

```typescript
// Preview bookings that will be deleted
async function previewDeletion(date: string) {
  const response = await fetch(`/api/admin/bookings/delete?date=${date}`)
  const result = await response.json()
  console.log(`Found ${result.count} bookings to delete:`, result.bookings)
  return result
}

// Delete bookings for a specific date
async function deleteBookingsByDate(date: string) {
  const response = await fetch('/api/admin/bookings/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date })
  })
  const result = await response.json()
  
  if (result.success) {
    alert(`Deleted ${result.deletedCount} bookings`)
  } else {
    alert(`Error: ${result.error}`)
  }
}

// Delete old bookings (older than 30 days)
async function deleteOldBookings() {
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  const beforeDate = thirtyDaysAgo.toISOString().split('T')[0]
  
  const response = await fetch('/api/admin/bookings/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ beforeDate })
  })
  
  return await response.json()
}
```

---

## 🛡️ **Security Notes**

### **✅ Safe:**
- Service role key is server-side only
- RLS policies still protect customer data
- Only admins can delete through API
- Preview endpoint (GET) lets you verify before deletion

### **⚠️ Important:**
- **Never** expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- Always use server-side API routes (Next.js API routes)
- Keep the service role key in `.env.local` (not committed to git)
- Consider adding authentication check in the API route

---

## 🧪 **Testing**

### **Test the Setup:**

1. **Verify Policies Exist:**
```sql
-- Run in Supabase SQL Editor
SELECT schemaname, tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename = 'bookings';
```

2. **Test Preview Endpoint:**
```bash
curl http://localhost:3000/api/admin/bookings/delete?date=2026-02-15
```

3. **Test Deletion (with caution):**
```bash
curl -X DELETE http://localhost:3000/api/admin/bookings/delete \
  -H "Content-Type: application/json" \
  -d '{"date": "2026-02-15"}'
```

---

## 📊 **API Response Format**

### **Success Response:**
```json
{
  "success": true,
  "message": "Successfully deleted bookings",
  "deletedCount": 3
}
```

### **Error Response:**
```json
{
  "error": "Failed to delete bookings",
  "details": "Error message here"
}
```

---

## 🔄 **Automated Cleanup (Optional)**

If you want automatic cleanup of old bookings, you can:

1. **Create a Supabase Edge Function** (cron job)
2. **Use Vercel Cron Jobs** to call the API endpoint
3. **Manually run cleanup** from admin dashboard

Example cron config:
```json
{
  "crons": [{
    "path": "/api/admin/bookings/cleanup",
    "schedule": "0 2 * * *"
  }]
}
```

---

## ✅ **Checklist**

- [ ] Run SQL migration in Supabase
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- [ ] Test preview endpoint (GET)
- [ ] Test deletion with old data
- [ ] Verify deleted data is gone
- [ ] Add to production environment variables

---

**You can now safely delete old booking data through the API! 🎉**
