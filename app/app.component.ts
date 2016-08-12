import {Component} from "@angular/core";
import {CardComponent} from "./components/card/card.component";
import {CounterComponent} from "./components/counter/counter.component";
import {RestartButtonComponent} from "./components/restart-button/restart-button.component";

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'hiragana-quiz.component.html',
    styleUrls: ['hiragana-quiz.component.css'],
    directives: [CardComponent, CounterComponent, RestartButtonComponent]
})
export class AppComponent {

    // Angular being dorky, or me being dumb, or both
    private tempArray: boolean[];

    private totalCardsCount: number;
    private correctAnswersCount: number;
    private wrongAnswersCount: number;
    private currentCardNumber: number;

    private isGameOver: boolean = false;

    constructor() {
        this.resetCounts();
    }

    private get cardsLeftCount(): number {
        let givenAnswersCount =
            this.correctAnswersCount + this.wrongAnswersCount;
        return this.totalCardsCount - givenAnswersCount;
    }

    public correctAnswer(): void {
        this.correctAnswersCount++;
        this.nextCard();
    }

    public wrongAnswer(givenAnswer: string): void {
        this.wrongAnswersCount++;
        this.nextCard();
    }

    public nextCard(): void {
        this.currentCardNumber++;
        if (this.currentCardNumber >= this.totalCardsCount) {
            this.gameOver();
        }
    }

    public gameOver(): void {
        this.isGameOver = true;
    }

    private resetCounts(): void {
        this.correctAnswersCount = 0;
        this.wrongAnswersCount = 0;
        this.totalCardsCount = 5;
        this.tempArray = new Array(this.totalCardsCount);
        this.currentCardNumber = 0;
    }

    public startGame(): void {
        this.isGameOver = false;
        this.resetCounts();
    }

}
