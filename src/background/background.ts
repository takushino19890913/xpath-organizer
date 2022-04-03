
chrome.runtime.onInstalled.addListener((details) => {

    chrome.contextMenus.create({
        title: "Get Element Xpath",
        id: "getXpathContextMenu",
        contexts:["all"]
    });

    chrome.contextMenus.onClicked.addListener((event,tab) => {
        if(event.menuItemId === "getXpathContextMenu"){
            chrome.storage.local.get(["clickedElement"],(res) => {
                chrome.storage.local.set({
                    currentSelectedElement:res.clickedElement
                })
                console.log(res.clickedElement)
            })

        }
    });


})
