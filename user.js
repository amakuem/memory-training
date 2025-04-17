import { Deck } from "./deck";
import { Statistic } from "./statistic";
import { NotificationManager } from "./notification";

export class User{
    constructor(name, mail, password, id){
        this.__name = name;
        this.__mail = mail;
        this.__password = password;
        this.__decks = [] 
        this.__id = id;
        this.__statistic = new Statistic();
        this.__notificationManager = new NotificationManager(this.__id);
    }
    getId(){
        return this.__id;
    }
    getName() {
        return  this.__name;
    }
    getMail(){
        return this.__mail;
    }
    getPassword(){
        return this.__password;
    }
    getAmountOfDecks(){
        return this.__decks.length + 1
    }
    getStatisticCorrectAnswers(){
        return this.__statistic.getCorrectAnswers();
    }
    getStatisticTotalAnswers(){
        return this.__statistic.getTotalAnswers();
    }


    addDeck(name, description){
        let deck = new Deck(name, description);
        this.__decks.push(deck);
    }
    deleteDeck(index){
        this.__decks.splice(index, 1);
    }
    addCardInDeck(index, front, back){
        this.__decks[index].addCard(front, back);
    }
    deleteCardInDeck(decIndex, cardIndex){
        this.__decks[decIndex].deleteCard(cardIndex);
    }
    updateStatistic(){
        this.__statistic.updateStreak();    
    }
    
}