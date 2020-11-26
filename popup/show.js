


let requestBtn = document.getElementById("requestsId")
requestBtn.addEventListener("click", func, true ); 



async function func(){
    // console.log("alo");
    // requestText
    //browser.storage.sync.get()
    let requestText = document.getElementById("requestText")
    
    var requestObject = await browser.storage.local.get("requestsLists");
    let requestsLists = requestObject.requestsLists
    
    let contentText = "<tr><th>Origin</th><th>Destination</th></tr>"
    for (var i = 0; i < requestsLists.length; i++) {
        contentText += "<tr><th>"+requestsLists[i].origin+"</th><th>"+requestsLists[i].request+"</th></tr>"
    }
    
    
    
    requestText.innerHTML = contentText //JSON.stringify(requestObject, null, 2)
    requestBtn.addEventListener("click", func, true ); 
    //requestBtn.addEventListener("click", func,true); 
}




function listenForClicks () {
    let requestBtn = document.getElementById("requestsId")
    requestBtn.addEventListener("click", func,true); 


}


browser.tabs.executeScript({file: "/popup/show.js"})
.then(listenForClicks)