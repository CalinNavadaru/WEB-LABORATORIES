const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
const shuffled_numbers = shuffle(numbers);
let x = 3;
let y = 3;
let data = []
//37- stanga, 38 - sus , 39 - dreapta, 40 - jos
function key_pressed(key) {
    console.log(data)
    key = key || window.event;
    if (key.keyCode === 38) {
        if (x === 0) {
            return;
        }
        // tabel.rows[x].cells[y].textContent = tabel.rows[x - 1].cells[y].textContent;
        // tabel.rows[x - 1].cells[y].textContent = "";
        let old = $("#tabel3").find("tr").eq(x).find("td").eq(y);
        let new_value = $("#tabel3").find("tr").eq(x - 1).find("td").eq(y)
        old.text(new_value.text())
        new_value.text("")
        x = x - 1;
    } else if (key.keyCode === 37) {
        if (y === 0) {
            return;
        }
        let old = $("#tabel3").find("tr").eq(x).find("td").eq(y);
        let new_value = $("#tabel3").find("tr").eq(x).find("td").eq(y - 1)
        old.text(new_value.text())
        new_value.text("")
        y = y - 1;
    } else if (key.keyCode === 39) {
        if (y === 3) {
            return;
        }
        let old = $("#tabel3").find("tr").eq(x).find("td").eq(y);
        let new_value = $("#tabel3").find("tr").eq(x).find("td").eq(y + 1)
        old.text(new_value.text())
        new_value.text("")
        y = y + 1;
    } else if (key.keyCode === 40) {
        if (x === 3) {
            return;
        }
        let old = $("#tabel3").find("tr").eq(x).find("td").eq(y);
        let new_value = $("#tabel3").find("tr").eq(x + 1).find("td").eq(y)
        old.text(new_value.text())
        new_value.text("")
        x = x + 1;
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function fillCells(cells, data) {
    cells.forEach((cell, index) => {
        $(cell).text(data[index]);
    });
}

function initialize_columns(list_td) {
    fillCells(list_td, shuffle(numbers))
}

$(document).ready(() => {
    let list_td = $("#tabel3").find("td").toArray();
    console.log("Number of children:", list_td);
    initialize_columns(list_td)
    $(document).on('keydown', key_pressed);
})