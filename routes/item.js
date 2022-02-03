import express from 'express';
import axios from 'axios';
import { config } from '../token.js';
import { mainUrl, modificationsUrl, hotPartUrl, sectionUrl } from '../urls.js';
const itemRouter = express.Router();

itemRouter.get('/:article', async (req, res) => {
    const loadItem = async (article) => {
        try {
            const response = await axios.get(mainUrl + "entity/assortment?filter=article=" + article, config)
            return response.data.rows[0]
        }
        catch (err) {
            console.error(err)
        }

    }
    console.log("Hello item");
    var item = await loadItem(req.params.article)

    res.render("item", { item: item })

})



export default itemRouter;

