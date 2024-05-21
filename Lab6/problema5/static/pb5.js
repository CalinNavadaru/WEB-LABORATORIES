let text_area = document.getElementById('textarea');

function modify_tree_view(result, parent, child) {
    parent.removeChild(child);
    parent.classList.add('opened');
    let old_li = document.createElement('li');
    old_li.textContent = child.id;
    old_li.classList.add('opened');
    old_li.id = child.textContent;
    parent.appendChild(old_li);
    let new_ul = document.createElement('ul');
    new_ul.id = child.id;
    for (let i = 0; i < result.length; i++) {
        let new_li = document.createElement('li');
        new_li.textContent = result[i];
        new_li.id = result[i];
        new_ul.appendChild(new_li);
    }
    parent.appendChild(new_ul);
}

document.getElementById('lista').addEventListener('click',  (ev) => {
    if (ev.target && ev.target.matches('li')) {

        let element = ev.target.parentElement;
        let path = [ev.target.id];
        while (element.id !== 'lista') {
            path.unshift(element.id);
            element = element.parentElement;
        }
        let pattern = /\.\S+\b/
        if (pattern.test(ev.target.id)) {
            let request = new XMLHttpRequest();
            request.open('POST', 'http://127.0.0.1:8085/get-file-data', true);
            request.setRequestHeader("Content-Type", "application/json");
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        text_area.textContent = JSON.parse(this.responseText);
                    }
                }
            }
            request.send(JSON.stringify({'data': path}));
        }
        else {
            if (ev.target.classList.contains('opened'))
                return;
            let request = new XMLHttpRequest();
            request.open('POST', 'http://127.0.0.1:8085/get-file', true);
            request.setRequestHeader("Content-Type", "application/json");
            request.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        let result = JSON.parse(this.responseText);
                        modify_tree_view(result, ev.target.parentElement, ev.target);
                    }
                }
            }
            request.send(JSON.stringify({'data': path}));
        }
    }
})