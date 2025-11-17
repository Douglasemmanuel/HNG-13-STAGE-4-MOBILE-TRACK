import axios from "axios";
import { Query, useQuery , QueryObserverResult , UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { CoinListItem , CoinDetail  ,CoinMarket} from "@/types/types";
import { useCoinListStore } from "@/store/coinList_store";
import { useSingleCoinStore } from "@/store/coin_store";
import { useMarketStore } from "@/store/Market_coin";
import { useState } from "react";


 export const API_URL = 'https://api.coingecko.com/api/v3/coins/'



type AllCoinResponse = CoinListItem[];
type SingleCoinResponse = CoinDetail;
export type MarketResponse = CoinMarket[];





export const getMarketCoin = async (vs_currency: string): Promise<MarketResponse | undefined > => {
  try {
    const response = await axios.get<MarketResponse>(`${API_URL}markets`, {
      params: {
        vs_currency,
        order: 'market_cap_desc',
        per_page: 50,
        page: 1,
        sparkline: false,
      },
      headers: {
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
      },
    });

    const { setMarketCoins } = useMarketStore.getState();
    setMarketCoins(response.data);

    return response.data; 
  } catch (error) {
    console.error('Error fetching market coins:', error);

  }
};

// api to fetch all the coins
export const useFetchMarketcoin = (vs_currency:string)=>{
    return useQuery<MarketResponse | undefined , Error>({
        queryKey:['market-coins' , vs_currency],
        queryFn:()=>getMarketCoin(vs_currency),
        enabled:!!vs_currency,
          refetchIntervalInBackground: true,
            refetchInterval:  25 * 60 * 1000,

    })
}


//  const [days, setDays] = useState<DaysType | null>(null);




export type DaysOrHours = 1 | 7 | 30 | 365;

export const getCandleChartData = async (
  coinId: string,
  days: DaysOrHours =1,
  vs_currency: string = 'usd'
) => {
  try {
    const response = await axios.get(
      `${API_URL}${coinId}/ohlc?vs_currency=${vs_currency}&days=${days}`
    );
    return response.data;
  } catch (e: any) {
    console.error(
      `Error fetching candle chart for coinId="${coinId}", days=${days}, vs_currency="${vs_currency}"`,
      e.response?.status,
      e.response?.data || e.message
    );
    throw e;
  }
};


// React Query hook with manual triggering
export const useCandleChartData = (
  coinId: string,
  vs_currency: string = 'usd'
): ({
  fetchForDays: (selectedDays: DaysOrHours) => void;
} & UseQueryResult<number[][], unknown>) => {
  const [days, setDays] = useState<DaysOrHours>( 1);

  const query = useQuery<number[][], unknown>({
    queryKey: ['candle-chart', coinId, vs_currency, days],
    queryFn: () => getCandleChartData(coinId, days, vs_currency),
    enabled: false,
  });

  const fetchForDays = (selectedDays: DaysOrHours) => {
    setDays(selectedDays);
    query.refetch();
  };

  return { ...query, fetchForDays };
};

