function formatHeader(){
  let today = new Date();
  let month = today.getMonth();
  let day = today.getDay();
  let year = today.getYear();
  document.getElementsByTagName("h1")[1].innerHTML = month + " " + day + ", " + year;
}

window.onload = function(){
  formatHeader();
}



