import express from "express";
import fs from "fs";
import { JSDOM } from "jsdom";
import { marked } from "marked";

// fixes marked warnings
marked.setOptions({
    "mangle": false,
    "headerPrefix": false,
    "headerIds": false,
});

const app = express();

app.use(express.static("web"));

app.get("/random", (req, res) => {
    fs.readdir("web/content", (err, files) => {
    });
});

app.get("/wiki/:article", (req, res) => {
    var title = req.params.article.replaceAll("_", " ");
    fs.readFile("web/article.html", {encoding: "utf-8"}, (err, html) => {
        var dom = new JSDOM(html);
        fs.readFile(`web/content/${req.params.article}.md`, {encoding: "utf-8"}, (err, md) =>{
            if (err) {
                console.log(err);
                res.sendStatus(404);
            }
            else{
                dom.window.document.getElementById("page-title").innerHTML = title;
                dom.window.document.getElementById("content").innerHTML += marked.parse(md);
                res.setHeader("Content-Type", "text/html");
                res.send(dom.serialize());
            }
        });
    });
});

app.get("/", (req, res) => {
    res.redirect(`/wiki/Main_Page`);
});

app.listen(8080, (err) => {
    if (err) throw err;
});