import { supabase } from '../supabase';
import type { Subscription } from '../../types/trading';

export async function getSubscriptions(userId: string): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      provider:profiles!provider_id(id, full_name, avatar_url, win_rate, total_signals, is_verified)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscriptions:', error);
    return [];
  }
  return data || [];
}

export async function getActiveSubscriptions(userId: string): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      provider:profiles!provider_id(id, full_name, avatar_url, win_rate, total_signals, is_verified)
    `)
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching active subscriptions:', error);
    return [];
  }
  return data || [];
}

export async function getProviderSubscribers(providerId: string): Promise<Subscription[]> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select(`
      *,
      user:profiles!user_id(id, full_name, email, avatar_url)
    `)
    .eq('provider_id', providerId)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscribers:', error);
    return [];
  }
  return data || [];
}

export async function subscribe(
  userId: string,
  providerId: string,
  autoTrade = false
): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert({
      user_id: userId,
      provider_id: providerId,
      auto_trade: autoTrade,
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    console.error('Error subscribing:', error);
    throw error;
  }

  // Update provider subscriber count
  await supabase.rpc('increment_subscriber_count', { provider_id: providerId });

  return data;
}

export async function unsubscribe(subscriptionId: string): Promise<void> {
  const { error } = await supabase
    .from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('id', subscriptionId);

  if (error) {
    console.error('Error unsubscribing:', error);
    throw error;
  }
}

export async function updateSubscription(
  subscriptionId: string,
  updates: Partial<Pick<Subscription, 'auto_trade' | 'status'>>
): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('id', subscriptionId)
    .select()
    .single();

  if (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
  return data;
}

export async function toggleAutoTrade(
  subscriptionId: string,
  autoTrade: boolean
): Promise<Subscription | null> {
  return updateSubscription(subscriptionId, { auto_trade: autoTrade });
}

export async function isSubscribed(userId: string, providerId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('user_id', userId)
    .eq('provider_id', providerId)
    .eq('status', 'active')
    .single();

  if (error) return false;
  return !!data;
}
