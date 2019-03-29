Implementation details:

* When user search any text in google, search result will be loaded,
* This extension will fetch all the main links from the search result, an individually send request to the url, if that is reachable, the url is marked as green tick, otherwise it is marked as red cross mark.
* Durng this process, the status of the url is saved in local storage for future process.