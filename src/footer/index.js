var ajax = new XMLHttpRequest();
ajax.open("GET", "snippets/footer.html", false);
ajax.send();
const footer =  ajax.responseText;

export default footer