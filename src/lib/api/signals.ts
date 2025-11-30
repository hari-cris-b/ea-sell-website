import { supabase } from '../supabase';
import type { Signal, CreateSignalForm, UserSignal } from '../../types/trading';

export async function createSignal(
  providerId: string,
  signal: CreateSignalForm
): Promise<Signal | null> {
  const { data, error } = await supabase
    .from('signals')
    .insert({
      provider_id: providerId,
      ...signal,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating signal:', error);
    throw error;
  }
  return data;
}

export async function getSignals(limit = 50): Promise<Signal[]> {
  const { data, error } = await supabase
    .from('signals')
    .select(`
      *,
      provider:profiles!provider_id(id, full_name, avatar_url, win_rate, is_verified)
    `)
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching signals:', error);
    return [];
  }
  return data || [];
}

export async function getProviderSignals(providerId: string): Promise<Signal[]> {
  const { data, error } = await supabase
    .from('signals')
    .select('*')
    .eq('provider_id', providerId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching provider signals:', error);
    return [];
  }
  return data || [];
}

export async function getSignalById(signalId: string): Promise<Signal | null> {
  const { data, error } = await supabase
    .from('signals')
    .select(`
      *,
      provider:profiles!provider_id(id, full_name, avatar_url, win_rate, is_verified)
    `)
    .eq('id', signalId)
    .single();

  if (error) {
    console.error('Error fetching signal:', error);
    return null;
  }
  return data;
}

export async function updateSignal(
  signalId: string,
  updates: Partial<Signal>
): Promise<Signal | null> {
  const { data, error } = await supabase
    .from('signals')
    .update(updates)
    .eq('id', signalId)
    .select()
    .single();

  if (error) {
    console.error('Error updating signal:', error);
    throw error;
  }
  return data;
}

export async function closeSignal(
  signalId: string,
  result: 'win' | 'loss' | 'breakeven',
  pnlPercent: number
): Promise<Signal | null> {
  return updateSignal(signalId, {
    status: 'closed',
    result,
    pnl_percent: pnlPercent,
    closed_at: new Date().toISOString(),
  });
}

export async function cancelSignal(signalId: string): Promise<Signal | null> {
  return updateSignal(signalId, { status: 'cancelled' });
}

// User signal executions
export async function getUserSignals(userId: string): Promise<UserSignal[]> {
  const { data, error } = await supabase
    .from('user_signals')
    .select(`
      *,
      signal:signals(*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user signals:', error);
    return [];
  }
  return data || [];
}

export async function createUserSignal(
  userId: string,
  signalId: string
): Promise<UserSignal | null> {
  const { data, error } = await supabase
    .from('user_signals')
    .insert({
      user_id: userId,
      signal_id: signalId,
      execution_status: 'pending',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating user signal:', error);
    throw error;
  }
  return data;
}

export async function updateUserSignal(
  userSignalId: string,
  updates: Partial<UserSignal>
): Promise<UserSignal | null> {
  const { data, error } = await supabase
    .from('user_signals')
    .update(updates)
    .eq('id', userSignalId)
    .select()
    .single();

  if (error) {
    console.error('Error updating user signal:', error);
    throw error;
  }
  return data;
}

export async function getSubscribedSignals(userId: string): Promise<Signal[]> {
  // Get signals from providers the user is subscribed to
  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('provider_id')
    .eq('user_id', userId)
    .eq('status', 'active');

  if (!subscriptions || subscriptions.length === 0) return [];

  const providerIds = subscriptions.map(s => s.provider_id);

  const { data, error } = await supabase
    .from('signals')
    .select(`
      *,
      provider:profiles!provider_id(id, full_name, avatar_url, win_rate, is_verified)
    `)
    .in('provider_id', providerIds)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching subscribed signals:', error);
    return [];
  }
  return data || [];
}
