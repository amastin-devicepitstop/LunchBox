// Don't forget to change this to default.min.js when you're done here!

const gh = new GitHub({
    token: '261df0553ce5e665bd40e664d75b4d5a807f75df'
});

const repo = gh.getRepo("amastin-microcenter", "LunchBox");

function getPageContents(repo, file){
    let contents = repo.getContents("master", // branch in repository
                                    file, // file in branch
                                    true, // true if results should be returned raw instead of GitHub's normalized format
                                    function(err, data){ // callback function
                                        // console.log(data);
                                        pageContents = data;
    });
}

function formatHeader(){
    let locale = "en-us";
    var options = { month: 'long', day: 'numeric', year: 'numeric' };
    
    document.getElementsByTagName("h1")[1].innerHTML = new Date().toLocaleString(locale, options);
}

window.onload = function(){
    formatHeader();
    let updates = getPageContents(repo, "append.md")
    console.log(updates);
}

