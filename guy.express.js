const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

var dots = require('dot').process({path: ".", templateSettings: {strip: false}});

const uuidv1 = require('uuid/v1');
const arrayMove = require('array-move');

var items = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.set('Content-Type', 'text/html');
	res.send(dots.template_express({list: items}));
});

app.get('/api/', (req, res) => {
	res.json(items);
});

app.post('/api/item', (req, res) => {
	console.log(req.body);
	items.push({
		id: uuidv1(),
		title: req.body.title
	});
	res.json(items);
});

app.post('/api/move', (req, res) => {
	var idIndex = items.findIndex((el) => {
		if (el.id === req.body.id) {
			return true;
		}
	});
	if (idIndex == -1)
	{
		res.status(404);
		res.json({"error": "cannot find id"});
		return;
	}

	arrayMove.mut(items, idIndex, req.body.position);
	res.json(items);
});

app.post('/api/delete', (req, res) => {
	var idIndex = items.findIndex((el) => {
		if (el.id === req.body.id) {
			return true;
		}
	});
	items.splice(idIndex, 1);
	res.json(items);
});


app.listen(port, () => console.log('Listening...'));