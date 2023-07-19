import express from "express";
import fs from "fs";
import { JSDOM } from "jsdom";
import { marked } from "marked";

const app = express();

app.use(express.static("web"));

app.get("/wiki/:article", (req, res) => {
    fs.readFile("web/article.html", {encoding: "utf-8"}, (err, html) => {
        if (err) throw err;
        var dom = new JSDOM(html);
        fs.readFile(`web/content/${req.params.article}.md`, {encoding: "utf-8"}, (err, md) =>{
            if (err) throw err;
            dom.window.document.getElementById("content").innerHTML += marked.parse(md);
            res.setHeader("Content-Type", "text/html");
            res.send(dom.serialize());
        });
    });
});

app.get("/", (req, res) => {
    res.redirect(`/wiki/Main_Page`);
});

app.listen(8080, (err) => {
    if (err) throw err;
});