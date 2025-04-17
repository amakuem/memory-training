
export class Statistic{
    constructor(){
        this.__correctAnswers = 0;
        this.__totalAnswers = 0;
        this.__streak = 0;
        this.__maxStreak = 0;
        this.__lastStudied;
    }
    getCorrectAnswers(){
        return this.__correctAnswers;
    }
    getTotalAnswers(){
        return  this.__totalAnswers;
    }
    incrementCorrectAnswers(){
        this.__correctAnswers++;
    }

    
    incrementTotalAnswers(){
        this.__totalAnswers++;
    }
    updateLastStadies(){
        let current = new Date();
        this.__lastStudied = current;
    }
    updateStreak(){
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (this.__lastStudied == yesterday){
            this.__streak++;
        }
        else {
            this.__streak = 1;
        }
        this.updateMaxStreak();
        this.updateLastStadies();
    }
    updateMaxStreak(){
        if (this.__streak > this.__maxStreak){
            this.__maxStreak = this.__streak;
        }
    }
}