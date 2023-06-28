import fs from "fs";
import http from "http";
import querystring from "querystring";



const server = http.createServer((req, res) => {
	var file;

	if (req.path) {
		file = `web/${req.path}.html`;
	}
	else {
		
		file = "web/index.html";
	}

	fs.readFile("web/index.html", (err, data) => {
		if (err) res.write("Not Found").end();
		else {
			res.writeHead(200, {
				"Content-Length": Buffer.byteLength(data),
				"Content-Type": "text/html"
			});
		}

		res.end(data);
	});
});

server.listen(8080);
