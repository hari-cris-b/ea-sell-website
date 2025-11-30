import { corsHeaders } from '@shared/cors.ts';
import { getSupabaseClient } from '@shared/supabase.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const supabase = getSupabaseClient(authHeader);
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      );
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'provider') {
      return new Response(
        JSON.stringify({ error: 'Only providers can create signals' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 403 }
      );
    }

    const signalData = await req.json();

    const { data: signal, error: signalError } = await supabase
      .from('signals')
      .insert({
        provider_id: user.id,
        symbol: signalData.symbol,
        side: signalData.side,
        order_type: signalData.order_type || 'MARKET',
        entry_price: signalData.entry_price,
        take_profit_1: signalData.take_profit_1,
        take_profit_2: signalData.take_profit_2,
        take_profit_3: signalData.take_profit_3,
        stop_loss: signalData.stop_loss,
        leverage: signalData.leverage || 1,
        notes: signalData.notes,
        status: 'active',
      })
      .select()
      .single();

    if (signalError) {
      return new Response(
        JSON.stringify({ error: signalError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Notify subscribers (placeholder for real-time notifications)
    const { data: subscribers } = await supabase
      .from('subscriptions')
      .select('user_id, auto_trade')
      .eq('provider_id', user.id)
      .eq('status', 'active');

    // Create notifications for subscribers
    if (subscribers && subscribers.length > 0) {
      const notifications = subscribers.map(sub => ({
        user_id: sub.user_id,
        type: 'signal',
        title: `New ${signalData.side} Signal`,
        message: `${signalData.symbol} - ${signalData.side} signal from your subscribed provider`,
        data: { signal_id: signal.id },
      }));

      await supabase.from('notifications').insert(notifications);

      // Auto-execute for subscribers with auto_trade enabled
      for (const sub of subscribers.filter(s => s.auto_trade)) {
        await supabase.from('user_signals').insert({
          user_id: sub.user_id,
          signal_id: signal.id,
          execution_status: 'pending',
        });
      }
    }

    return new Response(
      JSON.stringify({ success: true, signal }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Create signal error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
