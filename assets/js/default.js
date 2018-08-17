function formatHeader(){
  let today = new Date();
  let month = today.getMonth();
  let day = today.getDay();
  let year = today.getYear();
  console.log(document.getElementsByTagName("h1"));
  document.getElementsByTagName("h1")[0].innerHTML = month + " " + day + ", " + year;
}

window.onload = function(){
  formatHeader();
}



