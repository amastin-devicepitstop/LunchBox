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

    return currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + today.getSeconds() + " " + meridiem;
}


// Wait for window to load
window.onload = function() {

    console.log("===== LUNCHBOX =====");
    console.log("Extension Loaded.");
    
    
    /* For some reason, UltiPro fires window.onload events numerous times.
     * This JavaScript will be executed every time an event fires.
     * The elements that we are looking for may not be loaded when the code is run,
     * so the if-statements are necessary to grab and store the desired information.
     */
    
    /* getElementsByTagName returns an array of the specified elements.
     * In order to choose a specific element, you have to specify it's index.
     */
    
    // The code below sets the user's name to a variable
    if (document.getElementById("loginUserName") != null){
        console.log("Found user's name.");
        var username = document.getElementById("loginUserName").innerText;
    }
    
    // The code below sets the 'Clock On' and 'Clock Off' buttons to variables    
    if (document.getElementsByTagName("button").length == 2){
        var clockOn = document.getElementsByTagName("button")[0];
        var clockOff = document.getElementsByTagName("button")[1];
        
    }     
    
    /* If the buttons are found, it is printed to the console. 
     * An event listener is added to the 'Clock On' and 'Clock Off' buttons.
     * The event listener listens for clicks. When clicked, it records the
     * time that the button was pressed. The information is then sent to this GitHub repository.
     */
    if (clockOn != null){
        console.log("First button found");
        // Add an EventListener to listen for clicks on each of the buttons
        clockOn.addEventListener('click', function() {
        console.log("Clocked on at " + getTime());
    }, false);

    }
    if (clockOff != null){
        console.log("Second button found");
        console.log("====================");
        clockOff.addEventListener('click', function() {
        console.log("Clocked off at " + getTime());
    }, false);
    }
    
    if (document.getElementsByClassName("today").length == 1){
        var today = document.getElementsByClassName("today");
        console.log(today);
        console.log(today.innerText);
        console.log(today.innerHTML);
        console.log(today.value);
    }

    
    
};

/* Figure out some way to access the GitHub API
 * Ultimately you will need to incorporate the API tokens from GitHub Apps (https://github.com/settings/applications/833784)
 * Updating a file on GitHub uses PUT (https://developer.github.com/v3/repos/contents/#update-a-file)
 */
