import express from 'express';
import axios from 'axios';
import https from 'https';
import mongoose from 'mongoose';
import { config } from '../token.js';
import { mainUrl, modificationsUrl, hotPartUrl } from '../urls.js';
const cartRouter = express.Router();



cartRouter.get("/", async (req, res) => {
  var cartItems = [];
  var allCookies = req.cookies
  for (let [article, qty] of Object.entries(allCookies)) {
    var newObj = new Object()
    newObj.json = (await axios.get(mainUrl + "entity/assortment?filter=article=" + article, config)).data.rows[0]
    newObj.cartQTY = parseInt(qty)
    cartItems.push(newObj)
  }

  if (cartItems.length === 0) {
    res.send("Sizin sebetiniz bosdur. Mehsullar elave edennen sonra yeniden yoxluyun.")
  } else {
    res.render("cart", { Items: cartItems })
  }

  console.log("Hello cart");


})

cartRouter.post("/", async (req, res) => {
  await mongoose.connect('mongodb+srv://Jeyhun:Cqu2425232@clusterpekin.ss65h.mongodb.net/CustomerOrders');
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const ordersSchema = new Schema({
    author: ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    city: String,
    phoneNumber: Number,
    body: String,
    items: String,
    date: Date
  });

  const Order = mongoose.model("Order", ordersSchema)

  const newOrder = new Order({
    firstName: JSON.stringify(req.body.firstName),
    lastName: JSON.stringify(req.body.lastName),
    email: JSON.stringify(req.body.email),
    city: JSON.stringify(req.body.address),
    phoneNumber: req.body.phoneNumber,
    items: JSON.stringify(req.cookies),
    date: new Date()
  })

  newOrder.save();

   var response = https.get(`https://xdroid.net/api/message?k=k-8ce832e84938&t=${req.body.phoneNumber} nomresinden sifaris&c=from+samsung+SM-G985F`)


  // console.log(JSON.stringify(req.body));
  // console.log(JSON.stringify(req.cookies));
  // console.log(response);

  res.send("Post done")
})

export default cartRouter;