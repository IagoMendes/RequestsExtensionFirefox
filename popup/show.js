


let requestBtn = document.getElementById("requestsId")
requestBtn.addEventListener("click", showAll, true ); 

let cacheBtn = document.getElementById("clearCache")
cacheBtn.addEventListener("click", clearCache, true );


showAll()

async function showAll(){
    console.log("Rodando func")
    await showRequests();
    requestBtn.addEventListener("click", showAll, true ); 
    
    
    await showQuantityRequests();

}

async function clearCache(){
    console.log("Rodando clearCache")
    await browser.storage.local.clear();
    cacheBtn.addEventListener("click", clearCache, true ); 
    
    await showAll();
}

async function showRequests () {
    let requestText = document.getElementById("requestText")
    let tableText = document.getElementById("tableMessage")
    
    
    let requestObject = await browser.storage.local.get("requestsLists");
    let requestsLists = requestObject.requestsLists
    
    
    let contentText = ""
    let contentTableText = ""
    if(requestsLists && requestsLists.length && requestsLists.length > 0){
        contentTableText = "Exibindo ultimos "+requestsLists.length+" requests"
        contentText += "<tr><th>Origin</th><th>Destination</th></tr>"
        for (let i = requestsLists.length-1; i >= 0; i--) {
            contentText += "<tr><th>"+requestsLists[i].origin+"</th><th>"+requestsLists[i].request+"</th></tr>"
        }
    }

    
    tableText.innerHTML = contentTableText
    requestText.innerHTML = contentText 
    
}



async function showQuantityRequests () {
    let quantityRequestTable = document.getElementById("quantityRequestTable")

    let requestObject = await browser.storage.local.get("quantityRequests");
    
    let quantityRequests = requestObject.quantityRequests
    console.log(quantityRequests)
    let insideTable = ""
    if(quantityRequests){
        insideTable = "<tr><th>Origin</th><th>Quantity</th></tr>"
        for (let req in quantityRequests) {
            insideTable += "<tr><th>"+req+"</th><th>"+quantityRequests[req]+"</th></tr>"
        }
    }

    quantityRequestTable.innerHTML = insideTable
    
}


async function listenForClicks () {
    let requestBtn = document.getElementById("requestsId")
    requestBtn.addEventListener("click", showAll,true); 
}