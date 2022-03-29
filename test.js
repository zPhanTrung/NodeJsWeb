const express = require('express');
const handlebars = require('express-handlebars')

const path = require('path')

const app = express();
const PORT = 3000

app.engine('hbs', handlebars({
    extname: '.hbs',

}));

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({
    extended: true
}));

app.listen(PORT);

app.use('/home', (req, res)=>{
    res.render('/home')
})