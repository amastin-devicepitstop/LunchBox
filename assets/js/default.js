function formatHeader(){
    let locale = "en-us";
    var options = { month: 'long', day: 'numeric', year: 'numeric' };
    
    document.getElementsByTagName("h1")[1].innerHTML = new Date().toLocaleString(locale, options);
}

window.onload = function(){
    formatHeader();
}

