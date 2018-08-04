// Enable extension if user is on the log on/off page in UltiPro
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'amastin-microcenter.github.io'}, //mei.ultiprotime.com
          //css: ["span[id='???']"]
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });

function showDOM(domContent){
      console.log('I received the following DOM content:\n" + domContent);
}

chrome.browserAction.onClicked.addListener(function (tab) {
  // ...if it matches, send a message specifying a callback too
  console.log("This code has been reached");
  chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, showDOM);
    
});


