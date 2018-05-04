import {NgModule} from '@angular/core';
import {ChatContainerComponent, ChatInputComponent, SafeHtmlPipe} from './ChatContainerComponent';
import {SharedModule} from '../shared/SharedModule';
import {GiphyApi} from './GiphyApi';
import {GiphyAnimatedGifComponent, GiphyAnimatedGifGridComponent} from './GiphyAnimatedGifComponent';
import {ChatMessageComponent} from './ChatMessageComponent';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports : [SharedModule,NgbModule],
    exports:[ChatContainerComponent, SharedModule, SafeHtmlPipe],
    declarations: [ChatContainerComponent, GiphyAnimatedGifComponent,GiphyAnimatedGifGridComponent,
                    ChatInputComponent, ChatMessageComponent , SafeHtmlPipe],
    providers : [GiphyApi]
})
export class GiphyModule {

}
