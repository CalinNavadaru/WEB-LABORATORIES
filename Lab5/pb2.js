function validate_name(input_name) {
    if (input_name === "") {
        return "Nume invalid!\n";
    }
    return "";
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

function validate_age(input_age, input_date) {
    if (input_age <= 0)
        return "Varsta invalida!\n";

    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
    let day = currentDate.getDate();
    let formattedDate = `${year}-${month}-${day}`
    currentDate = new Date(formattedDate)
    let birthDate = new Date(input_date);

    if (getYearsDifference(birthDate, currentDate) != input_age)
        return "Data de nastere invalida!\n"

    return ""
}

function validate_form() {
    let errors = ""

    let input_name = $("#name").val()
    let error_name = validate_name(input_name)
    console.log(error_name === "")
    if (error_name !== "") {
        $("#name").css("border-color", "red");
        errors += error_name
    } else {
        $("#name").css("border-color", "");
    }

    let input_date = $("#birth").val()
    let input_age = $("#age").val()
    let error_birth_age = validate_age(input_age, input_date)
    if (error_birth_age === "Data de nastere invalida!\n") {
        $("#birth").css("border-color", "red");
    } else if (error_birth_age === "Varsta invalida!\n") {
        $("#birth").css("border-color", "");
        $("#age").css("border-color", "red");
    } else {
        $("#age").css("border-color", "");
    }
    errors += error_birth_age

    const validate_email = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            return "Email invalid!\n";
        }

        return "";
    };
    let input_email = $("#email").val()
    let error_email = validate_email(input_email)
    if (error_email !== "") {
        $("#email").css("border-color", "red");
        errors += error_email;
    }
    else {
        $("#email").css("border-color", "");
    }

    if (errors !== "") {
        alert(errors);
    }
}

$(document).ready(() => {
    $("#btn").click(() => {
        validate_form();
    })
});