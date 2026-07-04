from app import app, get_next_player


def test_next_player_switches_between_x_and_o():
    assert get_next_player("X") == "O"
    assert get_next_player("O") == "X"


def test_home_page_includes_result_modal():
    client = app.test_client()
    response = client.get("/")

    assert response.status_code == 200
    assert b"result-modal" in response.data
    assert b"Play Again" in response.data
