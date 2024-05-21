$(document).ready(function() {
    let start = Math.random();
    let turn;
    let $grid = $('#grid');
    let character_user;
    let character_server;
    let $mesaj = $('#mesaj');
    let user_start;

    function create_td_handlers() {
        $grid.find('tr').each(function() {
            $(this).find('td').each(function() {
                $(this).click(async function() {
                    if (turn === 1) {
                        $(this).text(character_user);
                        $mesaj.text('Tura mea!');
                        await sleep(2000);
                        let winner = await check_winner();
                        if (winner === 0) {
                            turn = 0;
                            await serverTurn();
                        }
                    }
                });
            });
        });
    }

    async function initializeGame() {
        if (start >= 0.5) {
            turn = 1;
            user_start = 1;
            character_user = 'X';
            character_server = 'O';
            $mesaj.text('Tura ta!');
        } else {
            user_start = 0;
            character_user = 'O';
            character_server = 'X';
            $mesaj.text('Tura mea!');
            turn = 0;
            await serverTurn();
        }
    }

    async function check_winner() {
        let winner = await get_winner();
        if (winner === -1) {
            alert("Este egalitate!");
            return winner;
        } else if (winner === 1) {
            alert("Ai castigat!");
            return winner;
        } else if (winner === 2) {
            alert("Ai pierdut!");
            return winner;
        }
        return 0;
    }

    function get_data_from_grid($grid) {
        let result_list = [];
        $grid.find('tr').each(function() {
            let row_list = [];
            $(this).find('td').each(function() {
                row_list.push($(this).text());
            });
            result_list.push(row_list);
        });
        return result_list;
    }

    function set_cell_value(i, j, text) {
        let $rows = $grid.find('tr');
        $rows.eq(i).find('td').eq(j).text(text);
        $mesaj.text('Tura ta!');
    }

    function get_winner() {
        return new Promise((resolve, reject) => {
            let data = {
                'data': get_data_from_grid($grid),
                'user': user_start
            };
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8084/determine-winner',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    resolve(parseInt(JSON.parse(response)));
                },
                error: function() {
                    reject(new Error('Request failed'));
                }
            });
        });
    }

    function get_character() {
        return new Promise((resolve, reject) => {
            let data = {
                'data': get_data_from_grid($grid),
                'character': character_server
            };
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:8084/get-char',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    resolve(JSON.parse(response));
                },
                error: function() {
                    reject(new Error('Request failed'));
                }
            });
        });
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function serverTurn() {
        let data = await get_character();
        let i = data[0]
        let j = data[1]
        set_cell_value(i, j, character_server);
        let winner = await check_winner();
        if (winner === 0) {
            turn = 1;
            $mesaj.text('Tura ta!');
        }
    }

    create_td_handlers();
    initializeGame();
});
