let first_click = null;
let second_click = null;
let n = 0
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '1', '2', '3', '4', '5', '6', '7', '8'];
const shuffled_numbers = shuffle(numbers);

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
    fillCells(list_td, shuffled_numbers)
}

function reveal_cell(clicked_cell) {
    if (clicked_cell.hasClass("revealed")) {
        return;
    }
    clicked_cell.addClass("revealed");
    if (first_click == null) {
        first_click = clicked_cell;
        first_click.css("color", "black");
    } else {
        second_click = clicked_cell;
        second_click.css("color", "black");
        if (first_click.text() === second_click.text()) {
            first_click = null;
            second_click = null;
            n += 2;
        }
        else {
            setTimeout(() => {
                first_click.removeClass("revealed");
                second_click.removeClass("revealed");
                first_click.css("color", "transparent");
                second_click.css("color", "transparent");
                first_click = null;
                second_click = null;
            }, 2000);

        }
    }
    if (n === 16) {
        alert("victorie!")
    }
}

$(document).ready(() => {
    let list_td = $("#tabel").find("td").toArray();
    console.log("Number of children:", list_td);
    initialize_columns(list_td)

    $("td").click((event) => {
        let clicked_td = $(event.target)
        if (first_click == null && second_click == null || second_click == null)
            reveal_cell(clicked_td);
    })
});
