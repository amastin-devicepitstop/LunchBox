function formatHeader(){
    let locale = "en-us";
    document.getElementsByTagName("h1")[1].innerHTML = new Date().toLocaleString(locale, {month: "long"}).split(',')[0];
}

window.onload = function(){
    formatHeader();
}

