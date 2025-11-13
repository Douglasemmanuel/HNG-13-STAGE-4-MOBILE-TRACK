// types.ts
export interface CoinListItem {
  id: string;
  symbol: string;
  name: string;
}


export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  web_slug: string;
  asset_platform_id: string | null;
  platforms: { [platform: string]: string };
  detail_platforms: {
    [platform: string]: {
      decimal_place: number | null;
      contract_address: string;
    }
  };
  block_time_in_minutes: number | null;
  hashing_algorithm: string | null;
  categories: string[];
  preview_listing: boolean;
  public_notice: string | null;
  additional_notices: string[];
  localization: { [languageCode: string]: string };
  description: { [languageCode: string]: string };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string | null;
    facebook_username: string | null;
    bitcointalk_thread_identifier: string | null;
    telegram_channel_identifier: string | null;
    subreddit_url: string | null;
    repos_url: {
      github: string[];
      bitbucket: string[];
    }
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  country_origin: string;
  genesis_date: string | null;
  sentiment_votes_up_percentage: number | null;
  sentiment_votes_down_percentage: number | null;
  watchlist_portfolio_users: number | null;
  market_cap_rank: number | null;
  market_data: {
    current_price: { [currency: string]: number };
    total_value_locked: number | null;
    mcap_to_tvl_ratio: number | null;
    fdv_to_tvl_ratio: number | null;
    roi: any | null;
    ath: { [currency: string]: number };
    ath_change_percentage: { [currency: string]: number };
    ath_date: { [currency: string]: string };
    atl: { [currency: string]: number };
    atl_change_percentage: { [currency: string]: number };
    atl_date: { [currency: string]: string };
    market_cap: { [currency: string]: number };
    fully_diluted_valuation: { [currency: string]: number | null };
    price_change_24h: number | null;
    price_change_percentage_24h: number | null;
    price_change_percentage_7d: number | null;
    price_change_percentage_14d: number | null;
    price_change_percentage_30d: number | null;
    price_change_percentage_60d: number | null;
    price_change_percentage_200d: number | null;
    price_change_percentage_1y: number | null;
    market_cap_change_24h: number | null;
    market_cap_change_percentage_24h: number | null;
    price_change_24h_in_currency: { [currency: string]: number };
    price_change_percentage_1h_in_currency: { [currency: string]: number };
    price_change_percentage_24h_in_currency: { [currency: string]: number };
    price_change_percentage_7d_in_currency: { [currency: string]: number };
    price_change_percentage_14d_in_currency: { [currency: string]: number };
    price_change_percentage_30d_in_currency: { [currency: string]: number };
    price_change_percentage_60d_in_currency: { [currency: string]: number };
    price_change_percentage_200d_in_currency: { [currency: string]: number };
    price_change_percentage_1y_in_currency: { [currency: string]: number };
    market_cap_change_24h_in_currency: { [currency: string]: number };
    market_cap_change_percentage_24h_in_currency: { [currency: string]: number };
    total_supply: number | null;
    max_supply: number | null;
    circulating_supply: number | null;
    last_updated: string;
  };
  community_data: {
    facebook_likes: number | null;
    reddit_average_posts_48h: number | null;
    reddit_average_comments_48h: number | null;
    reddit_subscribers: number | null;
    reddit_accounts_active_48h: number | null;
    telegram_channel_user_count: number | null;
    twitter_followers: number | null;   // sometimes added
  };
  developer_data: {
    forks: number;
    stars: number;
    subscribers: number;
    total_issues: number;
    closed_issues: number;
    pull_requests_merged: number;
    pull_request_contributors: number;
    commit_count_4_weeks: number;
    last_4_weeks_commit_activity_series: number[];
  };
  status_updates: any[]; // array of status update objects
  last_updated: string;
  tickers: Array<{
    base: string;
    target: string;
    market: {
      name: string;
      identifier: string;
      has_trading_incentive: boolean;
      logo?: string;
    };
    last: number;
    volume: number;
    converted_last: { [currency: string]: number };
    converted_volume: { [currency: string]: number };
    trust_score: string;
    bid_ask_spread_percentage: number;
    timestamp: string;
    last_traded_at: string;
    last_fetch_at: string;
    is_anomaly: boolean;
    is_stale: boolean;
    trade_url: string | null;
    token_info_url: string | null;
    coin_id: string;
    target_coin_id: string;
  }>;
}




// types/coin.ts

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: any | null;
  last_updated: string;
}
