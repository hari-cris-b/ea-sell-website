import { corsHeaders } from '@shared/cors.ts';
import { getSupabaseAdmin } from '@shared/supabase.ts';
import { getAccountInfo } from '@shared/binance.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Missing user_id' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: exchangeConfig, error: configError } = await supabase
      .from('exchange_configs')
      .select('*')
      .eq('user_id', user_id)
      .single();

    if (configError || !exchangeConfig) {
      return new Response(
        JSON.stringify({ valid: false, error: 'Exchange not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const config = {
      apiKey: exchangeConfig.api_key_encrypted,
      apiSecret: exchangeConfig.api_secret_encrypted,
      isTestnet: exchangeConfig.is_testnet,
      isFutures: exchangeConfig.exchange === 'binance_futures',
    };

    try {
      await getAccountInfo(config);
      
      await supabase
        .from('exchange_configs')
        .update({
          status: 'active',
          last_verified_at: new Date().toISOString(),
        })
        .eq('id', exchangeConfig.id);

      return new Response(
        JSON.stringify({ valid: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } catch (apiError) {
      await supabase
        .from('exchange_configs')
        .update({ status: 'error' })
        .eq('id', exchangeConfig.id);

      return new Response(
        JSON.stringify({ valid: false, error: apiError.message }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Verify exchange error:', error);
    return new Response(
      JSON.stringify({ valid: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
