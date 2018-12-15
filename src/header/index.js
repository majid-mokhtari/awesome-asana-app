var ajax = new XMLHttpRequest();
ajax.open("GET", "snippets/header.html", false);
ajax.send();
const header =  ajax.responseText;

export default header