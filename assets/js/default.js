function formatHeader(){
    document.getElementsByTagName("h1")[1].innerHTML = new Date().toLocaleString().split(',')[0];
}

window.onload = function(){
    formatHeader();
}

