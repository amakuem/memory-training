export class Card{

    constructor(front,back){
        this.__front = front;
        this.__back = back;
        this.__nextReview = new Date();
    }
    getFront(){
        return this.__front;
    }
    getBack(){
        return  this.__back;
    }
    getTimeToReview(){
        const now = new Date();
        const diff = this.__nextReview.getTime() - now.getTime();
        return Math.ceil(diff / 60000);
    }
    getNextReview() {
        return this.__nextReview;
    }

    processAnswer(quality) {
        // quality: 1 = не помню, 2 = хорошо, 3 = очень легко
        const now = new Date();
        
        switch(quality) {
            case 1: // "не помню" - повторить через 1 минуту
                this.__nextReview = new Date(now.getTime() + 1 * 60000);
                break;
            case 2: // "хорошо" - повторить через 10 минут
                this.__nextReview = new Date(now.getTime() + 10 * 60000);
                break;
            case 3: // "очень легко" - повторить через 4 дня
                this.__nextReview = new Date(now.getTime() + 4 * 24 * 60 * 60000);
                break;
            default:
                this.__nextReview = now;
        }
    }
    isDue() {
        return new Date() >= this.__nextReview;
    }
}