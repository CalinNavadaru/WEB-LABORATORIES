$(document).ready(() => {
    $('#departure').change((ev) => {
        console.log(ev.target.value);
        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8081/get-arrivals',
            async: true,
            contentType: 'application/json',
            data: JSON.stringify({departure: ev.target.value}),
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('AJAX error:', textStatus);
            },
            success: function (arrivals_arg, textStatus, jqXHR) {
                console.log(arrivals_arg);
                console.log(this.data)
                let arrivals_list = JSON.parse(arrivals_arg);
                let arrivals = $('#arrival');
                arrivals.empty();
                $.each(arrivals_list, function (index, value) {
                    let option = $('<option>', {
                        value: value,
                        text: value
                    });
                    if (value === ev.target.value) {
                        option.prop('selected', true);
                    }
                    arrivals.append(option);
                });
            }
        })
    })
})