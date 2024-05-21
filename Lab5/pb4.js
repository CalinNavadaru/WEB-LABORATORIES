let h1 = 0;
let h2 = 0;
let h3 = 0;

$(document).ready(() => {
    const header1 = $("#a1")
    const header2 = $("#a2")
    const header3 = $("#a3")
    const tabel = $("#tabel2")

    header1.click(() => {
        let rows = tabel.find("tr").toArray();
        const first_row_contents = [];
        let columns = $(rows[0]).find("td").toArray();
        for (let i = 1; i < columns.length; i++) {
            first_row_contents.push($(columns[i]).text());
        }
        if (h1 === 1) {
            first_row_contents.sort((a, b) => b.localeCompare(a))
        } else {
            first_row_contents.sort()
        }
        for (let i = 1; i < columns.length; i++) {
            $(columns[i]).text(first_row_contents[i - 1])
        }
        h1 = 1 - h1;
    })

    header2.click(() => {
        let rows = tabel.find("tr").toArray();
        const second_row_contents = [];
        let columns = $(rows[1]).find("td").toArray();
        for (let i = 1; i < columns.length; i++) {
            second_row_contents.push($(columns[i]).text());
        }
        if (h2 === 1) {
            second_row_contents.sort((a, b) => parseInt(a) - parseInt(b))
        } else {
            second_row_contents.sort((a, b) => parseInt(b) - parseInt(a))
        }
        for (let i = 1; i < columns.length; i++) {
            $(columns[i]).text(second_row_contents[i - 1])
        }
        h2 = 1 - h2;
    })

    header3.click(() => {
        let rows = tabel.find("tr").toArray();
        const third_row_contents = [];
        let columns = $(rows[2]).find("td").toArray();
        for (let i = 1; i < columns.length; i++) {
            third_row_contents.push($(columns[i]).text());
        }
        if (h3 === 1) {
            third_row_contents.sort((a, b) => parseInt(a) - parseInt(b))
        } else {
            third_row_contents.sort((a, b) => parseInt(b) - parseInt(a))
        }
        for (let i = 1; i < columns.length; i++) {
            $(columns[i]).text(third_row_contents[i - 1])
        }
        h3 = 1 - h3;
    })
})