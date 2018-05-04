import {Injectable} from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import {IApiResponse} from './ApiResponse';

const BASE_ENDPOINT = "http://api.giphy.com/v1/";
const API_KEY = "TDX40QqeA9iYFCnjEsm6TGHIAeppSkJH";
const GIPHY_SEARCH_ENDPOINT  =`${BASE_ENDPOINT}gifs/search?api_key=${API_KEY}&`;  //gifs/search?q=funny+cat&api_key=YOUR_API_KEY
@Injectable()
export class GiphyApi{
    cachedSearchedResult  = [];
    constructor(private http : HttpClient)
    {}
    getSearchEndPointTest(query : string, pageSize : number=5, currentPage : number=0):string
    {
        return `${GIPHY_SEARCH_ENDPOINT}limit=${pageSize}&offset=${currentPage}&q=${query}`;
    }
    searchGifs(query : string, pageSize : number  = 5, currentPage : number = 0)
    {
        return this.http.get<IApiResponse>(this.getSearchEndPointTest(query, pageSize, currentPage));

    }
    setCacheResult(result)
    {
        this.cachedSearchedResult = result;
    }
    getCacheResult() :any[]{
        return this.cachedSearchedResult;
    }
    resetCacheResult ()
    {
        this.cachedSearchedResult = [];

    }
    hasCachedResults =() => this.cachedSearchedResult.length >0;
}
