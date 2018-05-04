import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from './ApiResponse';

@Component({
    selector: 'chat-message',
    template: `
       <div class="pad10 hover text-left min-h50  margin-b-20">
           <div class="row no-gutters">
               <div class="col-sm-1 col-2">
                   <user-avatar [imageUrl]="messageData?.sender?.pictureUrl"
                        [size]="2"></user-avatar>
                   
                
               </div>
               <div class="col-sm-11 col-10" >
                   
                   <span class="font-size-13 bold">{{messageData?.sender?.displayName}}</span>
                   <div class="format-message">
                       <div [innerHTML]="messageData.content | safeHtml" class="scale-images">
                           
                       </div>
                       <div class="pad10" *ngIf="messageData.media">
                           <giphy-animated-gif 
                                   [height]="messageData.media.height"
                                   [width]="messageData.media.width"
                                   [url]="messageData.media.url"
                           ></giphy-animated-gif>
                       </div>
                   </div>
                  
                </div>
           </div>
       </div> 
    `,

})

export class ChatMessageComponent implements OnInit {
    @Input() messageData : ChatMessage  ;
    @Input() content  : string;
    constructor() {
    }

    ngOnInit() {
    }
}