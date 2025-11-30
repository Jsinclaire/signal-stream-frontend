export type PriceLevel = [number, number, string];

export interface Candle {
  openTimeStamp: number;
  closeTimeStamp: number;
  open: number | null;
  high: number;
  low: number | null;
  close: number;
}

export interface MarketData {
  top3Asks: PriceLevel[];
  top3Bids: PriceLevel[];
  midPrice: number;
  spread: number;
  orderbookSpeed: number;
  market: string;
  candles: Candle[];
}
