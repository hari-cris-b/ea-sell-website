import { createHmac } from 'https://deno.land/std@0.177.0/node/crypto.ts';

const BINANCE_API_URL = 'https://api.binance.com';
const BINANCE_FUTURES_URL = 'https://fapi.binance.com';
const BINANCE_TESTNET_URL = 'https://testnet.binance.vision';
const BINANCE_FUTURES_TESTNET_URL = 'https://testnet.binancefuture.com';

interface BinanceConfig {
  apiKey: string;
  apiSecret: string;
  isTestnet: boolean;
  isFutures: boolean;
}

interface OrderParams {
  symbol: string;
  side: 'BUY' | 'SELL';
  type: 'MARKET' | 'LIMIT';
  quantity: number;
  price?: number;
  stopPrice?: number;
  takeProfitPrice?: number;
  leverage?: number;
}

function getBaseUrl(config: BinanceConfig): string {
  if (config.isFutures) {
    return config.isTestnet ? BINANCE_FUTURES_TESTNET_URL : BINANCE_FUTURES_URL;
  }
  return config.isTestnet ? BINANCE_TESTNET_URL : BINANCE_API_URL;
}

function sign(queryString: string, secret: string): string {
  const hmac = createHmac('sha256', secret);
  hmac.update(queryString);
  return hmac.digest('hex');
}

async function makeRequest(
  config: BinanceConfig,
  endpoint: string,
  method: 'GET' | 'POST' | 'DELETE' = 'GET',
  params: Record<string, string | number> = {},
  signed = true
): Promise<any> {
  const baseUrl = getBaseUrl(config);
  const timestamp = Date.now();
  
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });
  
  if (signed) {
    queryParams.append('timestamp', String(timestamp));
    const signature = sign(queryParams.toString(), config.apiSecret);
    queryParams.append('signature', signature);
  }

  const url = `${baseUrl}${endpoint}?${queryParams.toString()}`;
  
  const response = await fetch(url, {
    method,
    headers: {
      'X-MBX-APIKEY': config.apiKey,
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.msg || 'Binance API error');
  }
  
  return data;
}

export async function getAccountInfo(config: BinanceConfig) {
  const endpoint = config.isFutures ? '/fapi/v2/account' : '/api/v3/account';
  return makeRequest(config, endpoint);
}

export async function getBalance(config: BinanceConfig) {
  const account = await getAccountInfo(config);
  
  if (config.isFutures) {
    return {
      totalBalance: parseFloat(account.totalWalletBalance),
      availableBalance: parseFloat(account.availableBalance),
      positions: account.positions?.filter((p: any) => parseFloat(p.positionAmt) !== 0) || [],
    };
  }
  
  const usdtBalance = account.balances?.find((b: any) => b.asset === 'USDT');
  return {
    totalBalance: parseFloat(usdtBalance?.free || 0) + parseFloat(usdtBalance?.locked || 0),
    availableBalance: parseFloat(usdtBalance?.free || 0),
    positions: [],
  };
}

export async function setLeverage(config: BinanceConfig, symbol: string, leverage: number) {
  if (!config.isFutures) return null;
  
  return makeRequest(config, '/fapi/v1/leverage', 'POST', {
    symbol,
    leverage,
  });
}

export async function placeOrder(config: BinanceConfig, params: OrderParams) {
  const endpoint = config.isFutures ? '/fapi/v1/order' : '/api/v3/order';
  
  const orderParams: Record<string, string | number> = {
    symbol: params.symbol,
    side: params.side,
    type: params.type,
    quantity: params.quantity,
  };
  
  if (params.type === 'LIMIT' && params.price) {
    orderParams.price = params.price;
    orderParams.timeInForce = 'GTC';
  }
  
  if (config.isFutures && params.leverage) {
    await setLeverage(config, params.symbol, params.leverage);
  }
  
  return makeRequest(config, endpoint, 'POST', orderParams);
}

export async function placeStopLoss(
  config: BinanceConfig,
  symbol: string,
  side: 'BUY' | 'SELL',
  quantity: number,
  stopPrice: number
) {
  const endpoint = config.isFutures ? '/fapi/v1/order' : '/api/v3/order';
  const stopSide = side === 'BUY' ? 'SELL' : 'BUY';
  
  const params: Record<string, string | number> = {
    symbol,
    side: stopSide,
    type: config.isFutures ? 'STOP_MARKET' : 'STOP_LOSS_LIMIT',
    quantity,
    stopPrice,
  };
  
  if (!config.isFutures) {
    params.price = stopPrice;
    params.timeInForce = 'GTC';
  }
  
  return makeRequest(config, endpoint, 'POST', params);
}

export async function placeTakeProfit(
  config: BinanceConfig,
  symbol: string,
  side: 'BUY' | 'SELL',
  quantity: number,
  takeProfitPrice: number
) {
  const endpoint = config.isFutures ? '/fapi/v1/order' : '/api/v3/order';
  const tpSide = side === 'BUY' ? 'SELL' : 'BUY';
  
  const params: Record<string, string | number> = {
    symbol,
    side: tpSide,
    type: config.isFutures ? 'TAKE_PROFIT_MARKET' : 'TAKE_PROFIT_LIMIT',
    quantity,
    stopPrice: takeProfitPrice,
  };
  
  if (!config.isFutures) {
    params.price = takeProfitPrice;
    params.timeInForce = 'GTC';
  }
  
  return makeRequest(config, endpoint, 'POST', params);
}

export async function getSymbolPrice(config: BinanceConfig, symbol: string): Promise<number> {
  const endpoint = config.isFutures ? '/fapi/v1/ticker/price' : '/api/v3/ticker/price';
  const data = await makeRequest(config, endpoint, 'GET', { symbol }, false);
  return parseFloat(data.price);
}

export async function getSymbolInfo(config: BinanceConfig, symbol: string) {
  const endpoint = config.isFutures ? '/fapi/v1/exchangeInfo' : '/api/v3/exchangeInfo';
  const data = await makeRequest(config, endpoint, 'GET', {}, false);
  return data.symbols?.find((s: any) => s.symbol === symbol);
}

export function calculateQuantity(
  balance: number,
  riskPercent: number,
  price: number,
  leverage = 1
): number {
  const riskAmount = balance * (riskPercent / 100);
  const quantity = (riskAmount * leverage) / price;
  return Math.floor(quantity * 1000) / 1000; // Round down to 3 decimals
}
