const { normalizeUrl, getUrlFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test('normalizeUrl', () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeUrl(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
});

test('getUrlFromHTML absolute url', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://www.youtube.com/">Youtube</a>    
        </body>
    </html>
    `
    const inputUrl = 'https://www.youtube.com';
    const actual = getUrlFromHTML(inputHTML, inputUrl);
    const expected = ["https://www.youtube.com/"];
    expect(actual).toEqual(expected);
})

test('getUrlFromHTML relative url', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/path/">Youtube</a>    
        </body>
    </html>
    `
    const inputUrl = 'https://www.youtube.com';
    const actual = getUrlFromHTML(inputHTML, inputUrl);
    const expected = ["https://www.youtube.com/path/"];
    expect(actual).toEqual(expected);
})

test('getUrlFromHTML both url', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://www.youtube.com/path1/">Youtube</a>    
            <a href="/path2/">Youtube</a>    
        </body>
    </html>
    `
    const inputUrl = 'https://www.youtube.com';
    const actual = getUrlFromHTML(inputHTML, inputUrl);
    const expected = ["https://www.youtube.com/path1/", "https://www.youtube.com/path2/"];
    expect(actual).toEqual(expected);
})

test('getUrlFromHTML Invalid url', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="invalid url">Youtube</a>        
        </body>
    </html>
    `
    const inputUrl = 'https://www.youtube.com';
    const actual = getUrlFromHTML(inputHTML, inputUrl);
    const expected = [];
    expect(actual).toEqual(expected);
})