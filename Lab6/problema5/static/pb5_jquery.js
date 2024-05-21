let text_area = $('#textarea');

function modify_tree_view(result, parent, child) {
    child.remove();
    parent.addClass('opened');
    let old_li = $('<li></li>');
    old_li.text(child.attr('id'));
    old_li.addClass('opened');
    old_li.attr('id', child.text());
    parent.append(old_li);
    let new_ul = $('<ul></ul>');
    new_ul.attr('id', child.attr('id'));
    for (let i = 0; i < result.length; i++) {
        let new_li = $('<li></li>');
        new_li.text(result[i]);
        new_li.attr('id', result[i]);
        new_ul.append(new_li);
    }
    parent.append(new_ul);
}

$('#lista').on('click', 'li', function(ev) {
    let element = $(ev.target).parent();
    let path = [$(ev.target).attr('id')];
    while (element.attr('id') !== 'lista') {
        path.unshift(element.attr('id'));
        element = element.parent();
    }
    let pattern = /\.\S+\b/
    if (pattern.test($(ev.target).attr('id'))) {
        $.ajax({
            url: 'http://127.0.0.1:8085/get-file-data',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({'data': path}),
            success: function(response) {
                text_area.text(JSON.parse(response));
            }
        });
    }
    else {
        if ($(ev.target).hasClass('opened'))
            return;
        $.ajax({
            url: 'http://127.0.0.1:8085/get-file',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify({'data': path}),
            success: function(response) {
                let result = JSON.parse(response);
                modify_tree_view(result, $(ev.target).parent(), $(ev.target));
            }
        });
    }
});