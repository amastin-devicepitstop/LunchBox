# LunchBox
LunchBox is a Chrome extension that collects information from UltiPro about when an employee clocks in/out for lunch.


## Functionality
When the correct page in UltiPro is loaded, the extension locates the 'Clock On' and 'Clock Off' buttons.
  
As soon as the buttons are found, the extension confirms that they are the correct buttons. An Event Listener is then added to each button, which allows the extension to know when a button has been pressed. When a button press event occurs, the extension then gets the following information from UltiPro:

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

  
  
 
