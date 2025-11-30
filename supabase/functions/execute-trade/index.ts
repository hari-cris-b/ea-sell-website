import { corsHeaders } from '@shared/cors.ts';
import { getSupabaseAdmin } from '@shared/supabase.ts';
import {
  getBalance,
  placeOrder,
  placeStopLoss,
  placeTakeProfit,
  getSymbolPrice,
  calculateQuantity,
} from '@shared/binance.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { user_id, signal_id } = await req.json();

    if (!user_id || !signal_id) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing user_id or signal_id' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Get signal details
    const { data: signal, error: signalError } = await supabase
      .from('signals')
      .select('*')
      .eq('id', signal_id)
      .single();

    if (signalError || !signal) {
      return new Response(
        JSON.stringify({ success: false, error: 'Signal not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      );
    }

    // Get user's exchange config
    const { data: exchangeConfig, error: configError } = await supabase
      .from('exchange_configs')
      .select('*')
      .eq('user_id', user_id)
      .eq('status', 'active')
      .single();

    if (configError || !exchangeConfig) {
      return new Response(
        JSON.stringify({ success: false, error: 'Exchange not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Get user's trading params
    const { data: tradingParams } = await supabase
      .from('trading_params')
      .select('*')
      .eq('user_id', user_id)
      .single();

    const config = {
      apiKey: exchangeConfig.api_key_encrypted,
      apiSecret: exchangeConfig.api_secret_encrypted,
      isTestnet: exchangeConfig.is_testnet,
      isFutures: exchangeConfig.exchange === 'binance_futures',
    };

    // Get current balance
    const balance = await getBalance(config);
    
    // Get current price if market order
    const currentPrice = signal.entry_price || await getSymbolPrice(config, signal.symbol);
    
    // Calculate position size
    const riskPercent = tradingParams?.risk_per_trade || 1;
    const quantity = calculateQuantity(
      balance.availableBalance,
      riskPercent,
      currentPrice,
      signal.leverage || 1
    );

    if (quantity <= 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Insufficient balance' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    // Place main order
    const orderResult = await placeOrder(config, {
      symbol: signal.symbol,
      side: signal.side,
      type: signal.order_type,
      quantity,
      price: signal.entry_price,
      leverage: signal.leverage,
    });

    // Log the trade
    await supabase.from('trade_logs').insert({
      user_id,
      signal_id,
      exchange: exchangeConfig.exchange,
      symbol: signal.symbol,
      side: signal.side,
      order_type: signal.order_type,
      quantity,
      price: currentPrice,
      status: orderResult.status || 'filled',
      exchange_order_id: orderResult.orderId?.toString(),
      exchange_response: orderResult,
    });

    // Place stop loss if configured
    if (tradingParams?.use_stop_loss && signal.stop_loss) {
      try {
        await placeStopLoss(config, signal.symbol, signal.side, quantity, signal.stop_loss);
      } catch (slError) {
        console.error('Stop loss error:', slError);
      }
    }

    // Place take profit if configured
    if (tradingParams?.use_take_profit && signal.take_profit_1) {
      try {
        await placeTakeProfit(config, signal.symbol, signal.side, quantity, signal.take_profit_1);
      } catch (tpError) {
        console.error('Take profit error:', tpError);
      }
    }

    // Update user_signals record
    await supabase
      .from('user_signals')
      .update({
        execution_status: 'executed',
        exchange_order_id: orderResult.orderId?.toString(),
        executed_price: currentPrice,
        executed_quantity: quantity,
        executed_at: new Date().toISOString(),
      })
      .eq('user_id', user_id)
      .eq('signal_id', signal_id);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: orderResult.orderId,
        executedPrice: currentPrice,
        quantity,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Execute trade error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
