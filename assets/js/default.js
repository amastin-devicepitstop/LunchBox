// Don't forget to change this to default.min.js when you're done here!

let gh;
let repo;

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

function authenticate(){
    OAuth.initialize("35214778a8ca6ba1bfe1");
    OAuth.popup('github')
        .done(function(result) {
            gh = new GitHub(result.access_token);
            repo = gh.getRepo("amastin-microcenter", "LunchBox");
        })
        .fail(function (err) {
            alert("An error occurred while authenticating the GitHub API. Please reload the page.")
        });
}

window.onload = function(){
    

    formatHeader();
    authenticate();
    let updates = getPageContents(repo, "append.md")
    console.log(updates);
}

