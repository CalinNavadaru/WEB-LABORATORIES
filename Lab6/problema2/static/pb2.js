prev_button = document.getElementById('prev_btn');
next_button = document.getElementById('next_btn');
person_table = document.getElementById('person_table')

function modify_table(received_data) {
    let rows = person_table.rows;
    for (let i = rows.length - 1; i > 0; i--) {
        person_table.deleteRow(i);
    }
    for (let i = 0; i < received_data.length; i++) {
        let new_row = person_table.insertRow(i + 1);
        for (let j = 1; j < received_data[i].length; j++) {
            let new_cell = new_row.insertCell(j - 1);
            new_cell.textContent = received_data[i][j];
        }
    }
}

prev_button.addEventListener('click', (ev) => {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://127.0.0.1:8082/get-page?prev=1&next=0', true)
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                next_button.disabled = false;
                let received_data = JSON.parse(this.responseText);
                console.log(received_data)
                modify_table(received_data)
            }
            if (this.status === 404) {
                prev_button.disabled = true;
            }
        }
    }
    request.send()
})

next_button.addEventListener('click', (ev) => {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://127.0.0.1:8082/get-page?prev=0&next=1', true)
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                prev_button.disabled = false;
                let received_data = JSON.parse(this.responseText);
                console.log(received_data)
                modify_table(received_data)
            }
            if (this.status === 404) {
                next_button.disabled = true;
            }
        }
    }
    request.send()
})