from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

WIN_PATTERNS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]


def check_winner(board):
    for pattern in WIN_PATTERNS:
        a, b, c = pattern

        if board[a] != "" and board[a] == board[b] == board[c]:
            return board[a]

    if "" not in board:
        return "Draw"

    return None


def get_next_player(current_player):
    return "O" if current_player == "X" else "X"


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/play_move", methods=["POST"])
def play_move():
    data = request.get_json()
    board = data.get("board", [""] * 9)
    index = data.get("index")
    current_player = data.get("current_player", "X")

    if not isinstance(board, list) or len(board) != 9 or index is None:
        return jsonify({
            "board": [""] * 9,
            "winner": None,
            "current_player": current_player
        })

    if not 0 <= index < len(board) or board[index] != "":
        return jsonify({
            "board": board,
            "winner": None,
            "current_player": current_player
        })

    board[index] = current_player
    winner = check_winner(board)
    next_player = current_player

    if winner is None and "" in board:
        next_player = get_next_player(current_player)

    return jsonify({
        "board": board,
        "winner": winner,
        "current_player": next_player
    })


@app.route("/computer_move", methods=["POST"])
def computer_move():
    return play_move()


if __name__ == "__main__":
    app.run(debug=True)