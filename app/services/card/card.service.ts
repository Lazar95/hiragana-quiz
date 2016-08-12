import { Injectable } from '@angular/core';
import {CHARACTERS_MAP} from "../../mock.data";
import * as _ from "lodash";
import {Card} from "../../models/card.model";

@Injectable()
export class CardService {

    constructor() { }

    public generateCard():Promise<Card> {
        let shuffledMap = _.shuffle(CHARACTERS_MAP);
        let choices: string[] =
            _.shuffle(shuffledMap.slice(0, 4).map(el => el.hiragana));
        let question: string = shuffledMap[0].romaji;
        return Promise.resolve(new Card(question, choices));
    }

    public isCorrect(romaji: string, hiragana: string): boolean {
        return CHARACTERS_MAP
                .find(el => el.romaji === romaji).hiragana === hiragana;
    }

}