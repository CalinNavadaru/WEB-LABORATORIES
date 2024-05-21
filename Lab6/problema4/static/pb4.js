let start = Math.random();
let turn;
let grid = document.getElementById('grid');
let character_user;
let character_server;
let mesaj = document.getElementById('mesaj');
let user_start;

function create_td_handlers() {
    let rows = grid.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        for (let j = 0; j < cells.length; j++) {
            cells[j].onclick = async () => {
                if (turn === 1) {
                    cells[j].textContent = character_user;
                    mesaj.textContent = 'Tura mea!';
                    await sleep(2000);
                    let winner = await check_winner();
                    if (winner === 0) {
                        turn = 0;
                        await serverTurn();
                    }
                }
            }
        }
    }
}

async function initializeGame() {
    if (start >= 0.5) {
        turn = 1;
        user_start = 1;
        character_user = 'X';
        character_server = 'O';
        mesaj.textContent = 'Tura ta!';
    } else {
        user_start = 0;
        character_user = 'O';
        character_server = 'X';
        mesaj.textContent = 'Tura mea!';
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

function get_data_from_grid(grid) {
    let result_list = [];
    let rows = grid.getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let row_list = [];
        for (let j = 0; j < cells.length; j++) {
            row_list.push(cells[j].textContent);
        }
        result_list.push(row_list);
    }
    return result_list;
}

function set_cell_value(i, j, text) {
    let rows = grid.getElementsByTagName('tr');
    let cells = rows[i].getElementsByTagName('td');
    cells[j].textContent = text;
    mesaj.textContent = 'Tura ta!';
}

function get_winner() {
    return new Promise((resolve, reject) => {
        let data = {
            'data': get_data_from_grid(grid),
            'user': user_start
        };
        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:8084/determine-winner', true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve(parseInt(JSON.parse(request.responseText)));
                } else {
                    reject(new Error('Request failed'));
                }
            }
        };
        request.send(JSON.stringify(data));
    });
}


function get_character() {
    return new Promise((resolve, reject) => {
        let data = {
            'data': get_data_from_grid(grid),
            'character': character_server
        };
        let request = new XMLHttpRequest();
        request.open('POST', 'http://127.0.0.1:8084/get-char', true);
        request.setRequestHeader("Content-Type", "application/json");
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    let result = JSON.parse(request.responseText);
                    resolve(result);
                } else {
                    reject(new Error('Request failed'));
                }
            }
        };
        request.send(JSON.stringify(data));
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function serverTurn() {
    let [i, j] = await get_character();
    set_cell_value(i, j, character_server);
    let winner = await check_winner();
    if (winner === 0) {
        turn = 1;
        mesaj.textContent = 'Tura ta!';
    }
}


create_td_handlers();
initializeGame();