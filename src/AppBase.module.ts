import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/AppBase.component';
import {GiphyModule} from './dcTask/GiphyModule';
import {SharedModule} from './shared/SharedModule';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    // schemas : [NO_ERRORS_SCHEMA],
    imports: [BrowserModule, GiphyModule,NgbModule.forRoot() ],
    declarations: [AppComponent ],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppBaseModule {
}
