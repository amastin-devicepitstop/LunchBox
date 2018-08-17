function formatMonth(date){
    console.log(date);
    switch (date) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "Invalid Date";
    }
            
}

function formatHeader(){
    let today = new Date();
    let month = today.getMonth();
    let day = today.getDay();
    let year = today.getYear();
    console.log(today.getYear());
    document.getElementsByTagName("h1")[1].innerHTML = formatMonth(today.month) + " " + day + ", " + year;
}

window.onload = function(){
    formatHeader();
}

