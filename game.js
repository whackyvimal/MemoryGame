document.addEventListener('DOMContentLoaded', () => {
    let cards = Array.from(document.querySelectorAll('.card'));
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let matchedCards = 0;

    function shuffle() {
        const board = document.getElementById('game-board');
        // Shuffle array
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        // Remove all cards and re-add in shuffled order
        board.innerHTML = '';
        cards.forEach(card => {
            card.classList.remove('flip');
            board.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;
        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.card === secondCard.dataset.card;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        matchedCards += 2;
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
        if (matchedCards === cards.length) {
            setTimeout(() => alert('Congratulations! You found all pairs!'), 500);
        }
    }

    function unflipCards() {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function restartGame() {
        matchedCards = 0;
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });
        shuffle();
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
    document.querySelector('.restart-button').addEventListener('click', restartGame);

    shuffle();
});