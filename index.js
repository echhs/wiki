import express from "express";
import fs from "fs";

const app = express();

app.use(express.static("web"));

app.get("/wiki/:article", (req, res) => {
    res.sendFile(`${process.cwd()}/web/article.html`);
});

app.get("/", (req, res) => {
    res.redirect(`/wiki/Main_Page`);
});

app.listen(8080, (err) => {
    if (err) throw err;
});