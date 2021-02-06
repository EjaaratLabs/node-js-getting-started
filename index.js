const express = require('express')
require('events').EventEmitter.prototype._maxListeners = 25;
const path = require('path')
const PORT = process.env.PORT || 5000
const puppeteer = require("puppeteer");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/generatepdf', async function (req, res, next){
 
  var htmlContent= req.body.html;
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
        "--incognito",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"
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

app.get('/', async (req, res)  => {
  res.send("Ejaarat Conversion service");
});
app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`))
