'use client'

import { createClient, RealtimeChannel } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('⚠️  Supabase credentials not found for realtime')
}

// Client-side Supabase client for Realtime subscriptions
export const supabaseRealtime = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null

export interface SlotUpdate {
  id: number
  date: string
  time: string
  barberid: number
  status: 'available' | 'taken' | 'released'
  booking_id?: string
  reason?: string
  createdat: string
}

/**
 * Subscribe to real-time slot updates for a specific date and barber
 */
export function subscribeToSlotUpdates(
  date: string,
  barberId: number,
  onUpdate: (update: SlotUpdate) => void
): RealtimeChannel | null {
  if (!supabaseRealtime) {
    console.warn('Supabase Realtime not available')
    return null
  }

  const channel = supabaseRealtime
    .channel(`slot-updates-${date}-${barberId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'slot_updates',
        filter: `date=eq.${date},barberid=eq.${barberId}`
      },
      (payload) => {
        console.log('📡 Realtime slot update:', payload)
        if (payload.new) {
          onUpdate(payload.new as SlotUpdate)
        }
      }
    )
    .subscribe((status) => {
      console.log(`📡 Subscription status: ${status}`)
    })

  return channel
}

/**
 * Unsubscribe from slot updates
 */
export async function unsubscribeFromSlotUpdates(channel: RealtimeChannel | null) {
  if (channel) {
    await supabaseRealtime?.removeChannel(channel)
    console.log('📡 Unsubscribed from slot updates')
  }
}
