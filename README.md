# LunchBox
LunchBox is a Chrome extension that collects information from UltiPro about when an employee clocks in/out for lunch.


## Functionality
This extension uses GitHub's API to display information on a GitHub Pages site.

Once the Ultipro timeclock page loads, the extension collects the existing contents of `index.md`, which is the file used to display information on the GitHub Pages site. The contents are stored in a variable and used later when updating the page.

Next, the extension locates the 'Clock On' and 'Clock Off' buttons. As soon as the buttons are found, the extension confirms that they are the correct buttons. An Event Listener is then added to each button, which allows the extension to know when a button has been pressed. When a button press event occurs, the extension then gets the following information from UltiPro:

  1. The current time
  2. The user's schedule for the current day
  3. Whether or not the user clocked in or clocked out
  
The raw output of the schedule collected from the DOM looks like this:
```
06
1p-7p schedule 
(UAT,ST. LOUIS PARK MERCHANDIS-GS,SLSASGS)
```

The collected variables are all stored in an array variable with the following contents:
  * The user's first and last name
  * Whether or not the user clocked in or clocked out
  * The current time
  * Another array variable containing information parsed from the schedule:
     1. The current day *(ex. '06')*
     2. The start of the user's shift *(ex. '1p')*
     3. The end of the user's shift *(ex. '7p')*
     4. The department the user works in *(ex. 'SLSASGS')*
     
* * *     

With all user information collected and readily accessible, it is time to prepare `index.md` for new content. Whenever a new commit is pushed to `index.md`, Jekyll, the backend for GitHub Pages, is restarted. This means that any updates to `index.md` require about 20 to 30 seconds before they appear publicly. Since it is quite likely that two users may clock in or clock out during this period, it is necessary to queue the updates to `index.md`, and release them at regular intervals, as to avoid losing any information during the update period.

User information is formatted in markdown, which provides a basic way of styling the content. It appears as follows:
```
#### Firstname Lastname

Clocked in at #:##:## AM/PM

Out to lunch at #:##:## AM/PM

Back from lunch at #:##:## AM/PM

Clocked out at #:##:## AM/PM
* * *
```

 
