const http = require('http');
const { parse } = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

var dots = require('dot').process({path: "."});

var items = [];

const server = http.createServer((req, res) => {

	if (req.method == 'POST')
	{
		let body = ' ';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			items.push(parse(body)[' item'].toString());
		});
		res.writeHead(302, {
			'Location': '/'
		});
		res.end();
	}
	else
	{
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(dots.template({list: items}));
	}
});

server.listen(port, hostname, () => {
	console.log('Server running at http://${hostname}:${port}/');
})
