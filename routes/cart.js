import express from 'express';
import axios from 'axios';
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

if (cartItems.length ===0) {
  res.send("Sizin sebetiniz bosdur. Mehsullar elave edennen sonra yeniden yoxluyun.")
} else {
  res.render("cart", { Items: cartItems })
}
  
console.log("Hello cart");


})

export default cartRouter;