const {crawlPage} = require('./crawl.js');
const { printReport } = require('./report.js');

async function main(){
    if(process.argv.length < 3){
        console.log("No Website Provided");
        process.exit(1);
    }

    if(process.argv.length > 3){
        console.log("Too Many Command Line Args");
        process.exit(1);
    }

    const baseUrl = process.argv[2];

    console.log(`Started Crawling ${baseUrl}...`);

    const pages = await crawlPage(baseUrl, baseUrl, {});

    // for(const page of Object.entries(pages)){
    //     console.log(page);
    // }

    printReport(pages);
}

main();