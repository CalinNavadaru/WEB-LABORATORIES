let first_click = null;
let second_click = null;
let n = 0
let links = ["https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
    "https://ghk.h-cdn.co/assets/17/30/2048x3072/bernese-mountain-dog.jpg",
]
links = links.concat(links)

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function fillCells(cells, data) {
    cells.forEach((cell, index) => {
        cell.innerHTML = '<img src=' + data[index] + ' alt="dog" alt="dog" width="150px" height="150px">'
    });
}

function initialize_columns(list_td) {
    fillCells(list_td, shuffle(links))
}

function reveal_cell(clicked_cell) {
    if (clicked_cell.hasClass("revealed")) {
        return;
    }
    clicked_cell.addClass("revealed");
    if (first_click == null) {
        first_click = clicked_cell;
        first_click.find("img").css("visibility", "visible");
    } else {
        second_click = clicked_cell;
        second_click.find("img").css("visibility", "visible");
        if (first_click.find("img").attr("src") === second_click.find("img").attr("src")) {
            first_click = null;
            second_click = null;
            n += 2;
        } else {
            setTimeout(() => {
                first_click.removeClass("revealed");
                second_click.removeClass("revealed");
                first_click.find("img").css("visibility", "hidden");
                second_click.find("img").css("visibility", "hidden");
                first_click = null;
                second_click = null;
            }, 2000);

        }
    }
    console.log(first_click)
    console.log(second_click)
    console.log("\n")
    if (n === 4) {
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
