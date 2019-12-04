let url_items = 'https://raw.githubusercontent.com/invector4ik002/myJSON/master/myJSON.json'
let arrItems
fetch(url_items)
    .then(d => d.json())
    .then(data => {arrItems = data})
    .finally (() => console.log(arrItems))