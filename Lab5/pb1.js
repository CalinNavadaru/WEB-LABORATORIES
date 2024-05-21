$(document).ready(() => {
    $("#list1").click(() => {
        let element = $("#list1 option:selected").text();
        if (element.trim() !== "") {
            $("#list1 option:selected").remove();
            $("#list2").append(new Option(element, element));
        }
    });
    $("#list2").click(() => {
        let element = $("#list2 option:selected").text();
        if (element.trim() !== "") {
            $("#list2 option:selected").remove();
            $("#list1").append(new Option(element, element));
        }
    });
});