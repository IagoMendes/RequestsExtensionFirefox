async function logURL(requestDetails) {
  let originUrl = requestDetails.originUrl
  originUrl = originUrl.split('/')[2]

  let request = requestDetails.url

  if (!(request.includes(originUrl))){
    let requestObject = {"origin":originUrl,"request":request}
    console.log(requestObject)

    
    var storeQuantityRequests = await browser.storage.local.get("quantityRequests");
    if (storeQuantityRequests != null && storeQuantityRequests.quantityRequests){
      var quantityRequests = storeQuantityRequests.quantityRequests
    } else {
      var quantityRequests = {}
    }
    
    if(quantityRequests[originUrl]){
      quantityRequests[originUrl] += 1
    } else{
      quantityRequests[originUrl] = 1
    }


    console.log(quantityRequests)
    
    
    var storageObjects = await browser.storage.local.get("requestsLists");

    if(storageObjects != null && storageObjects.requestsLists){
      var requestsLists = storageObjects.requestsLists
    } else {
      var requestsLists = []
    }
    

    console.log(requestsLists)

    requestsLists.push(requestObject);



    while(requestsLists.length > 50){
      requestsLists.shift()
    }


    await browser.storage.local.set({
      requestsLists
    });

    await browser.storage.local.set({
      quantityRequests
    });
  }
  // console.log(request.includes(originUrl))
}
  
browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);