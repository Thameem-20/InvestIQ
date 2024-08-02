import {XRapidAPIHost , XRapidAPIKey ,XRapidAPINews} from './api'
import axios from "axios"

// End point 

const apiBaseUrl = 'https://coinranking1.p.rapidapi.com'

const coinsUrl = `${apiBaseUrl}/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers[0]=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0 `



const  cryptoAPICall = async (endPoint, params)=>{
    const options ={
        method: 'GET',
        url : endPoint,
        params : params ? params: {},
        headers: {
            'X-RapidAPI-Key': XRapidAPIKey,
            'X-RapidAPI-Host': XRapidAPIHost
    }
}

try {
    const response = await axios.request(options)
    // console.log(response.data);
    return response.data
} catch (error) {
    console.log(error.message);
    return {}
}
}

export const FetchAllCoin = async () =>{
    return await cryptoAPICall(coinsUrl)
}


export const FetchCoinDetails = async (CoinUuid) =>{
const endPoints = `${apiBaseUrl}/coin/${CoinUuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`

    return await cryptoAPICall(endPoints)
}
export const FetchCoinHistory = async (CoinUuid) =>{
const endPoints = `${apiBaseUrl}/coin/${CoinUuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h`

    return await cryptoAPICall(endPoints)
}
export const SearchCoin = async (search) =>{
const endPoints = `${apiBaseUrl}/search-suggestion/${CoinUuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&query=${search}`
    return await cryptoAPICall(endPoints)
}