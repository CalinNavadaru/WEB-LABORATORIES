const header1 = document.getElementById("a1");
const header2 = document.getElementById("a2");
const header3 = document.getElementById("a3");
const tabel = document.getElementById("tabel2");
let h1 = 0;
let h2 = 0;
let h3 = 0;

header1.addEventListener('click', () => {
    const num_columns = tabel.rows[0].cells.length;
    const columns = Array.from({ length: num_columns }, () => []);

    // Iterate over the rows and fill the columns array
    for (let i = 1; i < tabel.rows.length; i++) { // Start from index 1
        const row = tabel.rows[i];
        for (let j = 0; j < num_columns; j++) {
            columns[j].push(row.cells[j].textContent.trim());
        }
    }

    // Sort the first column
    if (h1 === 1) {
        columns[0].sort((a, b) => b.localeCompare(a));
    } else {
        columns[0].sort();
    }

    // Assign sorted values back to table cells
    for (let i = 1; i < tabel.rows.length; i++) { // Start from index 1
        const row = tabel.rows[i];
        for (let j = 0; j < num_columns; j++) {
            row.cells[j].textContent = columns[j][i - 1]; // Subtract 1 from row index
        }
    }

    h1 = 1 - h1;
});

header2.addEventListener('click', () => {
    const num_columns = tabel.rows[1].cells.length;
    const columns = Array.from({ length: num_columns }, () => []);

    // Iterate over the rows and fill the columns array
    for (let i = 1; i < tabel.rows.length; i++) { // Start from index 1
        const row = tabel.rows[i];
        for (let j = 0; j < num_columns; j++) {
            columns[j].push(row.cells[j].textContent.trim());
        }
    }

    // Sort the first column
    if (h2 === 1) {
        columns[1].sort((a, b) => parseInt(a) - parseInt(b));
    } else {
        columns[1].sort((a, b) => parseInt(b) - parseInt(a));
    }

    // Assign sorted values back to table cells
    for (let i = 1; i < tabel.rows.length; i++) { // Start from index 1
        const row = tabel.rows[i];
        for (let j = 0; j < num_columns; j++) {
            row.cells[j].textContent = columns[j][i - 1]; // Subtract 1 from row index
        }
    }
    h2 = 1 - h2;
});

header3.addEventListener('click', () => {
    const num_columns = tabel.rows[2].cells.length;
    const columns = Array.from({ length: num_columns }, () => []);

    // Iterate over the rows and fill the columns array
    for (let i = 1; i < tabel.rows.length; i++) { // Start from index 1
        const row = tabel.rows[i];
        for (let j = 0; j < num_columns; j++) {
            columns[j].push(row.cells[j].textContent.trim());
        }
    }

    // Sort the first column
    if (h3 === 1) {
        columns[2].sort((a, b) => parseInt(a) - parseInt(b));
    } else {
        columns[2].sort((a, b) => parseInt(b) - parseInt(a));
    }

    // Assign sorted values back to table cells
    for (let i = 1; i < tabel.rows.length; i++) { // Start from index 1
        const row = tabel.rows[i];
        for (let j = 0; j < num_columns; j++) {
            row.cells[j].textContent = columns[j][i - 1]; // Subtract 1 from row index
        }
    }

    h3 = 1 - h3;
});
