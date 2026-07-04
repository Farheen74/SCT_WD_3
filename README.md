# Tic Tac Toe Web Application

A local two-player Tic Tac Toe web game built with Python Flask, HTML, CSS, and JavaScript. Players take turns on the same board, and the result appears in a stylish in-page modal when the game ends.

## Features
- Local 2-player gameplay
- Player 1 uses X and Player 2 uses O
- Win detection for rows, columns, and diagonals
- Draw detection when the board fills without a winner
- Stylish in-page result overlay shows the game outcome
- Restart button to reset the board at any time
- Responsive UI with active player highlighting

## Requirements
- Python 3.x
- Flask

## How to play
1. Click any empty cell to place the current player's symbol.
2. Player 1 starts as X, then Player 2 plays as O.
3. The status text updates with the current player's turn.
4. When the game ends, the result is shown in a modal overlay.
5. Click "Play Again" or "Restart Game" to start a new match.

## Notes
- The result uses an in-page modal, so no popup permission is required.
- The app currently supports local play only, not online multiplayer.
