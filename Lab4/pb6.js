const tabel = document.getElementById("tabel3");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const shuffled_numbers = shuffle(numbers);
let x = 3;
let y = 3;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function fillCells(data) {
    const cells = tabel.querySelectorAll('td');
    cells.forEach((cell, index) => {
        cell.textContent = data[index];
    });
}

fillCells(shuffled_numbers)

function test_win() {
    k = 1;
    for (let i = 0; i < tabel.rows.length - 1; i++) {
        for (let j = 0; j < tabel.rows[i].cells.length; j++) {
            if (k !== parseInt(tabel.rows[i].cells[j].textContent)) {
                return false;
            }
            k++;
        }
    }
    for (let j = 0; j < tabel.rows[tabel.rows.length - 1].cells.length; j++) {
        if (k !== parseInt(tabel.rows[tabel.rows.length - 1].cells[j].textContent)) {
            return false;
        }
        k++;
    }
    return true;
}

//37- stanga, 38 - sus , 39 - dreapta, 40 - jos
function key_pressed(key) {
    key = key || window.event;
    if (key.keyCode === 38) {
        if (x === 0) {
            return;
        }
        tabel.rows[x].cells[y].textContent = tabel.rows[x - 1].cells[y].textContent;
        tabel.rows[x - 1].cells[y].textContent = "";
        x = x - 1;
    } else if (key.keyCode === 37) {
        if (y === 0) {
            return;
        }
        tabel.rows[x].cells[y].textContent = tabel.rows[x].cells[y - 1].textContent;
        tabel.rows[x].cells[y - 1].textContent = "";
        y = y - 1;
    } else if (key.keyCode === 39) {
        if (y === 3) {
            return;
        }
        tabel.rows[x].cells[y].textContent = tabel.rows[x].cells[y + 1].textContent;
        tabel.rows[x].cells[y + 1].textContent = "";
        y = y + 1;
    } else if (key.keyCode === 40) {
        if (x === 3) {
            return;
        }
        tabel.rows[x].cells[y].textContent = tabel.rows[x + 1].cells[y].textContent;
        tabel.rows[x + 1].cells[y].textContent = "";
        x = x + 1;
    }
    if (test_win()) {
        alert("Victorie, mai baiete!");
    }
}

document.onkeydown = key_pressed;