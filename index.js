import fs from "fs"
import http from "http"

const server = http.createServer((req, res) => {
	res.write("echhs wiki");
	res.end();
});

server.listen(8080);
