import {
    Component, OnInit, Output, EventEmitter, style,
    animate, transition, trigger, ElementRef
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'restart-button',
    template: '<button (click)="invokeRestartHandler()">↺</button>',
    styleUrls: ['restart-button.component.css'],
    animations: [
        trigger('restartButton', [
            transition('void => *', [
                style({
                    transform: 'scale(.6) rotate(45deg)',
                    opacity: '0'
                }),
                animate('333ms ease-out')
            ]),
            transition('* => void', [
                animate('333ms ease-out', style({
                    transform: 'scale(1.33)',
                    opacity: '0'
                }))
            ])
        ])
    ],
    host: {
        '[@restartButton]': 'true'
    }
})
export class RestartButtonComponent implements OnInit {

    @Output()
    public invokeRestart = new EventEmitter();

    private invokeRestartHandler() {
        this.invokeRestart.emit();
    }

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.elementRef.nativeElement.children[0].focus();
    }

}