depature_select = document.getElementById("departure")
arrival_select = document.getElementById("arrival")

depature_select.addEventListener('change', (event) => {
    console.log(event.target.value)
    let request = new XMLHttpRequest();
    request.open("POST", "http://127.0.0.1:8081/get-arrivals", true)
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({departure: event.target.value}))
    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let arrivals = JSON.parse(this.responseText);
                arrival_select.innerHTML = "";
                for (let i = 0; i < arrivals.length; i++) {
                    let option = document.createElement("option");
                    if (arrivals[i] === event.target.value)
                        option.selected = true;
                    option.value = arrivals[i];
                    option.text = arrivals[i];
                    arrival_select.appendChild(option);
                }
            }
        }

    }
})