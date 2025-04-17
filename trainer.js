import { User } from "./user";

class Trainer {
    constructor(){
        
        this.__isUserLogin = false;
        this.__currentUser = null;


    }
    getUserName(){
        return this.__currentUser.getName();
    }
    getUserMail(){
        return this.__currentUser.getMail();
    }
    getUserAmountOFDecks(){
        return this.__currentUser.getAmountOfDecks();
    }
    getUserStatisticCorrectAnswers(){
        return  this.__currentUser.getStatisticCorrectAnswers();
    }
    getUserStatisticTotalAnswers(){
        return this.__currentUser.getStatisticTotalAnswers();
    }


    logUser(mail, password){
        //запрос к бд на проверку пользователя
        if(true){
            this.__isUserLogin = true;
        }
    }
    registerUser(name, password, mail, id){
        
        this.__currentUser = new User(name, password, mail, id);
        //добавление в бд
        this.__isUserLogin = true;
    }
    addUserDeck(name, description){
        this.__currentUser.addDeck(name, description);
    }
    deleteUserDeck(index){
        this.__currentUser.deleteDeck(index);
    }
    addUserCardInDeck(index, front, back){
        this.__currentUser.addCardInDeck(index, front, back);
    }
    deleteUserCardInDeck(decIndex, cardIndex){
        this.__currentUser.deleteCardInDeck(decIndex, cardIndex);
    }
    updateUserStatistic(){
        this.__currentUser.updateStatistic();
    }
    studing(deckIndex) {
        const deck = this.__currentUser.__decks[deckIndex];
        if (!deck) {
            throw new Error("Колода не найдена");
        }
        const cards = deck.__cards;
        if (cards.length === 0) {
            throw new Error("В колоде нет карточек");
        }

        // Фильтруем только карточки, которые пора повторить
        let dueCards = cards.filter(card => card.isDue());
        if (dueCards.length === 0) {
            // Находим ближайшее время повторения
            const nextReviewTime = Math.min(...cards.map(card => card.getTimeToReview()));
            throw new Error(`Нет карточек для повторения. Следующее повторение через ${nextReviewTime} минут`);
        }

        let correctAnswers = 0;
        let totalAnswers = 0;
        let currentCardIndex = 0;

        return {
            getCurrentCard() {
                return dueCards[currentCardIndex];
            },

            checkAnswer(quality) {
                const currentCard = dueCards[currentCardIndex];
                totalAnswers++;
                
                if (quality >= 1 && quality <= 3) {
                    if (quality >= 2) correctAnswers++;
                    currentCard.processAnswer(quality);
                }

                // Обновляем статистику пользователя
                this.__currentUser.updateStatistic();

                return {
                    correctAnswers,
                    totalAnswers,
                    nextReview: currentCard.getNextReview(),
                    timeToNextReview: currentCard.getTimeToReview()
                };
            },

            nextCard() {
                currentCardIndex++;
                // Обновляем список карточек для повторения
                if (currentCardIndex >= dueCards.length) {
                    dueCards = cards.filter(card => card.isDue());
                    currentCardIndex = 0;
                }
                return dueCards.length > 0;
            },

            getProgress() {
                return {
                    currentCard: currentCardIndex + 1,
                    totalDueCards: dueCards.length,
                    totalCards: cards.length,
                    correctAnswers,
                    totalAnswers,
                    accuracy: totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0
                };
            }
        };
    }
    sesionOfTraning(deckIndex) {
        const sesion = this.studing(deckIndex);
        while (true) {
            const card = session.getCurrentCard();
            console.log("Вопрос:", card.getFront());
            
            const userQuality = 0;
           // const userQuality = /* ввод пользователя (1-3) */;
            const result = session.checkAnswer(userQuality);
            
            console.log(`Следующее повторение через: ${result.timeToNextReview} минут`);
            
            if (!session.nextCard()) {
                console.log("Все карточки повторены!");
                break;
            }
            
            const progress = session.getProgress();
            console.log(`Прогресс: ${progress.currentCard}/${progress.totalDueCards} (Всего карточек: ${progress.totalCards})`);
        }
    }
}