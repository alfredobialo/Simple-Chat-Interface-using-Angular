import {Injectable} from '@angular/core';
import {HttpClient} from  '@angular/common/http';
import {IApiResponse} from './ApiResponse';

const BASE_ENDPOINT = "http://api.giphy.com/v1/";
const API_KEY = "TDX40QqeA9iYFCnjEsm6TGHIAeppSkJH";
const GIPHY_SEARCH_ENDPOINT  =`${BASE_ENDPOINT}gifs/search?api_key=${API_KEY}&`;  //gifs/search?q=funny+cat&api_key=YOUR_API_KEY
const GIPHY_RANDOM_SEARCH_ENDPOINT  =`${BASE_ENDPOINT}gifs/random?api_key=${API_KEY}&`;
@Injectable()
export class GiphyApi{
    cachedSearchedResult  = [];
    constructor(private http : HttpClient)
    {}
    buildUrl(query : string, pageSize : number=5, currentPage : number=0, endPointConst : string = GIPHY_SEARCH_ENDPOINT):string
    {
        return `${endPointConst}limit=${pageSize}&offset=${currentPage}&q=${query}`;
    }
    searchGifs(query : string, pageSize : number  = 5, currentPage : number = 0)
    {

        const url  =  this.buildUrl(query, pageSize, currentPage);
        return this.http.get<IApiResponse>(url);

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
