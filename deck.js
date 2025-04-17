import { Card } from "./card.js";

export class Deck {
    constructor(name, description, ownerId){
        this.__name = name;
        this.__description = description;
        this.__cards = [];
        this.__ownerId = ownerId;

    }
    getName(){
        return this.__name;
    }
    getDescription(){
        return this.__description;
    }
    
    addCard(front, back){
        let card = new Card(front, back);
        this.__cards.push(card);
    }
    deleteCard(index){
        this.__cards.splice(index,1);
    }
    
}