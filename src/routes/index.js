import { Express } from "express";
import indexController from "./index.controller";

const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("index");
});

router.get('/index2/', indexController.index2)

router.get('/perfiles/', indexController.perfiles)

/*router.get("/index2", (req, res) =>{
    res.render("index2");
});
*/

module.exports = router;