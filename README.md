# Axios & Promises 

## Problem 1

Convert the following into a Promise function:

```javascript
// -- Dependencies
const cheerio = require('cheerio');
const url = require('url');

const getImagesInPage = (pageUrl, pageHtml, cb) => {

  const arrayOfImages = [];
  const $ = cheerio.load(pageHtml);

  $('img').map((i, e) => {
    const imgURL = url.resolve(pageUrl, $(e).attr('src'));
    arrayOfImages.push(imgURL);
  });

  cb(arrayOfImages);
}


// ----- Promisified
getImagesInPagePromisified('url', 'html')
  .then(imageUrls => {
    console.log(imageUrls);
  }, _=>{})
```

## Problem 2

Convert the following into a Promise function:

```javascript
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('body:', body); // Print the HTML for the Google homepage.
});
```

## Problem 3

Using Axios and the function you built in Problem 1, create a promise based function that returns all the image URLs on a webpage. 

### Example:

```javascript
getImagesFrom('https://en.wikipedia.org/wiki/Ceratosaurus')
  .then(imageUrls => {
    console.log(imageUrls);
  })
  .catch(err => {
    console.log(err);
  })
```

## Problem 4

Create an Express server that takes in the following request:

```
GET http://localhost:3000/getImagesFromPage/?url=[PASS IN URL]
```

And the page responds with a JSON response holding all the image URLs from that page.
