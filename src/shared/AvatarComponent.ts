import {Component, Input, OnInit} from '@angular/core';

export enum AvartaSize {
    XXSMALL = 1,
    XSMALL = 2,
    SMALL = 3,
    DEFAULT = 4,
    LARGE = 5,
    XLARGE = 6,
    XXLARGE = 7
}
@Component({
    selector: 'user-avatar',
    template: `
        <div class="card-picture{{_avartaSize}} ">
            <div class="pic"
                 [style.background-image]="generateUrl()"
            >

            </div>
        </div>
    `
})
export class AvatarComponent implements OnInit {
    @Input() imageUrl: string;
    @Input() size: AvartaSize = AvartaSize.DEFAULT;
    _avartaSize: string;

    constructor() {
    }

    ngOnInit() {
        // set the avartar size
        switch (this.size) {
            case AvartaSize.XXSMALL:
                this._avartaSize = '-xxsmall';
                break;
            case AvartaSize.XSMALL:
                this._avartaSize = '-xsmall';
                break;
            case AvartaSize.SMALL:
                this._avartaSize = '-small';
                break;
            case AvartaSize.DEFAULT:
                this._avartaSize = '';
                break;
            case AvartaSize.LARGE:
                this._avartaSize = '-large';
                break;
            case AvartaSize.XLARGE:
                this._avartaSize = '-xlarge';
                break;
            case AvartaSize.XXLARGE:
                this._avartaSize = '-xxlarge';
                break;
        }
    }

    generateUrl() {
        const url: string = `url(${this.imageUrl})`;
        ///alert(url);
        return url;
    }
}