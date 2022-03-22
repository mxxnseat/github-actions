const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");


function boot(){
    const app = express();

    app.use(bodyParser());

    app.get("/", (req, res)=>{
        res.status(200).json("hello world");
    })

    app.post("/", (req, res)=>{
        const {filename, ...data} = req.body;
       

        fs.writeFileSync(path.resolve(__dirname, `../${filename}`), JSON.stringify(data),{encoding: "utf8", flag: "w"});

        res.status(201).json("data was added");
    })


    return app;
}

module.exports = {boot}