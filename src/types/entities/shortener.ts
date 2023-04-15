export type Shortener = {
  url_id: string;
  long_url: string;
  short_url: string;
};

export type ShortenerColumn = {
  url_id: string;
  short_url: string;
  long_url: string;
  visitor: number;
  user_id: string;
  created_at: string;
};
