import express from 'express';
import $ from "jquery";
import path from "path";
import cookieParser  from 'cookie-parser';
import modelsRouter from './routes/models.js';
import catalogRouter from './routes/catalog.js';
import cartRouter from './routes/cart.js';
import itemRouter from './routes/item.js';
const __dirname = path.resolve(path.dirname(''));
const app = express()

app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.get('/',express.static('public'), (req,res) =>{
    res.sendFile(__dirname + "/index.html");
})


app.use('/item',express.static('public'),itemRouter)
app.use('/cart',express.static('public'),cartRouter)
app.use('/models',express.static('public'),modelsRouter)
app.use('/catalog',express.static('public'),catalogRouter)

app.listen(3000);