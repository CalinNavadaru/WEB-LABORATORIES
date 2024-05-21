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
        const first_column_contents = [];
        for (let i = 1; i < rows.length; i++) {
            let columns = $(rows[i]).find("td").toArray();
            first_column_contents.push($(columns[0]).text())
        }
        if (h1 === 1) {
            first_column_contents.sort((a, b) => b.localeCompare(a))
        } else {
            first_column_contents.sort()
        }
        for (let i = 1; i < rows.length; i++) {
            let columns = $(rows[i]).find("td").toArray();
            $(columns[0]).text(first_column_contents[i - 1])
        }
        h1 = 1 - h1;
    })

    header2.click(() => {
        let rows = tabel.find("tr").toArray();
        const second_column_contents = [];
        for (let i = 1; i < rows.length; i++) {
            let columns = $(rows[i]).find("td").toArray();
            second_column_contents.push($(columns[1]).text())
        }
        if (h2 === 1) {
            second_column_contents.sort((a, b) => parseInt(a) - parseInt(b))
        } else {
            second_column_contents.sort((a, b) => parseInt(b) - parseInt(a))
        }
        for (let i = 1; i < rows.length; i++) {
            let columns = $(rows[i]).find("td").toArray();
            $(columns[1]).text(second_column_contents[i - 1])
        }
        h2 = 1 - h2;
    })

    header3.click(() => {
        let rows = tabel.find("tr").toArray();
        const third_column_contents = [];
        for (let i = 1; i < rows.length; i++) {
            let columns = $(rows[i]).find("td").toArray();
            third_column_contents.push($(columns[2]).text())
        }
        if (h3 === 1) {
            third_column_contents.sort((a, b) => parseInt(a) - parseInt(b))
        } else {
            third_column_contents.sort((a, b) => parseInt(b) - parseInt(a))
        }
        for (let i = 1; i < rows.length; i++) {
            let columns = $(rows[i]).find("td").toArray();
            $(columns[2]).text(third_column_contents[i - 1])
        }
        h3 = 1 - h3;
    })
})