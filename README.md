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

With all user information collected and readily accessible, it is time to prepare `index.md` for new content. Whenever a new commit is pushed to `index.md`, Jekyll, the backend for GitHub Pages, is restarted. This means that any updates to `index.md` require about 20 to 30 seconds before they appear publicly. The problem is that the last set of data sent before the page updates is the one that will appear on the web page. Since it is quite likely that two users may clock in or clock out during this period, it is necessary to queue the updates to `index.md`, and release them at regular intervals, as to avoid losing any information during the update period.

User information is formatted in markdown, which provides a basic way of styling the content. It appears as follows:
```
#### Firstname Lastname

Clocked in at #:##:## AM/PM

Out to lunch at #:##:## AM/PM

Back from lunch at #:##:## AM/PM

Clocked out at #:##:## AM/PM
* * *
```

Any updates to `index.md` are queued in `append.md`, where they remain for 1 minute before being dumped to `index.md`. This way, if two users clock out within a short period of one another, the second user's information does not overwrite the first user's information before it has a chance to appear on the web page. 


One user can clock out...
```
#### First User

Clocked in at #:##:## AM/PM

Clocked out at #:##:## AM/PM
```

And another can clock out shortly therafter...
```
#### Second User

Clocked in at #:##:## AM/PM

Clocked out at #:##:## AM/PM
* * *

#### First User

Clocked in at #:##:## AM/PM

Clocked out at #:##:## AM/PM
```

Once a minute has passed, the data is pushed from `append.md` to `index.md`. Then, the contents of `append.md` are cleared to allow for new updates to be queued. Sending a command to wipe `append.md` takes only about a second, so there is a very small window where updates may not be received, but it is greatly improved compared to 30 seconds.

Once `index.md` receives the update, it looks like this:
```
# Month Day, Year

#### User 2

Clocked in at #:##:## AM/PM

Clocked out at #:##:## AM/PM
* * *

#### User 1

Clocked in at #:##:## AM/PM

Clocked out at #:##:## AM/PM
```

If a user clocks out before the last hour of their shift and then clocks back in, the punch information will change from `Clocked out at #:##:## AM/PM` to `Out to lunch at #:##:## AM/PM`. Similarly, `Clocked in at #:##:## AM/PM` will change to `Back from lunch at #:##:## AM/PM`.

Finally, at the end of each day, `index.md` is cleared and restored to this format:
```
# Month Day, Year
```


