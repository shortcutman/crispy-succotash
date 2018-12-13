const http = require('http');
const { parse } = require('querystring');
const url = require('url');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

var dots = require('dot').process({path: "."});

var items = [];

function add(item) {
	items.push(item);
}

function deleteItem(item) {
	var index = items.indexOf(item);
	if (index == -1)
		return;
	items.splice(index, 1);
}

function move(item, position) {
	deleteItem(item);
	items.splice(position, 0, item);
}

const server = http.createServer((req, res) => {

	var requestURL = url.parse(req.url, true);
	switch (String(requestURL.pathname))
	{
		case "/add":
			console.log("add");
			add(requestURL.query.item);
			break;

		case "/delete":
			console.log("delete");
			deleteItem(requestURL.query.item);
			break;

		case "/move":
			console.log("move");
			move(requestURL.query.item, 0);
			break;
	}

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');
	res.end(dots.template({list: items}));
});

server.listen(port, hostname, () => {
	console.log('Server running at http://${hostname}:${port}/');
})
