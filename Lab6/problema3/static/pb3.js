let person_select = document.getElementById('person_id');
let first_name_input = document.getElementById('first_name')
let last_name_input = document.getElementById('last_name')
let phone_input = document.getElementById('phone_number')
let email_input = document.getElementById('email')
let save = document.getElementById('save')
let saved = 0;
let modified = 0;
let current_id = 1;
let old_id = 0;

let request = new XMLHttpRequest();
request.open('GET', 'http://127.0.0.1:5000/get-id', true);
request.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status === 200) {
            let list_id = JSON.parse(this.responseText);
            init_select(list_id)
        }
    }
}
request.send();

save.disabled = true;

function get_person(id_person) {
    let request_person = new XMLHttpRequest();
    request_person.open('GET', 'http://127.0.0.1:5000/get-data?id=' + id_person, true);
    request_person.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                if (saved === 0 && modified === 1) {
                    let userResponse = confirm('Vreti sa salvati?');
                    if (userResponse)
                        save_person(old_id);
                }
                let person = JSON.parse(this.responseText)[0];
                console.log(person)
                modify_form(person)
            }
        }
    }
    request_person.send()
}




function init_select(list_id) {
    for (let i = 0; i < list_id.length; i++) {
        let option = document.createElement("option")
        option.value = list_id[i];
        option.text = list_id[i];
        option.selected = i === 0;
        person_select.appendChild(option);
    }
}

function modify_form(person) {
    first_name_input.value = person[1];
    last_name_input.value = person[2];
    phone_input.value = person[3];
    email_input.value = person[4];
    first_name_input.defaultValue = person[1];
    last_name_input.defaultValue = person[2];
    phone_input.defaultValue = person[3];
    email_input.defaultValue = person[4];
    modified = 0;
    saved = 0;
}

person_select.addEventListener('change', (ev) => {
    console.log(ev.target.value);
    old_id = current_id;
    current_id = ev.target.value;
    get_person(current_id);
});

first_name_input.addEventListener('change', (ev) => {
    first_name_input.value = ev.target.value;
    save.disabled = false;
    modified = 1;
})

last_name_input.addEventListener('change', (ev) => {
    last_name_input.value = ev.target.value;
    save.disabled = false;
    modified = 1;
})

phone_input.addEventListener('change', (ev) => {
    phone_input.value = ev.target.value;
    save.disabled = false;
    modified = 1;
})

email_input.addEventListener('change', (ev) => {
    email_input.value = ev.target.value;
    save.disabled = false;
    modified = 1;
})

function save_person(id_value) {
    var data = {
        'first_name': first_name_input.value,
        'last_name': last_name_input.value,
        'phone_number': phone_input.value,
        'email': email_input.value,
        'id': id_value
    };

    let request = new XMLHttpRequest();
    request.open("POST", 'http://127.0.0.1:5000/update-user', true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                alert("Persoana a fost actualizata!");
                saved = 1;
            }
            if (this.status === 400) {
                let parser = new DOMParser();
                let htmlDoc = parser.parseFromString(this.responseText, 'text/html');
                let paragraph = htmlDoc.querySelector('p');
                first_name_input.value = first_name_input.defaultValue
                last_name_input.value = last_name_input.defaultValue
                phone_input.value = phone_input.defaultValue
                email_input.value = email_input.defaultValue
                alert(paragraph.textContent);
            }
        }
    }
    request.send(JSON.stringify(data));
}

save.addEventListener('click', (ev) => {
    ev.preventDefault();
    save_person(current_id);
})

get_person(current_id);