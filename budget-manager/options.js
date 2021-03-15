$(function(){

    chrome.storage.sync.get('limit', function(budget) {
        $('#limit').val(budget.limit);
    })

    $('#saveLimit').click(function(){
        let limit = $('#limit').val();
        if(limit) {
            chrome.storage.sync.set({'limit': limit}, function(){
                close()
            })
        }
    });

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total': 0}, function() {
            let notifOptions = {
                type: 'basic',
                iconUrl: 'icon32.png',
                title: 'Total reset!',
                message: 'Total has been reset to 0!'
            }

            var timestamp = new Date().getTime();
            let id = 'resetTotal' + timestamp

            chrome.notifications.create(id, notifOptions);
        });
    })
})