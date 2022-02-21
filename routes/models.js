import jsdom from "jsdom";
import queryString from "query-string";
import express from 'express';
import axios from 'axios';
import { config } from '../token.js';
import { mainUrl, modificationsUrl, hotPartUrl, sectionUrl } from '../urls.js';
const modelsRouter = express.Router();

modelsRouter.get('/:model', async (req, res) => {
    var model = req.params.model
    if (req.query.section === undefined || req.query.section === "") {
        var sectionSearch = "";
    } else {
        var sectionSearch = ";" + sectionUrl + "=" + req.query.section
    }

    // console.log("Model is " + model);
    
    console.log( req.query);


    const loadSectionParts = async (model, sectionSearch) => {
        try {
            const response = await axios.get(mainUrl + "entity/assortment?filter=" + modificationsUrl + `~${model}` + sectionSearch, config)
            return response.data.rows
        }
        catch (err) {
            console.error(err)
        }

    }

    const properMainItems = await loadSectionParts(model, sectionSearch);
    // console.log("Items QTY:" + properMainItems.length);

    res.render("models", { Items: properMainItems, page: req.query.page, section: req.query.section })


})



export default modelsRouter;

