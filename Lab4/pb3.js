const table = document.getElementById("tabel")
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
function fillCells(data) {
    const cells = table.querySelectorAll('td');
    cells.forEach((cell, index) => {
        cell.textContent = data[index];
    });
}

fillCells(shuffled_numbers)

function reveal_cell(clicked_cell) {
    if (clicked_cell.classList.contains("revealed")) {
        return;
    }
    clicked_cell.classList.add("revealed");

    if (first_click == null) {
        first_click = clicked_cell;
        first_click.style.color = "black";
    } else {
        second_click = clicked_cell;
        second_click.style.color = "black";
        if (first_click.textContent === second_click.textContent) {
            first_click = null;
            second_click = null;
            n += 2;
        }
        else {
            setTimeout(() => {
                first_click.classList.remove("revealed");
                second_click.classList.remove("revealed");
                second_click.style.color = "transparent";
                first_click.style.color = "transparent";
                first_click = null;
                second_click = null;
            }, 2000);

        }
        if (n === 16) {
            alert("victorie!")
        }
    }
}

table.addEventListener('click', (event) => {
    const clicked_cell = event.target;
    if (clicked_cell.tagName === "TD") {
        if (first_click == null || second_click == null)
            reveal_cell(clicked_cell)
    }

})