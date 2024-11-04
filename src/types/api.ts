const BINANCE_BASE_API_URL = 'https://api.binance.com/api/v3';
const BINANCE_BASE_WS_URL = 'wss://stream.binance.com:9443';

export const API_URL = {
  EXCHANGE_INFO: `${BINANCE_BASE_API_URL}/exchangeInfo`,
  PRICE: `${BINANCE_BASE_API_URL}/ticker/price`,
  KLINES: `${BINANCE_BASE_API_URL}/klines`,
  TICKER_24HR: `${BINANCE_BASE_API_URL}/ticker/24hr`,
};

export const WS_URL = {
  SUBSCRIBE_MIN_TICKER: `${BINANCE_BASE_WS_URL}/stream?streams=`,
};
