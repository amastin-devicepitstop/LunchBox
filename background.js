// Enable extension if user is on the log on/off page in UltiPro
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'orderhistory.microcenter.com/Sales'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });



