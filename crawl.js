const {JSDOM} = require('jsdom')

const crawlPage = async (currentUrl) => {
    console.log(`Crawling ${currentUrl}...`)
    try{
        const res = await fetch(currentUrl);

        if(res.status > 399){
            console.log(`Error ocuured in fetch with status code: ${res.status} on page: ${currentUrl}`)
            return;
        }

        const contentType = res.headers.get('content-type')
        if(!contentType.includes("text/html")){
            console.log(`Non HTML response, content type: ${contentType} on page: ${currentUrl}`)
            return;
        }


        const data = await res.text();
        console.log(data)
    }catch(err){
        console.log(`Error Ocuured In Fetch: ${err.message} on page: ${currentUrl}`)
    }
}

const getUrlFromHTML = (htmlBody, baseUrl) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkelements = dom.window.document.querySelectorAll('a');
    for (link of linkelements){
        if(link.href.slice(0,1) === "/"){
            try{
                const urlObj = new URL(`${baseUrl}${link.href}`)
                urls.push(urlObj.href);
            }catch(err){
                console.log(`Error with url: ${err.message}`)
            }
        }else{
            try{
                const urlObj = new URL(link.href);
                urls.push(urlObj.href);
            }catch(err){
                console.log(`Error with url: ${err.message}`)
            }
        }
    }
    return urls;
}

const normalizeUrl = (url) => {
    const urlObj = new URL(url);
    const hostname =  `${urlObj.hostname}${urlObj.pathname}`
    if(hostname.length > 0 && hostname.slice(-1) === "/"){
        return hostname.slice(0, -1)
    }
    return hostname;
}

module.exports = {normalizeUrl, getUrlFromHTML, crawlPage}