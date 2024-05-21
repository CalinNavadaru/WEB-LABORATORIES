const table = document.getElementById("tabel")
let first_click = null;
let second_click = null;
let n = 0
let links = ["https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
"https://ghk.h-cdn.co/assets/17/30/2048x3072/bernese-mountain-dog.jpg",
]
links = links.concat(links)
console.log(links)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
links = shuffle(links)

function fillCells(data) {
    const cells = table.querySelectorAll('td');
    cells.forEach((cell, index) => {
        cell.innerHTML = '<img src=' + data[index] + ' alt="dog" alt="dog" width="150px" height="150px">'
    });
}

fillCells(links)

function reveal_cell(clicked_cell) {
    if (clicked_cell.classList.contains("revealed")) {
        return;
    }
    clicked_cell.classList.add("revealed");

    let img = clicked_cell.querySelector('img'); // Select the image inside the cell

    if (first_click == null) {
        first_click = clicked_cell;
        first_click.style.visibility = "visible";
        img.style.visibility = "visible"; // Make the image visible
    } else {
        second_click = clicked_cell;
        second_click.style.visibility = "visible";
        img.style.visibility = "visible"; // Make the image visible
        if (first_click.innerHTML === second_click.innerHTML) {
            first_click = null;
            second_click = null;
            n += 2;
        } else {
            setTimeout(() => {
                first_click.classList.remove("revealed");
                second_click.classList.remove("revealed");
                first_click.querySelector('img').style.visibility = "hidden"; // Hide the image
                second_click.querySelector('img').style.visibility = "hidden"; // Hide the image
                first_click = null;
                second_click = null;
            }, 2000);

        }
        if (n === links.length) {
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