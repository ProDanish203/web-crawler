function printReport(pages){
    console.log("\n=================== GENERATED REPORT ===================\n");
    const sortedPages = sortPages(pages);

    for(const page of sortedPages){
        const url = page[0];
        const linked = page[1];

        console.log(`Found ${linked} ${linked === 1 ? "link":"links"} to page ${url}`);
    }

    console.log("\n=================== END OF REPORT ===================\n");
}

function sortPages(pages){
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a,b) => {
        aHits = a[1];
        bHits = b[1];
        return b[1] - a[1];
    })
    return pagesArr;
}

module.exports = {sortPages, printReport}