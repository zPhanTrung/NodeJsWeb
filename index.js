
const express = require("express")
const handlebars = require('express-handlebars');
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express()
const routes = require("./router/routes")

const cookieParser = require('cookie-parser')

app.use(cookieParser())

const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const socket = require("./manager/socketManager")


server.listen(PORT)

socket.run(io)


app.engine('hbs', handlebars({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static("public"))

//app.listen(PORT);

app.use(routes)






// app.listen(app.get("port"), function(){
//     console.log("server started on port " + app.get("port"))
// });




