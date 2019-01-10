const cheerio = require('cheerio');
const request = require('request');
const app = require('express')();
const url = require('url');
const axios = require('axios');

const getImagesInPage = (pageUrl, pageHtml, cb) => {

    const arrayOfImages = [];
    const $ = cheerio.load(pageHtml);

    $('img').map((i, e) => {
        const imgURL = url.resolve(pageUrl, $(e).attr('src'));
        arrayOfImages.push(imgURL);
    });

    cb(arrayOfImages);
}

const getImagesFrom = (pageUrl) => axios.get(pageUrl).then((response) => {
    const arrayOfImages = [];
    const $ = cheerio.load(response.data);

    $('img').map((i, e) => {

        const imgURL = url.resolve(pageUrl, $(e).attr('src'));
        arrayOfImages.push(imgURL);
    });
    return arrayOfImages;
})

// getImagesFrom('https://en.wikipedia.org/wiki/Ceratosaurus')
//   .then(imageUrls => {
//     console.log(imageUrls);
//   })
//   .catch(err => {
//     console.log(err);
//   })

const getImagesInPagePromisified = (pageUrl, pageHtml) => {
    return new Promise((resolve, reject) => {
        const arrayOfImages = [];
        const $ = cheerio.load(pageHtml);

        $('img').map((i, e) => {
            const imgURL = url.resolve(pageUrl, $(e).attr('src'));
            arrayOfImages.push(imgURL);
        });

        if (arrayOfImages[0] === undefined) {
            reject(arrayOfImages)
        } else {
            resolve(arrayOfImages);
        }

    });
};

// getImagesInPagePromisified('https://www.npmjs.com/package/cheerio', '<img>')
//     .then(imageUrls => {
//         console.log(imageUrls);
//     }, arr => {
//         console.log("didn't work")

//     })

// problem 2 

const requestPromise = (url) => new Promise((resolve, reject) => {
    request('url', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('body:', body); // Print the HTML for the Google homepage.
        if (error) reject(error);
        else resolve({
            response,
            body
        });
    });
});

// axios.get('https://motherfuckingwebsite.com')
// .then(response => {
//     console.log(response);
// }).catch(_=> {
//     console.log('there was an error')
// })

app.get('/', (req, res) => {
    res.json({
        message: 'home base',
    })
});

app.get('/getImagesFromPage/', (req, res) => {
    const url = req.query.url;

    if(url) {

            getImagesFrom(url)
            .then( img => {

                res.json({
                    img,
                })

            }, err => {
                res.json({
                    err,
                })
            })

    } else {
        res.json({
            message:'url query required',
        })
    }
});


app.listen(3000, _=> {
    console.log('Listening on Port: 3000');
})