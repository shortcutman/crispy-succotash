const uuidv1 = require('uuid/v1');
const arrayMove = require('array-move');
const express = require('express');
const expresssse = require('express-sse');

const app = express();
const port = process.env.PORT || 3000;

var items = [];

app.use(express.json());
app.use('/templates/', express.static('/templates/'));

app.get('/', (req, res) => {
	res.sendFile( __dirname + '/index.html');
});

app.get('/api/', (req, res) => {
	res.json(items);
});

app.post('/api/item', (req, res) => {
	items.push({
		id: uuidv1(),
		title: req.body.title
	});
	res.json(items);
	stream.send(items);
});

app.post('/api/move', (req, res) => {
	var idIndex = items.findIndex((el) => {
		if (el.id === req.body.id) {
			return true;
		}
		return false;
	});
	if (idIndex == -1)
	{
		res.status(404);
		res.json({"error": "cannot find id"});
		return;
	}

	arrayMove.mut(items, idIndex, req.body.position);
	res.json(items);
	stream.send(items);
});

app.post('/api/delete', (req, res) => {
	var idIndex = items.findIndex((el) => {
		if (el.id === req.body.id) {
			return true;
		}
		return false;
	});

	items.splice(idIndex, 1);
	res.json(items);
	stream.send(items);
});

var stream = new expresssse();
app.get('/api/update', stream.init);


app.listen(port, () => console.log('Listening...'));