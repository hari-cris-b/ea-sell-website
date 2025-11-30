import { supabase } from '../supabase';
import type { Profile, UserRole } from '../../types/trading';

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  return data;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return getProfile(user.id);
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, 'full_name' | 'role' | 'avatar_url' | 'bio'>>
): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
  return data;
}

export async function updateUserRole(userId: string, role: UserRole): Promise<Profile | null> {
  return updateProfile(userId, { role });
}

export async function getProviders(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'provider')
    .eq('is_verified', true)
    .order('win_rate', { ascending: false });

  if (error) {
    console.error('Error fetching providers:', error);
    return [];
  }
  return data || [];
}

export async function getAllProviders(): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'provider')
    .order('total_subscribers', { ascending: false });

  if (error) {
    console.error('Error fetching all providers:', error);
    return [];
  }
  return data || [];
}

export async function searchProviders(query: string): Promise<Profile[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'provider')
    .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
    .order('win_rate', { ascending: false });

  if (error) {
    console.error('Error searching providers:', error);
    return [];
  }
  return data || [];
}
