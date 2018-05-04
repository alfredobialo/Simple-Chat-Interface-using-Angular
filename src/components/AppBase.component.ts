import {Component, OnInit} from '@angular/core';
import {ChatMessage, MessageSender} from '../dcTask/ApiResponse';

@Component({
    selector: 'app',
    template: `
        <div>
            <div class="app-bar p-3">
                <h4 class="text-uppercase">{{appName || 'App name'}}</h4>
            </div>
            <div class="container-fluid ">
                <div class="row no-gutters">
                    <div class="col-sm-2">
                        <div class="bg-white margin-r-10 shadow min-h500 d-flex flex-column text-left">
                            <p class="divider p-2">Users</p>
                            <div class="pad10 divider" *ngFor="let u of users">
                                <div class="row ">
                                    <div class="col-2">
                                        <user-avatar [imageUrl]="u.pictureUrl" [size]="1"></user-avatar>
                                    </div>
                                    <div class="col-10">
                                        <span class="font-size-12 bold">{{u.displayName}}</span>
                                        <span class="pull-right"><i class="fa fa-user color-blue"></i></span>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="col-sm-10  ">
                        <div class="d-flex flex-column min-h600 align-content-start pad20 bg-white ">
                            <div class="row">
                                <div class="col-sm-10">
                                    <chat-container></chat-container>
                                </div>
                                <div class="col-sm-2">

                                </div>
                            </div>
                           


                        </div>

                    </div>
                </div>


            </div>
        </div>


    `,
})
export class AppComponent implements OnInit {
    appName: string = 'DC Task App';
    users: Array<MessageSender> = [];

    ngOnInit() {
        this.users = ChatMessage.getDefaultUsers();
    }
}