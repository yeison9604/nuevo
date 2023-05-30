const express = require("express");
const router = express.Router();

router.get("/", (req, res) =>{
    res.render("index");
});

router.get("/", (req, res) =>{
    res.render("index2");
});

module.exports = router;