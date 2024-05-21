const name_field = document.getElementById("name")
const birth_field = document.getElementById("birth")
const age_field = document.getElementById("age")
const email_field = document.getElementById("email")
const button = document.getElementById("btn")


button.addEventListener('click', () => {
    let error = ""

    function validate_name(value) {
        if (value === "")
            return "Numele este vid!";
        return "";
    }

    let error_name = validate_name(name_field.value);
    if (error_name !== "") {
        name_field.style.borderColor = "red";
        error += error_name;
    }
    else {
        name_field.style.borderColor = "black";
    }

    function getYearsDifference(startDate, endDate) {
        let startYear = startDate.getFullYear();
        let endYear = endDate.getFullYear();

        let yearsDifference = endYear - startYear;

        if (endDate.getMonth() < startDate.getMonth() ||
            (endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate())) {
            yearsDifference--;
        }

        return yearsDifference;
    }

    function validate_age(date_birth, age) {
        if (age <= 0)
            return "Varsta invalida!";

        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
        let day = currentDate.getDate();
        let formattedDate = `${year}-${month}-${day}`
        currentDate = new Date(formattedDate)
        console.log(currentDate)
        let birthDate = new Date(date_birth);
        console.log(birthDate)
        if (getYearsDifference(birthDate, currentDate) != age)
            return "Data de nastere invalida!"

        return ""
    }

    let error_age = validate_age(birth_field.value, age_field.value);
    if (error_age !== "") {
        if (error_age === "Varsta invalida!") {
            age_field.style.borderColor = "red";
        } else if (error_age === "Data de nastere invalida!") {
            birth_field.style.borderColor = "red";
        }
        error += '\n';
        error += error_age + '\n';
    }
    else {
        birth_field.style.borderColor = "black";
        age_field.style.borderColor = "black";
    }
    const validate_email = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            return "Email invalid!";
        }

        return "";
    };
    let error_email = validate_email(email_field.value)
    if (error_email !== "") {
        email_field.style.borderColor = "red";
        error += error_email;
    }
    else {
        email_field.style.borderColor = "black";
    }

    if (error !== "") {
        alert(error);
    }
    else {
        alert("Totul in regula!")
    }
})
