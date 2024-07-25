// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

function getTimeStamp(req, res) {
  const date = new Date();
  console.log(date.toString());  
}

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Middleware for exposing api endpoint
app.use('/api', function(req, res, next){
  console.log('reached API endpoint');
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function (req, res, next){
  const unixTimestamp = Number(req.params.date);
  
  const date = new Date(unixTimestamp);

  res.json({
    unix: `${req.params.date}`,
    utc: `${date.toUTCString()}`
  });
  next();
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
let listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
