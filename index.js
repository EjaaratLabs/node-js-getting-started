const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World, from express');
});
app.listen(PORT, () => console.log(`Hello world app listening on port ${PORT}!`))
