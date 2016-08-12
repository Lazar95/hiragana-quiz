import {
    Component, OnInit, Input, OnDestroy, trigger,
    style, state, transition, animate, HostListener, Output, EventEmitter
} from '@angular/core';
import {CardService} from "../../services/card/card.service";
import {Card} from "../../models/card.model";

@Component({
    moduleId: module.id,
    selector: 'card',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.css'],
    providers: [CardService],
    animations: [
        trigger('flyInOut', [
            //state('in', style({transform: 'scale(1)'})),
            transition('void => *', [
                style({
                    transform: 'scale(1.15)',
                    opacity: '0'
                }),
                animate('333ms ease-out')
            ]),
            transition('* => void', [
                animate('333ms ease-out', style({
                    transform: 'scale(.9)',
                    opacity: '0'
                }))
            ])
        ])
    ],
    host: {
        '[@flyInOut]': 'true'
    }
})
export class CardComponent implements OnInit {

    private sub: any;
    private card: Card;

    @Output() correctAnswer = new EventEmitter();
    @Output() wrongAnswer = new EventEmitter();

    constructor(private cardService: CardService) {
    }

    ngOnInit() {
        this.sub = this.cardService.generateCard().then(card => {
            this.card = card;
        });
    }

    private getPressedNumber(keyCode: number) {
        let pressedNumber;
        switch (keyCode) {
            case 49:
            case 97:
                pressedNumber = 1;
                break;
            case 50:
            case 98:
                pressedNumber = 2;
                break;
            case 51:
            case 99:
                pressedNumber = 3;
                break;
            case 52:
            case 100:
                pressedNumber = 4;
                break;
            default:
                return null;
        }
        return pressedNumber;
    }

    @HostListener('document:keypress', ['$event'])
    private keypressHandler(event) {
        let pressedNumber = this.getPressedNumber(event.keyCode);
        if (pressedNumber === null) return;
        let isCorrect: boolean = this.cardService.isCorrect(
            this.card.question,
            this.card.choices[pressedNumber - 1]
        );
        if (isCorrect) {
            this.correctAnswer.emit();
        } else {
            this.wrongAnswer.emit(this.card.choices[pressedNumber]);
        }
    }

}