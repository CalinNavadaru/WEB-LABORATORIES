let saved = 0;
let modified = 0;
let save = $('#save')
let person_select = $('#person_id')
let first_name_input = $('#first_name')
let last_name_input = $('#last_name')
let phone_input = $('#phone_number')
let email_input = $('#email')
let current_id = 1;
let old_id = 0;
save.prop('disabled', true);

function init_select(list_id) {
    for (let i = 0; i < list_id.length; i++) {
        let option = new Option(list_id[i], list_id[i], i === 0, i === 0);
        person_select.append(option);
    }
}

function modify_form(person) {
    first_name_input.prop('value', person[1]);
    first_name_input.prop('defaultValue', person[1]);
    last_name_input.prop('value', person[2]);
    last_name_input.prop('defaultValue', person[2]);
    phone_input.prop('value', person[3]);
    phone_input.prop('defaultValue', person[3]);
    email_input.prop('value', person[4]);
    email_input.prop('defaultValue', person[4]);
    modified = 0;
    saved = 0;
}

function save_person(id_person) {
    let data_person = {
        'first_name': first_name_input.val(),
        'last_name': last_name_input.val(),
        'phone_number': phone_input.val(),
        'email': email_input.val(),
        'id': id_person
    };

    $.ajax({
        type: 'POST',
        url: 'http://127.0.0.1:8083/update-user',
        async: true,
        contentType: 'application/json',
        data: JSON.stringify(data_person),
        success: function (result) {
            alert("Persoana a fost actualizata!");
            saved = 1;
        }
    })
}

$.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8083/get-id',
    async: true,
    error: function (jqXHR, textStatus, errorThrown) {
        console.error('AJAX error:', textStatus);
    },
    success: function (result) {
        let list_id = JSON.parse(result);
        for (let i = 0; i < list_id.length; i++) {
            list_id[i] = JSON.parse(list_id[i]);
        }
        console.log(list_id)
        init_select(list_id);
    }
})

person_select.change((ev) => {
    console.log(ev);
    old_id = current_id;
    current_id = ev.target.value;
    console.log("Current id" + current_id);
    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:8083/get-data?id=' + ev.target.value,
        async: true,
        success: function (result) {
            if (saved === 0 && modified === 1) {
                let userResponse = confirm('Vreti sa salvati?');
                if (userResponse)
                    save_person(old_id);
            }
            let person = JSON.parse(result)[0];
            console.log(person);
            modify_form(person)
        }
    })
})

first_name_input.change((ev) => {
    console.log(ev);
    first_name_input.prop('value', ev.target.value);
    save.prop('disabled', false);
    modified = 1;
})
last_name_input.change((ev) => {
    console.log(ev);
    last_name_input.prop('value', ev.target.value);
    save.prop('disabled', false);
    modified = 1;
})
phone_input.change((ev) => {
    console.log(ev);
    phone_input.prop('value', ev.target.value);
    save.prop('disabled', false);
    modified = 1;
})
email_input.change((ev) => {
    console.log(ev);
    email_input.prop('value', ev.target.value);
    save.prop('disabled', false);
    modified = 1;
})

save.click((ev) => {
    ev.preventDefault();
    save_person(current_id);
})