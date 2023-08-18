const {crawlPage} = require('./crawl.js')

function main(){
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
    crawlPage(baseUrl);
}

main();