// Enable extension if user is on the log on/off page in UltiPro
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'cd3770rn.github.io/'}, //mei.ultiprotime.com
          //css: ["span[id='???']"]
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
