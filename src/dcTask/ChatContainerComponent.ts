import {Component, OnInit, OnDestroy, EventEmitter, Output, Pipe, PipeTransform} from '@angular/core';
import {ApiResponse, ChatMessage, ConvertResponse, IApiResponse} from './ApiResponse';
import {isEmpty, random} from 'lodash';
import {DomSanitizer} from '@angular/platform-browser';
import {GiphyApi} from './GiphyApi';
import {Subscription} from 'rxjs/Subscription';


@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }

    transform(value) {
        // console.log(this.sanitized.bypassSecurityTrustHtml(value));
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

@Component({
    selector: 'chat-container',
    template: `
        <div class="min-h600 max-height-600 d-flex flex-column justify-content-start">
            <div class="message-area" #chatArea>

                <chat-message *ngFor="let msg of messages" [messageData]="msg">

                </chat-message>


            </div>
            <div class="message-sender">
                <chat-input (onSend)="addMessage($event, chatArea)"></chat-input>
                <div class="font-size-12 text-muted">
                    To Add Animated Image include the command :
                    <span><code>/giphy:</code>&lt;<span class="bold">search text</span>&gt;</span>
                </div>
            </div>
        </div>

    `
})
export class ChatContainerComponent implements OnInit, OnDestroy {
    private processing: boolean = false;
    $g: Subscription;
    // @ViewChild() chatArea : ElementRef  ;

    messages: Array<ChatMessage> = [];

    ngOnDestroy(): void {


    }

    addMessage(msg: string, temp: HTMLDivElement) {

        // lets check if our predefined giphy is set
        // using the pattern /giphy:<search text>
        /*
        *   We could use Regular expressiong to match this word
        *   var pattern  =  / \/giphy: ?\w+  /
        * */
        const giphy = '/giphy:';
        let pp = msg.toLowerCase();
        let index: number = pp.indexOf(giphy);
        let prefix = '';
        // so if found then let get the text included until the end of the search phrase
        if (index > -1) {
            let giphySearchText = pp.substring(index + giphy.length);
            prefix = msg.substring(0, index);
            // remove all html
            index = giphySearchText.indexOf('<');

            if (index > -1) {
                //html tag found, ignore from here
                giphySearchText = (giphySearchText.substring(0, index)).trim();
                // let append the main giphy search phrase if we have a prefixed text before the command

            }

            if (!isEmpty(giphySearchText)) {
                // let check if there is a text before our command
                if(!isEmpty(prefix))
                {
                    prefix += ` ${giphySearchText.toUpperCase()}`;
                }
                console.log(prefix  ,  giphySearchText);
                // to search the api and add the searched image
                this.$g = this.api.searchGifs(giphySearchText, 5)
                    .subscribe(x => {

                        let gifResponse: IApiResponse = <ApiResponse> ConvertResponse.convert(x);
                        const image = gifResponse.data[random(gifResponse.data.length - 1)].images.fixed_width;
                        this.messages.push(
                            new ChatMessage(prefix, image, ChatMessage.getDefaultUsers()[random(ChatMessage.getDefaultUsers().length - 1)])
                        );
                    }, x => {
                        console.log('Could not connect to giphy Servers');
                    });

                //this.$g.unsubscribe();

            }


        }
        else {
            this.messages.push(
                new ChatMessage(msg, null, ChatMessage.getDefaultUsers()[0])
            );
        }


        temp.scrollTop = temp.scrollHeight;// - temp.clientHeight;

    }

    constructor(private api: GiphyApi) {
    }

    ngOnInit() {


    }


}


@Component({
    selector: 'chat-input',
    template: `
        <div class="chat-input">
            <div class="row no-gutters">
                <div class="col-11">
                    <div (keyup)="emitKeyUpEvent($event, divElem)" #divElem
                         class="pad10 text-left font-size-14 "
                         contenteditable="true" style="min-height: 50px;
                    max-height : 220px; overflow:auto; ">
                    </div>
                </div>
                <div class="col-1">
                    <div style="min-height: 50px;" class="text-right">

                        <button [ngbPopover]="markup" popoverTitle="Select Animated Gif" class="btn btn-outline-primary btn-md"><i
                                class="fa fa-smile-o color-red bold fa-2x"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <ng-template #markup>
            <div class="fix-width-350px">
                <gif-grid (onGifClicked)="addGifToInput($event, divElem)"></gif-grid>
            </div>
        </ng-template>

    `,
    styles: [`
        div.chat-input {
            border-radius: 0px 0px 6px 6px;
            border: 1px solid #cccccc;
        }
    `]

})
export class ChatInputComponent {
    @Output() onSend: EventEmitter<string> = new EventEmitter<string>();

    sendMessage(elem: HTMLDivElement) {
        // validation neccessary, but i would sip for now;
        if (!isEmpty(elem.innerHTML)) {
            this.onSend.emit(elem.innerHTML);
            elem.innerHTML = '';
            // console.log(elem);
            // console.log(elem.childNodes);
            // console.log(elem.children);

        }

    }

    addGifToInput(gif, div: HTMLDivElement) {
        // create a new image object here
        div.appendChild(gif.gifElem.cloneNode(true));
        div.focus();


    }

    emitKeyUpEvent(evt: KeyboardEvent, elem: HTMLDivElement) {
        //check if the enter key was pressed and raise the approp. response
        if (evt.keyCode == 13 && !evt.altKey) {
            this.sendMessage(elem);
            evt.preventDefault();

        }
        else if (evt.keyCode == 13) {
            //alert("CTRL key held");
            const node: any = document.createElement('br');
            elem.appendChild(node);
        }

    }
}