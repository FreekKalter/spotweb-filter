var active = true;

function inject(){
    console.log('injecting javasript');
    browser.tabs.executeScript({
        file: '/filter.js'
    });
}

function toggleActive() {
  active = !active;
  browser.browserAction.setIcon({
    path: active ? {
      48: "icons/filter-active.png"
    } : {
      48: "icons/filter-inactive.png"
    }
  });
  console.log("filter: ", active ? "active" : "inactive");
  if(active){
      updateActiveTab();
  }else{
      browser.tabs.reload();
  }

}

function updateActiveTab() {

  function updateTab(tabs) {
    if (tabs[0]) {
      currentTab = tabs[0];
      if(currentTab.url.indexOf('nzbserver.com') > 0){
          console.log(currentTab.url);
           if(active){
               inject();
           }
      }
    }
  }

  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then(updateTab);
}

 // listen to tab URL changes
browser.tabs.onUpdated.addListener(updateActiveTab);

// listen to tab switching
browser.tabs.onActivated.addListener(updateActiveTab);

// listen for window switching
browser.windows.onFocusChanged.addListener(updateActiveTab);

// toolbar button
browser.browserAction.onClicked.addListener(function(){toggleActive();});

console.log('extension loaded');
