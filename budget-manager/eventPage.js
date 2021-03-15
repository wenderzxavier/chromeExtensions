const contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"]
}

chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId == 'spendMoney' && clickData.selectionText) {
        if(isInt(clickData.selectionText)) {
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if(budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal}, function(){
                    if(newTotal >= budget.limit) {
                        let notifOptions = {
                            type: 'basic',
                            iconUrl: 'icon32.png',
                            title: 'Limit reached!',
                            message: 'Uh oh! Looks like you reached your limit!'
                        }
            
                        var timestamp = new Date().getTime();
                        let id = 'limitReached' + timestamp
            
                        chrome.notifications.create(id, notifOptions);            
                    }
                })
            })
        }
    }
})

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({'text': changes.total.newValue.toString()})
})