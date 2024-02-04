document.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = Array(9).fill('');
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleResultValidation = () => {
        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
                isGameActive = false;
                return;
            }
        }

        if (!board.includes('')) {
            announce(TIE);
        }
    };

    const announce = (resultType) => {
        switch (resultType) {
            case PLAYERO_WON:
                announcer.innerHTML = `Player <span class="playerO">O</span> Won`;
                break;
            case PLAYERX_WON:
                announcer.innerHTML = `Player <span class="playerX">X</span> Won`;
                break;
            case TIE:
                announcer.innerText = 'It\'s a Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => tile.innerText === '' && isGameActive;

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const switchPlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const handleUserAction = (tile, index) => {
        if (isValidAction(tile)) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            switchPlayer();
        }
    };

    const resetBoard = () => {
        board = Array(9).fill('');
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            switchPlayer();
        }

        tiles.forEach((tile) => {
            tile.innerText = '';
            tile.classList.remove('playerX', 'playerO');
        });
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => handleUserAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});
