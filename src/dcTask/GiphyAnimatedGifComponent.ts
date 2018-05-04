import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {ApiResponse, ConvertResponse, IApiResponse, IImage, IImageAttributes} from './ApiResponse';
import {random, isEmpty, map} from "lodash";
import {GiphyApi} from './GiphyApi';
import {Subscription} from 'rxjs/Subscription';
@Component({
    selector: 'giphy-animated-gif',
    template: `
    <div  class="bg-gray border border-radius shadow display-inine-block">
        <img [src]="url"  alt="" [style.width.px]="width" [style.height.px]="height">
    </div>
    `
})

export class GiphyAnimatedGifComponent implements OnInit {
    @Input() url :string = null;
    @Input() width  : string ="100";
    @Input() height : string ="100";

    constructor() {
    }

    ngOnInit() {
    }
}
@Component({
    selector  :"gif-grid",
    template : `
    <div class=" ">
        <div class="row no-gutters">
            <div class="col-10">
                <input placeholder="Search Animated Gifs" (keyup)="onKeyUp($event,search)" #search type="text" class="form-control form-control-sm " />
            
            </div>
            <div class="col-2">
                <button (click)="searchGiphy(search.value,30)" class="btn btn-outline-primary btn-sm"><i class="fa fa-search"></i></button>
            </div>
        </div>
        <div class="min-h300 max-height-340 overflow-auto pad10">
            <div *ngIf="!processing" class="">
                <div class="display-inine-block margin-5 fix-width-50px cursor-pointer"
                    *ngFor="let i of data" (click)="gridItemClicked(i, gifElem)" #gifElem>
                      <img [src]="i.url" alt="" width="50px" height="50px">
                   
                </div>
            </div>
            <div *ngIf="processing" class="text-center min-h300 d-flex justify-content-center align-content-center flex-column">
                <loading active="true"></loading>
            </div>
        </div>
        
    </div>
    `,

})
export  class GiphyAnimatedGifGridComponent implements  OnInit, OnDestroy
{
    ngOnDestroy(): void {
        // Destruction of component
        // let set the cache here
        this.api.setCacheResult(this.data);
    }
    @Output() onGifClicked : EventEmitter<{gifAttr : IImageAttributes, gifElem : HTMLDivElement}> = new EventEmitter<{gifAttr : IImageAttributes, gifElem : HTMLDivElement}>();
    processing  = false;
    response : IApiResponse  = new ApiResponse();
    data : Array<IImageAttributes>  = [];
    $apiSubscription : Subscription  ;



    constructor(private api : GiphyApi){

    }
    onKeyUp(evt : KeyboardEvent, input : HTMLInputElement)
    {
        if(!isEmpty(input.value) && evt.keyCode == 13)
        {
            this.searchGiphy(input.value, 30);
        }
    }
    ngOnInit(): void {

        const defKeywords    =["love","angry", "explosion","nuclear explosion","cars", "fighting", "dancing", "surprise", "happy","laughing", "boxing"];
        let index = random(defKeywords.length-1);
        // only perform a search if we do not have a cached result
        if(this.api.hasCachedResults())
        {
            this.data = this.api.cachedSearchedResult;
        }
        else{
            this.searchGiphy(defKeywords[index]);

        }

        //console.log("Animated Component Grid INIT Called");

    }

    gridItemClicked(d : IImageAttributes, div : HTMLDivElement)
    {
        let emittedData   = {gifElem : div , gifAttr : d};
        this.onGifClicked.emit(emittedData);
        //console.log("Selected Gif : " , emittedData);
    }
    searchGiphy(q: string, pgSize: number = 25, curPg: number = 0) {
        if(!this.processing){
            this.processing = true;
            this.api.searchGifs(q, pgSize, curPg)
                .subscribe(result => {
                    let ee :IApiResponse  = <IApiResponse>ConvertResponse.convert(result);

                    let temp  = <Array<{images: IImage}>> ee.data;
                    if(temp.length > 0 ) this.data = [];
                    map(temp , (obj) => {
                        //console.log(obj);
                       this.data.push(<IImageAttributes>obj.images.fixed_width) ;
                    });
                    this.api.setCacheResult(this.data);

                }, error2 => {
                    this.processing = false;
                    alert('Could Not Connect to Giphy Api server, Please check your Connection');
                }, () => {
                    this.processing = false;

                });
            // Explicitly Unsubscribe;
            if (this.$apiSubscription != null)
                this.$apiSubscription.unsubscribe();
        }
        else{
            alert("Still processing a previous request!");
        }


    }

}

