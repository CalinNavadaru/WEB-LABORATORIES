function modify_table(received_data, table) {
    table.find('tr:not(:first-child)').remove();
    for (let i = 0; i < received_data.length; i++) {
        let newRow = $('<tr>');
        for (let j = 1; j < received_data[i].length; j++) {
            let newCell = $('<td>')
            newCell.text(received_data[i][j]);
            newRow.append(newCell);
        }
        table.append(newRow);
    }
}

$(document).ready(() => {
    $('#next_btn').click(() => {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8082/get-page?prev=0&next=1',
            async: true,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('AJAX error:', textStatus);
                if (jqXHR.status === 404) {
                    $('#next_btn').prop('disabled', true);
                }
            },
            success: function (result) {
                console.log(result)
                let table = $('#person_table')
                $('#prev_btn').prop('disabled', false);
                modify_table(JSON.parse(result), table);
            }
        })
    })
    $('#prev_btn').click(() => {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:8082/get-page?prev=1&next=0',
            async: true,
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('AJAX error:', textStatus);
                if (jqXHR.status === 404) {
                    $('#prev_btn').prop('disabled', true);
                }
            },
            success: function (result) {
                let table = $('#person_table:not(:first-child)')
                $('#next_btn').prop('disabled', false);
                modify_table(JSON.parse(result), table);
            }
        })
    })
})