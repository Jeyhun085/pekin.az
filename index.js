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
app.set('view engine', 'ejs');
app.use( express.static('public'))
app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/index.html");
})


app.use('/item',itemRouter)
app.use('/cart',cartRouter)
app.use('/models',modelsRouter)
app.use('/catalog',catalogRouter)

app.listen(3000);