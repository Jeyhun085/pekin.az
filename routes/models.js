// import pagination from "pagination";
import jsdom from "jsdom";
import express from 'express';
import axios from 'axios';
import { config } from '../token.js';
import { mainUrl, modificationsUrl, hotPartUrl, sectionUrl } from '../urls.js';
const modelsRouter = express.Router();

modelsRouter.get('/:model', async (req, res) => {
    var model = req.params.model
    if (req.query.section === undefined) {
        var sectionSearch = "";
    } else {
        var sectionSearch = ";" + sectionUrl + "=" + req.query.section
    }

    console.log(model);
    console.log(sectionSearch);


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

    
    
    res.render("models", { Items: properMainItems})


})



export default modelsRouter;

