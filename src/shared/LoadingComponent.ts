import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'loading',
    template: `
        <span *ngIf="active"
              class="fa-2x fa fa-refresh fa-spin spinner-color"></span>
    `,
    styles: [`
        .spinner-color {
            color: #cccccc;
        }
    `]
})

export class LoadingComponent implements OnInit {
    @Input() active: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }
}
