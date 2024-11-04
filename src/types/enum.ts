// 交易狀態
// https://github.com/binance/binance-spot-api-docs/blob/master/enums.md#symbol-status-status
export enum TradingStatus {
  PRE_TRADING = 'PRE_TRADING', // 盤前交易
  TRADING = 'TRADING', // 正常交易中
  POST_TRADING = 'POST_TRADING', // 盤後交易
  END_OF_DAY = 'END_OF_DAY', // 收盤
  HALT = 'HALT', // 交易終止(該交易對已下線)
  AUCTION_MATCH = 'AUCTION_MATCH', // 集合競價
  BREAK = 'BREAK', // 交易暫停
}

// K線間隔
// https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#klinecandlestick-data
export enum KlineInterval {
  SECONDS_1 = '1s',
  MINUTES_1 = '1m',
  MINUTES_3 = '3m',
  MINUTES_5 = '5m',
  MINUTES_15 = '15m',
  MINUTES_30 = '30m',
  HOURS_1 = '1h',
  HOURS_2 = '2h',
  HOURS_4 = '4h',
  HOURS_6 = '6h',
  HOURS_8 = '8h',
  HOURS_12 = '12h',
  DAYS_1 = '1d',
  DAYS_3 = '3d',
  WEEKS_1 = '1w',
  MONTHS_1 = '1M',
}
