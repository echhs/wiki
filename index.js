import fs from "fs";
import http from "http";
import querystring from "querystring";

var mimeTypes = {
	"html": "text/html",
	"css": "text/css",
	"js": "text/javascript",
	"png": "image/png",
	"jpg": "image/jpeg",
	"jpeg": "image/jpeg",
}

const server = http.createServer((req, res) => {
	var file;

	if (req.url && req.url.includes(".")) {
		file = `web/${req.url}`;
	}
	else if(req.url != "/"){
		file = `web/${req.url}.html`;
	}
	else {
		file = "web/index.html";
	}

	fs.readFile(file, (err, data) => {
		if (err) data = "Not Found";
		else {
			res.writeHead(200, {
				"Content-Type": mimeTypes[file.split(".")[1]]
			});
		}

		res.end(data);
	});
});

server.listen(8080);
