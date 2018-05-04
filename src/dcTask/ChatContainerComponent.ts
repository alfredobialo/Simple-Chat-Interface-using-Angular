import {Component, OnInit, OnDestroy, EventEmitter, Output, Pipe, PipeTransform} from '@angular/core';
import {ChatMessage} from './ApiResponse';
import {isEmpty} from 'lodash';
import {DomSanitizer} from '@angular/platform-browser';

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
            </div>
        </div>

    `
})
export class ChatContainerComponent implements OnInit, OnDestroy {
    private processing: boolean = false;
    // @ViewChild() chatArea : ElementRef  ;

       messages: Array<ChatMessage> = [];

    ngOnDestroy(): void {


    }

    addMessage(msg: string, temp: HTMLDivElement) {


        this.messages.push(
            new ChatMessage(msg, null, ChatMessage.getDefaultUsers()[0])
        );

        temp.scrollTop = temp.scrollHeight;// - temp.clientHeight;

    }

    constructor() {
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

                        <button [ngbPopover]="markup"  popoverTitle="Select Animated Gif" class="btn btn-outline-primary btn-md"><i class="fa fa-smile-o color-red bold fa-2x"></i></button>
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

    addGifToInput(gif, div : HTMLDivElement)
    {
        // create a new image object here
        div.appendChild( gif.gifElem.cloneNode(true));
        div.focus();


    }

    emitKeyUpEvent(evt: KeyboardEvent, elem: HTMLDivElement) {
        //check if the enter key was pressed and raise the approp. response
        if (evt.keyCode == 13 && !evt.altKey) {
            this.sendMessage(elem);

        }
        else if (evt.keyCode == 13) {
            //alert("CTRL key held");
            const node: any = document.createElement('br');
            elem.appendChild(node);
        }

    }
}