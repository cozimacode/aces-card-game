export interface Card {
  code: string;
  value: string;
  suit: string;
}

export interface APIResponse {
  success: boolean;
  deck_id: string;
  cards: Array<Card>;
  remaining: number;
}
