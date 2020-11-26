async function logURL(requestDetails) {
  let originUrl = requestDetails.originUrl
  originUrl = originUrl.split('/')[2]

  let request = requestDetails.url
  //let requestsP = document.getElementById("requestsId")

  if (!(request.includes(originUrl))){
    let requestObject = {"origin":originUrl,"request":request}
    console.log(requestObject)
    
    // Get Arraw from storage
    // var resquestsLists = await browser.storage.local.get();

    //console.log(resquestsLists)

    //resquestsLists.push(requestObject);

    var storageObjects = await browser.storage.local.get("requestsLists");

    if(storageObjects != null && storageObjects.requestsLists){
      var requestsLists = storageObjects.requestsLists
    } else {
      var requestsLists = []
    }
    

    console.log(requestsLists)

    requestsLists.push(requestObject);



    while(requestsLists.length >= 50){
      requestsLists.shift()
    }


    await browser.storage.local.set({
      requestsLists
    });
  }
  // console.log(request.includes(originUrl))
}
  
browser.webRequest.onBeforeRequest.addListener(
  logURL,
  {urls: ["<all_urls>"]}
);