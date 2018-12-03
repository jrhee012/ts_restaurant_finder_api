var url = '/call-java-app';
console.log(url);
var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4) {
        //handle server response here if you want to
    }
}
xmlHttp.open("GET", url, true); // false for synchronous request
xmlHttp.send(null);