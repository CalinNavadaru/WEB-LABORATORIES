const header1 = document.getElementById("a1")
const header2 = document.getElementById("a2")
const header3 = document.getElementById("a3")
const tabel = document.getElementById("tabel2")
let h1 = 0;
let h2 = 0;
let h3 = 0;
header1.addEventListener('click', () => {
    let rows = tabel.rows[0]
    const first_row_contents = [];
    for (let i = 0; i < rows.cells.length; i++) {
        first_row_contents.push(rows.cells[i].textContent.trim());
    }
    if (h1 === 1) {
        first_row_contents.sort((a, b) => b.localeCompare(a))
    }
    else {
        first_row_contents.sort()
    }
    for (let i = 0; i < rows.cells.length; i++) {
        rows.cells[i].textContent = first_row_contents[i];
    }
    h1 = 1 - h1;
    console.log(first_row_contents)
})

header2.addEventListener('click', () => {
    let rows = tabel.rows[1]
    const first_row_contents = [];
    for (let i = 0; i < rows.cells.length; i++) {
        first_row_contents.push(rows.cells[i].textContent.trim());
    }
    if (h1 === 1) {
        first_row_contents.sort((a, b) => parseInt(a) - parseInt(b))
    }
    else {
        first_row_contents.sort((a, b) => parseInt(b) - parseInt(a))
    }
    for (let i = 0; i < rows.cells.length; i++) {
        rows.cells[i].textContent = first_row_contents[i];
    }
    h1 = 1 - h1;
    console.log(first_row_contents)
})

header3.addEventListener('click', () => {
    let rows = tabel.rows[2]
    const first_row_contents = [];
    for (let i = 0; i < rows.cells.length; i++) {
        first_row_contents.push(rows.cells[i].textContent.trim());
    }
    if (h1 === 1) {
        first_row_contents.sort((a, b) => parseInt(a) - parseInt(b))
    }
    else {
        first_row_contents.sort((a, b) => parseInt(b) - parseInt(a))
    }
    for (let i = 0; i < rows.cells.length; i++) {
        rows.cells[i].textContent = first_row_contents[i];
    }
    h1 = 1 - h1;
    console.log(first_row_contents)
})