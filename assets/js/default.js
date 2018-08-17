//function formatHeader(){
  let today = new Date();
  let month = today.getMonth();
  let day = today.getDay();
  let year = today.getYear();
  document.getElementsByTagName("h1")[0].innerHTML = month + " " + day + ", " + year;
//}

