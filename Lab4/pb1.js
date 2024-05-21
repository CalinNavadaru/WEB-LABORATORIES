const list1 = document.getElementById('list1');
const list2 = document.getElementById('list2');


list1.addEventListener('dblclick', () => {
    const SelectedItem = Array.from(list1.selectedOptions);
    SelectedItem.forEach(option => {
        list2.append(option)
        list1.removeChild(option)
    })
});

list2.addEventListener('dblclick', () => {
    const SelectedItem = Array.from(list2.selectedOptions);
    SelectedItem.forEach(option => {
        list1.append(option)
        list2.removeChild(option)
    })
});