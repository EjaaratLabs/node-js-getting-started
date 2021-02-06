const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const puppeteer = require("puppeteer");

const app = express();
app.get('/', async (req, res)  => {
  var htmlContent= `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  </head>
  <body>
  Hello
  </body>
  </html>
  `
  const browser = await puppeteer.launch({
    args: [
      
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

const page = await browser.newPage();
await page.setContent(htmlContent);

const buffer = await page.pdf({ format: "A4", margin:{top:"1.75cm",bottom:"1.5cm"}});
const base64 = buffer.toString('base64');
  res.send({
    data:base64
  });
});
app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`))
