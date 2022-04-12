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

    const loadSectionParts = async (model, sectionSearch) => {
        try {
            const response = await axios.get(mainUrl + "entity/assortment?filter=" + modificationsUrl + `~${model}` + sectionSearch, config)
            return response.data.rows
        }
        catch (err) {
            console.error(err)
        }

    }

    if (req.query.page === undefined) { var currentPage = 1 }
    else { var currentPage = parseInt(req.query.page) }
    console.log("Page is: " + currentPage);


    const properMainItems = await loadSectionParts(model, sectionSearch);
    var qty = properMainItems.length;
    console.log("All QTY is: " + qty);

    var itemsForPage = properMainItems.slice((currentPage - 1) * 20, currentPage * 20)


    res.render("models", { Items: itemsForPage, page: currentPage, section: req.query.section, qty: qty, totalPages: Math.ceil(qty / 20) })


})



export default modelsRouter;

