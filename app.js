const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const expressLayout = require('express-ejs-layouts');
const ejs = require('ejs');
const path = require('path');
const breweryRouter = require('./src/routers/breweryRouter');

app.use(expressLayout);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

app.use('/', breweryRouter);

app.listen(port, () => {
    console.log(`Uygulama, ${port} portundan dinleniyor...`);
})
