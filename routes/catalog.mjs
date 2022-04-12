import express from 'express';
import axios from 'axios';
import { config } from '../token.mjs';
import { mainUrl, modificationsUrl, hotPartUrl } from '../urls.js';
const catalogRouter = express.Router();

catalogRouter.get("/",async (req, res) => {

    const loadhotparts = async (model) =>  {
        try {
            const response = await axios.get(mainUrl + "entity/assortment?filter=" + modificationsUrl + `~${model};` + hotPartUrl + "=true", config)
            return response.data.rows
        }
        catch (err) {
            console.error(err)
        }

    }

    console.log("Hello catalog");

    const c30Items = await loadhotparts("c30");
    const w5Items = await loadhotparts("w5");
    res.render("catalog", {c30Items: c30Items,w5Items: w5Items})


})

export default catalogRouter;