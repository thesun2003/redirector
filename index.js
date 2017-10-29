var express = require('express')
var request = require('request');

var app = express();
var router = express.Router();

let index_html = 'URL is required';

app.get('/', function(req, res) {
	// let url = 'https://t.co/eR2JEWlrAn';
	let url = req.query.url;

	if (url) {
		request(url, function (error, response, body) {
		  	// console.log('statusCode:', response && response.statusCode);
		  	// console.log('URL:', response && response.request.uri.href);
			res.status(200).send(response.request.uri.href);
		});

		console.log('Requested: ', url);
	} else {
		res.status(200).send(index_html);
	}
});

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});