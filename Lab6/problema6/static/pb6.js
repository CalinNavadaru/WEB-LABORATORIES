let table = document.getElementById('tabel')
let form = document.getElementById('formular');
let procesor_select = document.getElementById('procesor');
let ram_select = document.getElementById('ram');
let capacity_select = document.getElementById('capacitate');
let video_select = document.getElementById('video');
let button = document.getElementById('btn');

function fill_table(result) {
    let rows = table.getElementsByTagName('tr');
    for (let i = rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
    for (let i = 0; i < result.length; i++) {
        let new_row = table.insertRow(i + 1);
        for (let j = 1; j < result[i].length; j++) {
            let new_cell = new_row.insertCell(j - 1);
            new_cell.textContent = result[i][j];
        }
    }
}

button.addEventListener('click', (ev) => {
    ev.preventDefault()
    let data = {
        'procesor': procesor_select.options[procesor_select.selectedIndex].text,
        'ram': ram_select.options[ram_select.selectedIndex].text,
        'capacitate': capacity_select.options[capacity_select.selectedIndex].text,
        'video': video_select.options[video_select.selectedIndex].text,
    }

    let request = new XMLHttpRequest();
    request.open('POST', 'http://127.0.0.1:8086/filter', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let result = JSON.parse(this.responseText);
                fill_table(result);
            }
            else {
                alert('Nu a fost gasit niciun computer cu cerintele specificate!');
            }
        }
    }
    request.send(JSON.stringify(data));
})