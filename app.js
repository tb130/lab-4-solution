const express = require('express');

let myCards = [
	{
		id: 4,
		name: "Alex Rodriguez",
		rookie: "2006",
		price: 10,
		promoPrice: 5
	},
	{
		id: 7,
		name: "Aaron Judge",
		rookie: "2017",
		price: 4,
		promoPrice: 2
	}
];

let app = express();

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// Home endpoint
app.get('/', function(req, res) {
	res.render('home', {
		cards: myCards,
		numCards: myCards.length,
		onSale: req.query.code === 'cardfan'
	});
});

// Detail endpoint
app.get('/detail/:id', function(req, res) {
	
	// Go get the card from the data store
	const thisCard = myCards.find( card => {
		return card.id.toString() === req.params.id;
	});

	// Render the card info
	res.render('detail', {
		card: thisCard,
		onSale: req.query.code === 'cardfan'
	});
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
