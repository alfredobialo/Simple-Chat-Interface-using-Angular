import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AvatarComponent} from './AvatarComponent';
import {LoadingComponent} from './LoadingComponent';

@NgModule({
    imports : [CommonModule, HttpClientModule],
    declarations : [AvatarComponent, LoadingComponent],
    exports : [AvatarComponent, LoadingComponent,CommonModule,HttpClientModule]
})
export class SharedModule{}