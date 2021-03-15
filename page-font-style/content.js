chrome.runtime.sendMessage({ todo: "showPageAction" })

chrome.rruntime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == 'changeColor'){
        let addColor = '#' + request.clickedColor;
        $('.api').css('color', addColor);
    }
})