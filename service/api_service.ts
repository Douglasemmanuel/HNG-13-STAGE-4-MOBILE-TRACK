// export const  API_KEY = 'CG-dFGuBwnUpmqAGZxhJXNn6Ua9'
// export const URL =  'https://api.coingecko.com/api/v3/coins/'
// // curl --request GET \
// //   --url https://api.coingecko.com/api/v3/coins/list \
// //   --header 'x-cg-demo-api-key: <api-key>'


 export const API_URL = 'https://api.coingecko.com/api/v3/coins/'

import { useQuery } from "@tanstack/react-query";
import axios from 'axios';


const getAllCoins = async ()=>{
    const {data} = await axios.get(`${API_URL}list`,{
        headers:{
            'Authorization':`Bearer${process.env.COINGECKO_API_KEY}`,
            "Accept":"application/json",
        }
    });
    return data;
}

///get all coins
export const useAllCoins = () =>{
    return useQuery({
        queryKey:["coins"],
        queryFn: getAllCoins,
    })
}


///get a coin by Id 

const getCoinsById = async ({ queryKey })=>{
    const [id] = queryKey
    const {data} = await axios.get(`${API_URL}${id}`,{
        headers:{
            'Authorization':`Bearer${process.env.COINGECKO_API_KEY}`,
            "Accept":"application/json",
        }
    });
    return data;
}


///get a coin by Id 
export const useSingleCoins = (id) =>{
    return useQuery({
        queryKey:["coins-id" , id],
        queryFn:  getAllCoins,
        enabled: !!id,
    })
}


const getMarketCoins = async ()=>{
    const {data} = await axios.get(`${API_URL}markets`,{
        headers:{
            'Authorization':`Bearer${process.env.COINGECKO_API_KEY}`,
            "Accept":"application/json",
        }
    });
    return data;
}

///get all coins
export const usemarketCoins = () =>{
    return useQuery({
        queryKey:["market-coins"],
        queryFn: getMarketCoins,
    })
}

