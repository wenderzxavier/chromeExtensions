$(function() {

    chrome.storage.sync.get(['total', 'limit'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    })

    $('#spendAmount').click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(budget) {
            let newTotal = 0;
            if(budget.total) {
                newTotal += parseInt(budget.total);
            }

            let amount = $('#amount').val();
            if(amount) {
                newTotal += parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal}, function() {
                if(amount && newTotal >= budget.limit) {
                    let notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon32.png',
                        title: 'Limit reached!',
                        message: 'Uh oh! Looks like you reached your limit!'
                    }

                    var timestamp = new Date().getTime();
                    let id = 'limitNotif' + timestamp

                    chrome.notifications.create(id, notifOptions);
                }
            })

            $('#total').text(newTotal);
            $('#amount').val('');
        })
    })
})