import {isNil,map} from 'lodash';

export class GiphyImage implements  IImage
{
    fixed_width: IImageAttributes;

}
export class GiphyImageAttr implements  IImageAttributes
{
    url: string;
    width: string;
    height: string;
    size: string;


}
export class ApiResponse implements IApiResponse
{
    data: Array<{ images: IImage }>;
    constructor()
    {
        let img  =  new GiphyImage();
        img.fixed_width  =  new GiphyImageAttr();

        this.data =  [
            {
                images : img
            }
        ];
    }

}
export interface IApiResponse
{
    /*Giphy Response Object Definition goes here*/
    data  : Array<{images : IImage}> ;
    meta?: {
         status:string,
        msg: string
    };
    pagination?: {
        total_count:number ,// 1947,
        count: number ,//25,
        offset:number ,// 0
    }
}
export  interface IImage
{
    fixed_width : IImageAttributes
}
export interface  IImageAttributes
{
        url: string; //"http://media0.giphy.com/media/feqkVgjJpYtjy/200w.gif",
        width: string ; //"200",
        height: string; //"90",
        size: string; //"115885",

}
export class ConvertResponse{
     public static  convert(response : any )  : IApiResponse {
        let apiRes: IApiResponse  =  new ApiResponse();

        apiRes.data = [];
        if (!isNil(response)) {
         map(response.data, (obj) => {
             ///// console.log(response.data);
              let imgObj: GiphyImage =  <GiphyImage> obj.images;
            apiRes.data.push({images : imgObj}) ;
         });
         apiRes.meta  = response.meta;
         apiRes.pagination = response.pagination;
        }
       /// console.log("FROM CONVERTER" , apiRes);
        return apiRes;
    }

}
export class ChatMessage
{
    constructor(public content : string,public  media : IImageAttributes , public sender:MessageSender ){}

    public static getDefaultUsers()  : Array<MessageSender>
    {
        let users : Array<MessageSender> = [
            new MessageSender("alfred"  , "Alfred Obialo", "assets/images/iyke.jpg"),
            new MessageSender("somky"  , "Maryann", "assets/images/female.png"),
        ];
        return users;
    }
}
export class MessageSender
{
    constructor(public id : string , public displayName : string , public pictureUrl : string){}
}