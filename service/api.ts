import axios from "axios";
import { Query, useQuery } from "@tanstack/react-query";
import { CoinListItem , CoinDetail  ,CoinMarket} from "@/types/types";
import { useCoinListStore } from "@/store/coinList_store";
import { useSingleCoinStore } from "@/store/coin_store";
import { useMarketStore } from "@/store/Market_coin";


 export const API_URL = 'https://api.coingecko.com/api/v3/coins/'



type AllCoinResponse = CoinListItem[];
type SingleCoinResponse = CoinDetail;
export type MarketResponse = CoinMarket[];

 const fetchAllCoins = async (): Promise<AllCoinResponse> => {
  try {
    const { data } = await axios.get<AllCoinResponse>(API_URL, {
      headers: {
        'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
      },
    });
    return data; 
  } catch (error) {
    console.error('Error fetching coins:', error);
    return []; 
    
  }
};

export const useFetchAllCoin = () =>{
    return useQuery<AllCoinResponse , Error>({
        queryKey:['allCoin'],
        queryFn:fetchAllCoins,
        refetchIntervalInBackground:true,
    })
}



//  const fetchCoinById = async (id: string):Promise<SingleCoinResponse | null> => {
//   try {
//     const response = await axios.get<SingleCoinResponse>(`${API_URL}/${id}`, {
//       headers: {
//          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY,
//       }
      
//     });
//     const { setCoinData } = useSingleCoinStore.getState();
//     setCoinData(response.data);

//     return response.data; // ✅ good
//   } catch (error) {
//     console.error('Error fetching market coins:', error);
//      useSingleCoinStore.getState().clearCoinData();
//     return null;
//   };
// };


// export const useSingleCoin = (id: string) => {
// return useQuery<SingleCoinResponse | null, Error>({
//     queryKey:['coin' , id],
//     queryFn: ()=>fetchCoinById(id),
//     enabled:!!id,
//     refetchIntervalInBackground: true,

// })
 
// };




export const getMarketCoin = async (vs_currency: string): Promise<MarketResponse> => {
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

    return response.data; // ✅ good
  } catch (error) {
    console.error('Error fetching market coins:', error);

    // ✅ return an empty array so it always fulfills the Promise<MarketResponse>
    useMarketStore.getState().clearMarketCoins();
    return [];
  }
};

// api to fetch all the coins
export const useFetchMarketcoin = (vs_currency:string)=>{
    return useQuery<MarketResponse , Error>({
        queryKey:['market-coins' , vs_currency],
        queryFn:()=>getMarketCoin(vs_currency),
        enabled:!!vs_currency,
          // refetchIntervalInBackground: true,
            // refetchInterval: 1000,

    })
}



export type OhlcPoint = [number, number, number, number, number];

interface OhlcParams {
  vs_currency?: string;
  days?: number | string;
}

// Main function definition with strong typing
 const getCoinOhlcData = async (
  coinId: string,
  params: OhlcParams = { vs_currency: "usd", days: 7 }
): Promise<OhlcPoint[]> => {
  try {
    const response = await axios.get<OhlcPoint[]>(
      `${API_URL}/${coinId}/ohlc`,
      { params }
    );
    console.log('RESPONSE-CHART',response.data)
    return response.data;
  } catch (error: any) {
    console.error(
      `Error fetching OHLC data for ${coinId}:`,
      error?.response?.data || error.message
    );
    throw error;
  }
};


export const useCoinOhlcQuery = (
  coinId: string,
  params: OhlcParams = { vs_currency: 'usd', days: 7 }
) => {
  return useQuery<OhlcPoint[], Error>({
    queryKey: ['coinOhlc', coinId, params],
    queryFn: () => getCoinOhlcData(coinId, params),
    enabled: !!coinId, 
    refetchOnWindowFocus: false,
  });
};