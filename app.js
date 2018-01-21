console.log('app setup');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
var mongoose = require('mongoose');
var app = express();
var	request = require('request');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('views/images'));

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
mongoose.connect('mongodb://client:shri@ds211088.mlab.com:11088/wmanagement');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('LOGGED | MongoDB Connected - ' + new Date());
});



var wasteSchema = mongoose.Schema({
	long: String,
	lat: String,
	// status: string,
	// Name: string,
	// password: string

});


var userSchema = mongoose.Schema({
	name: String,
	passwd: String,
	// status: string,
	// Name: string,
	// password: string

});

var user = mongoose.model('users', userSchema);
var dustBin = mongoose.model('garbagecoll', wasteSchema);

app.get('/',function(req,res){
	// var newCoodinates = new dustBin({
	// 						'lat': 13.092623, 
	// 						'long': 77.599909 
	// 					});
	// newCoodinates.save();
	// var new2 = new dustBin({
	// 						'lat': 13.792623, 
	// 						'long': 77.597909 
	// 					});
	// new2.save();
	res.render('home');
	console.log("in app");
});
app.post('/',function(req,res){
	var userName = req.body.name;
	var password = req.body.password;
	user.findOne({'user.name':userName},function(err,result){
		console.log(result);
	});



});
app.post('/register',function(req,res){
	var userName = req.body.name;
	var password = req.body.password;
	var userDetails= new user({
		'name':userName ,'passwd':password
	});
	userDetails.save();
	res.redirect('/');
});
app.get('/register',function(req,res){
	res.render('register');
})
app.get('/maps',function(req,res){
	dustBin.find(function(err,result){
	// dustBin.find(function(err,result){
	// 	var locations=result;
	// 	console.log(locations[0].lat);
	// 	res.render('maps',{'locations':locations});
	var locations=[];
		for(i=0;i<result.length;i++)
		{
			locations.push(result[i].lat);
			locations.push(result[i].long);
			
		}
console.log(locations);
		res.render('maps', {'locations':locations});
	
	 });
	});
	
app.get('/test',function(req,res){
// 	dustBin.find(function(err,result){
// 		// var locations=result;
// 		// console.log(locations[0].lat);
// 		// res.render('test',{'locations':locations});
// 		var locations=[];
// 		for(i=0;i<result.length;i++)
// 		{
// 			locations.push(result[i].lat);
// 			locations.push(result[i].long);
			
// 		}
// console.log(locations);
// 		res.render('test', {'locations':locations});
dustBin.find(function(err,result){
var locations=[];
		for(i=0;i<result.length;i++)
		{
			locations.push(result[i].lat);
			locations.push(result[i].long);
			
		}
console.log(locations);
		res.render('test1', {'locations':locations});
	
	 });
	});
	
	
app.listen(8081);