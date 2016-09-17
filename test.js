var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var ffmpeg = require('ffmpeg');
var end=0, start=0, duration=0;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.listen(3000, function(){
	console.log("Listening on port 3000...");
});


app.post('/myaction', function(req,res){
	    console.log("receiving data...");
	start = req.body.start;
	end = req.body.end;

	duration = end - start;

	start = parseFloat(start).toFixed();
	duration = parseFloat(duration).toFixed(0);

	console.log("start time: " + start);
	console.log("end time: " + end);
	console.log("duration: " + duration);
	console.log("Preparing Video...");
	try{
		var process = new ffmpeg('demo.webm');
		process.then(function (video) {
			video.setVideoStartTime(start);
			video.setVideoDuration(duration);
			video.addCommand('-threads', '8');
			video.addCommand('-y');
			video.save('sample.webm', function(error, file){
				if(!error)
				{
					console.log('Video file: ' + file);
					res.json({OK: true});
				}
			});
		}, function (err) {
			console.log('Error: ' + err);
			res.json({OK: true});
		});
	} catch (e) {
		console.log(e.code);
		console.log(e.msg);
	}
	
});