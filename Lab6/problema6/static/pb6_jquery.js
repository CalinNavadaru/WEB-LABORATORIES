// let table = document.getElementById('tabel')
let table = $('#tabel');
let procesor_select = $('#procesor');
// let procesor_select = document.getElementById('procesor');
let ram_select = $('#ram')
// let ram_select = document.getElementById('ram');
let capacity_select = $('capacitate');
// let capacity_select = document.getElementById('capacitate');
let video_select = $('#video');
// let video_select = document.getElementById('video');
let button = $('#btn');

function fill_table(result) {
    table.find('tr:not(:first-child)').remove();
    for (let i = 0; i < result.length; i++) {
        let new_row = $('<tr>');
        for (let j = 1; j < result[i].length; j++) {
            let new_cell = $('<td>');
            new_cell.prop('textContent', result[i][j]);
            new_row.append(new_cell);
        }
        table.append(new_row);
    }
}

button.click((ev) => {
    ev.preventDefault()
    let data = {
        'procesor': procesor_select.find(":selected").val(),
        'ram': ram_select.find(":selected").val(),
        'capacitate': capacity_select.find(":selected").val(),
        'video': video_select.find(":selected").val()
    }

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8086/filter',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (response) {
            let result = JSON.parse(response);
            fill_table(result);
        },
        error: function (jqXHR, textStatus) {
            alert('Nu a fost gasit niciun computer cu cerintele specificate!')
        }
    });
})