var express = require('express')
var request = require('request');

var app = express();
var router = express.Router();

let index_html = 'URL is required';

app.get('/', function(req, res) {
	// let url = 'https://t.co/eR2JEWlrAn';
	let url = req.query.url;
	let redirect = !!req.query.redirect;

	if (url) {
		request(url, function (error, response, body) {
		  	// console.log('statusCode:', response && response.statusCode);
		  	// console.log('URL:', response && response.request.uri.href);

		  	let result_url = response.request.uri.href;

		  	if (redirect) {
				res.redirect(301, result_url);
		  	} else {
				res.status(200).send(result_url);
			}
		});

		console.log('Requested: ', url);
	} else {
		res.status(200).send(index_html);
	}
});

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});