import {
    Component,
    OnInit,
    Input,
    state,
    trigger,
    style,
    transition,
    animate
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'counter',
    templateUrl: 'counter.component.html',
    styleUrls: ['counter.component.css']
})
export class CounterComponent implements OnInit {

    private _count: number = 0;

    @Input()
    private set count(newCount) {
        this._count = newCount;
        this.highlight();
    }

    private get count(): number {
        return this._count;
    }

    @Input()
    private text: string = '';

    private state: string = 'normal';

    private highlight() {
        this.state = 'highlight';
        setTimeout(() => {
            this.state = 'normal'
        }, 333);
    }

    constructor() {
    }

    ngOnInit() {
    }

}