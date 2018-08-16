const gh = new GitHub({
    token: '98eb3c3ffa896e696c72d26ed605a8164bd8c529'
});

const repo = gh.getRepo("amastin-microcenter", "LunchBox");

let pageContents;
function getPageContents(repo){
    let contents = repo.getContents("master", // branch in repository
                                    "index.md", // file in branch
                                    true, // true if results should be returned raw instead of GitHub's normalized format
                                    function(err, data){ // callback function
                                        // console.log(data);
                                        pageContents = data;
    });
}

function updatePage(repo, pageToUpdate, pageContents) {
    repo.writeFile("master", // branch in repository
        pageToUpdate, // file in branch
        pageContents, // what is being written to the page
        "Updated " + pageToUpdate, // commit message
        {}, // optional stuff (author, committer, etc.) that I left out
        function () { // callback function
            console.log("Updated " + pageToUpdate + " with information about " + getUserName());
        }
    )
}


function getTime(){
    let today = new Date();
    let currentTime = new Date();

    let currentHour = today.getHours();
    let currentMinute = today.getMinutes();

    let meridiem;
    currentHour < 12 ? meridiem = "AM" : meridiem = "PM"; // set meridiem to AM if currentHour is before noon, else PM

    // Converts 24-hour time to 12-hour time and sets current hour to that.
    currentTime.setHours(currentHour % 12);

    // Formats currentMinute so that its properly readable.
    // ex. currentMinute = 7 ---> 07
    if (currentMinute < 10){
        currentMinute = "0" + currentMinute;
    }

    currentTime.setMinutes(currentMinute);

    return (today.getSeconds() < 10 ? currentTime.getHours() + ":" + currentTime.getMinutes() + ":0" + currentTime.getSeconds() + " " + meridiem :
                                      currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds() + " " + meridiem);
}

function getUserName(){
    // Get username and return it
    if (document.getElementById("loginUserName") != null){
        return document.getElementById("loginUserName").innerText;
    }
}

function getClockOnButton(){
    /* getElementsByTagName returns an array of the specified elements.
     * In order to choose a specific element, you have to specify it's index.
     */

    // The code below sets the 'Clock On' button to variable
    if (document.getElementsByTagName("button").length === 2){
        console.log("Clock On button found.");
        return document.getElementsByTagName("button")[0];
    }
}

function getClockOffButton(){
    /* getElementsByTagName returns an array of the specified elements.
     * In order to choose a specific element, you have to specify it's index.
     */

    // The code below sets the 'Clock Off' button to a variable
    if (document.getElementsByTagName("button").length === 2){
        console.log("Clock Off button found.");
        console.log("====================");
        return document.getElementsByTagName("button")[1];

    }
}

function parseSchedule(schedule) {
    /* The goal here is to be able to parse out the user's shift, and probably also their department.
     * The current day can be found via some other method so it's not important to use that info.
     * I suppose you could if you wanted to. Maybe have it as a header at the top of the page instead of "Hello World"
     *
     * You'll also need a method to determine if the user clocked in/out during their shift, keeping in regard
     * the current time (clocking off 15 minutes before end of shift is not a lunch)
     */

    let day = schedule.slice(0, 2);
    let start = schedule.slice(2, schedule.indexOf("p")+1);
    let end = schedule.slice(schedule.indexOf("-")+1, schedule.lastIndexOf("p")+1);
    let dept = schedule.slice(schedule.indexOf("SLS"), schedule.indexOf(")"));

    return [day, start, end, dept];
}

function getUserDetails(clockInOut, currentTime, today){
    let username = getUserName();
    let schedule = parseSchedule(today);

    return [username, clockInOut, currentTime, schedule];
}

function getSchedule(){
    if (document.getElementsByClassName("today").length === 1){
        let today = document.getElementsByClassName("today");
        return today[0].innerText;
    }
}

function formatPage(pageContents, userDetails){
    /* ===== userDetails =====
     * [0]: String: username
     * [1]: String: "Clocked in" | "Clocked Out"
     * [2]: String: currentTime
     * [3]: Array
     * [3][0]: String: day
     * [3][1]: String: start (of shift)
     * [3][2]: String: end (of shift)
     * [3][3]: String: dept
     */

    let header = pageContents.slice(0, pageContents.indexOf("20")+4);
    let username = userDetails[0] + " (" + userDetails[3][3] + ")";
    let clockInOut = userDetails[1] + " at ";
    let currentTime = userDetails[2];
    let startTime = userDetails[3][1];
    let endTime = userDetails[3][2];
    pageContents = pageContents.slice(pageContents.indexOf("20")+4);
    let userContent;

    if (pageContents.indexOf(username) !== -1){
        userContent = pageContents.slice(pageContents.indexOf(username),
                                         pageContents.indexOf("* * *", pageContents.indexOf(username)));



        let divider = pageContents.slice(pageContents.indexOf("*", pageContents.indexOf(username)),
                                         pageContents.indexOf("*", pageContents.indexOf(username))+5);

        console.log(pageContents);
        pageContents = pageContents.replace(userContent, "");
        pageContents = pageContents.replace("#### * * *", "");
        console.log(pageContents);


        userContent += clockInOut + currentTime;
        userContent += "\n" + divider;

        pageContents = userContent + pageContents;

        console.log(pageContents);

        updatePage(repo, "index.md", pageContents);

    }

    else{
        userContent = username + "\n" +
                      clockInOut +
                      currentTime;

        console.log(userContent);
    }

    // You need to determine whether or not a user is list on the page or not with indexOf
    // If they are on the page, you need to slice/substring their section out and edit it.
    // Remove the old version of it from the page, and move the new version to the top.


    // In order to determine if a user has gone to lunch, they must first clock in, then clock out.
    // When they clock in again

    let userOnLunch = outToLunch(startTime, endTime, currentTime);
    // if clockInOut is clocked out and pageContents for current user contains "Clocked out",
    // replace "Clocked out" with "Out to Lunch"

}

function outToLunch(startTime, endTime, currentTime){
    // The premise here is that the user has clocked out and we want to determine if they have gone to lunch
    // based on the time that they clocked out.

    if (startTime.includes('a')){
        startTime = startTime.substring(0, startTime.length-1);
        startTime = Number(startTime);
    }

    else if (startTime.includes('p')){
        startTime = startTime.substring(0, startTime.length-1);
        startTime = Number(startTime);
        startTime += 12; // makes 1:00 --> 13:00
    }

    if (endTime.includes('a')){
        endTime = endTime.substring(0, endTime.length-1);
        endTime = Number(endTime);
    }

    else if (endTime.includes('p')){
        endTime = endTime.substring(0, endTime.length-1);
        endTime = Number(endTime);
        endTime += 12; // makes 7:00 --> 19:00
    }

    if (currentTime.includes('AM')){
        currentTime = currentTime.substring(0, currentTime.indexOf(":"));
        currentTime = Number(currentTime);
    }

    else if (currentTime.includes('PM')){
        currentTime = currentTime.substring(0, currentTime.indexOf(":"));
        currentTime = Number(currentTime);
        currentTime += 12;
    }

    return ((startTime < currentTime && currentTime < endTime));

}

// Wait for window to load
window.onload = function() {




    pageContents = getPageContents(repo);

    console.log("===== LUNCHBOX =====");
    console.log("Extension loaded.");
    console.log("====================");

    /* For some reason, UltiPro fires window.onload events numerous times.
     * This JavaScript will be executed every time an event fires.
     * The elements that we are looking for may not be loaded when the code is run,
     * so the if-statements are necessary to grab and store the desired information.
     */

    let clockOn = getClockOnButton();
    let clockOff = getClockOffButton();
    let currentTime;
    let userDetails;


    /* If the buttons are found, it is printed to the console.
     * An event listener is added to the 'Clock On' and 'Clock Off' buttons.
     * The event listener listens for clicks. When clicked, it records the
     * time that the button was pressed. The information is then sent to the GitHub repository.
     */
    if (clockOn != null){
        // Add an EventListener to listen for clicks on each of the buttons
        clockOn.addEventListener('click', function() {
            currentTime = getTime();
            let schedule = getSchedule();
            userDetails = getUserDetails("Clocked in", currentTime, schedule);

            console.log("Current User: " + userDetails[0]);
            console.log(userDetails[1] + " at " + userDetails[2]);
            console.log("Schedule: " + userDetails[3][1] + "-" + userDetails[3][2]);
            console.log("Department: " + userDetails[3][3]);
            console.log("===================");

            formatPage(pageContents, userDetails);

    }, false);}

    else{
        console.log("Couldn't find clock on button");
    }

    if (clockOff != null){
        clockOff.addEventListener('click', function() {
            currentTime = getTime();
            let schedule = getSchedule();
            userDetails = getUserDetails("Clocked out", currentTime, schedule);

            /* ===== userDetails =====
             * [0]: String: username
             * [1]: String: "Clocked in" | "Clocked Out"
             * [2]: String: currentTime
             * [3]: Array
             * [3][0]: String: day
             * [3][1]: String: start (of shift)
             * [3][2]: String: end (of shift)
             * [3][3]: String: dept
             */

            console.log("Current User: " + userDetails[0]);
            console.log(userDetails[1] + " at " + userDetails[2]);
            console.log("Schedule: " + userDetails[3][1] + "-" + userDetails[3][2]);
            console.log("Department: " + userDetails[3][3]);
            console.log("===================");

            formatPage(pageContents, userDetails);

    }, false);
    }

    else {
        console.log("Couldn't find clock off button");
    }


};



/* Figure out some way to access the GitHub API
 * Ultimately you will need to incorporate the API tokens from GitHub Apps (https://github.com/settings/applications/833784)
 * Updating a file on GitHub uses PUT (https://developer.github.com/v3/repos/contents/#update-a-file)
 */
