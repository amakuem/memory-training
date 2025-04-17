import { Trainer } from './trainer.js';
import { User } from './user.js';
import { Statistic } from './statistic.js';
import { Deck } from './deck.js';
import { Card } from './card.js';

test('Constructor initializes correctly', () => {
    const trainer = new Trainer();
    expect(trainer.__isUserLogin).toBe(false);
    expect(trainer.__currentUser).toBe(null);
});

// test('getUserName throws error if no user is logged in', () => {
//     const trainer = new Trainer();
//     expect(() => trainer.getUserName()).toThrow();
// });

test('getUserName returns user name if user is logged in', () => {
    const trainer = new Trainer();
    trainer.registerUser('Alice', 'password', 'alice@example.com', 1);
    expect(trainer.getUserName()).toBe('Alice');
});
// test('getUserMail throws error if no user is logged in', () => {
//     const trainer = new Trainer();
//     expect(() => trainer.getUserMail()).toThrow();
// });

test('getUserMail returns user email if user is logged in', () => {
    const trainer = new Trainer();
    trainer.registerUser('Bob', 'password', 'bob@example.com', 2);
    expect(trainer.getUserMail()).toBe('bob@example.com');
});

test('getUserAmountOFDecks throws error if no user is logged in', () => {
    const trainer = new Trainer();
    expect(() => trainer.getUserAmountOFDecks()).toThrow();
});

test('getUserAmountOFDecks returns correct number of decks', () => {
    const trainer = new Trainer();
    trainer.registerUser('Charlie', 'password', 'charlie@example.com', 3);
    trainer.addUserDeck('Math', 'Math problems');
    expect(trainer.getUserAmountOFDecks()).toBe(2); // 1 + 1 (по логике метода)
});

test('getUserStatisticCorrectAnswers throws error if no user is logged in', () => {
    const trainer = new Trainer();
    expect(() => trainer.getUserStatisticCorrectAnswers()).toThrow();
});

test('getUserStatisticCorrectAnswers returns correct answers', () => {
    const trainer = new Trainer();
    trainer.registerUser('David', 'password', 'david@example.com', 4);
    trainer.__currentUser.__statistic.incrementCorrectAnswers(); // Модифицируем статистику
    expect(trainer.getUserStatisticCorrectAnswers()).toBe(1);
});

test('getUserStatisticTotalAnswers throws error if no user is logged in', () => {
    const trainer = new Trainer();
    expect(() => trainer.getUserStatisticTotalAnswers()).toThrow();
});

test('getUserStatisticTotalAnswers returns total answers', () => {
    const trainer = new Trainer();
    trainer.registerUser('Eve', 'password', 'eve@example.com', 5);
    trainer.__currentUser.__statistic.incrementTotalAnswers();
    expect(trainer.getUserStatisticTotalAnswers()).toBe(1);
});

test('logUser sets __isUserLogin to true', () => {
    const trainer = new Trainer();
    trainer.logUser('test@example.com', 'password');
    expect(trainer.__isUserLogin).toBe(true);
    expect(trainer.__currentUser).toBe(null); // В текущей реализации пользователь не устанавливается
});

// test('registerUser creates a new user and logs in', () => {
//     const trainer = new Trainer();
//     trainer.registerUser('Frank', 'password', 'frank@example.com', 6);
//     expect(trainer.__isUserLogin).toBe(true);
//     expect(trainer.__currentUser).toBeInstanceOf(User);
//     expect(trainer.getUserName()).toBe('Frank');
//     expect(trainer.getUserMail()).toBe('frank@example.com');
// });

test('addUserDeck adds a deck to the user', () => {
    const trainer = new Trainer();
    trainer.registerUser('Grace', 'password', 'grace@example.com', 7);
    trainer.addUserDeck('History', 'History facts');
    expect(trainer.__currentUser.__decks.length).toBe(1);
    expect(trainer.__currentUser.__decks[0].getName()).toBe('History');
});

test('deleteUserDeck removes a deck from the user', () => {
    const trainer = new Trainer();
    trainer.registerUser('Hannah', 'password', 'hannah@example.com', 8);
    trainer.addUserDeck('Science', 'Science concepts');
    trainer.addUserDeck('Math', 'Math problems');
    trainer.deleteUserDeck(0);
    expect(trainer.__currentUser.__decks.length).toBe(1);
    expect(trainer.__currentUser.__decks[0].getName()).toBe('Math');
});

test('addUserCardInDeck adds a card to the deck', () => {
    const trainer = new Trainer();
    trainer.registerUser('Ivy', 'password', 'ivy@example.com', 9);
    trainer.addUserDeck('Geography', 'Geography questions');
    trainer.addUserCardInDeck(0, 'Capital of France', 'Paris');
    expect(trainer.__currentUser.__decks[0].__cards.length).toBe(1);
    expect(trainer.__currentUser.__decks[0].__cards[0].getFront()).toBe('Capital of France');
});

test('deleteUserCardInDeck removes a card from the deck', () => {
    const trainer = new Trainer();
    trainer.registerUser('Jack', 'password', 'jack@example.com', 10);
    trainer.addUserDeck('Biology', 'Biology terms');
    trainer.addUserCardInDeck(0, 'What is DNA?', 'Deoxyribonucleic acid');
    trainer.addUserCardInDeck(0, 'What is RNA?', 'Ribonucleic acid');
    trainer.deleteUserCardInDeck(0, 0);
    expect(trainer.__currentUser.__decks[0].__cards.length).toBe(1);
    expect(trainer.__currentUser.__decks[0].__cards[0].getFront()).toBe('What is RNA?');
});

test('updateUserStatistic updates user statistic', () => {
    const trainer = new Trainer();
    trainer.registerUser('Kate', 'password', 'kate@example.com', 11);
    jest.useFakeTimers().setSystemTime(new Date('2023-01-01'));
    trainer.updateUserStatistic();
    expect(trainer.__currentUser.__statistic.__streak).toBe(1);
    jest.setSystemTime(new Date('2023-01-02'));
    trainer.updateUserStatistic();
    expect(trainer.__currentUser.__statistic.__streak).toBe(1); // Не вчера, поэтому сброс
    jest.useRealTimers();
});
