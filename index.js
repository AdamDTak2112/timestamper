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
  res.sendFile(__dirname + '/public/index.html');
});

app.get("/api/:date?", function (req, res, next){
  const tempData = '2025-12-25';
  const targetDate = req.params.date;
  const otherDateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
 




  
  //TODO: if in yyyy-mm-dd format, convert to readable format before submitting
  if (targetDate == null){
    
  } else if (otherDateRegex.test(targetDate) == true){
    console.log(typeof req.params.date);
    const date = new Date(targetDate);
    console.log("FOUND NEW ROUTE");
    
    res.json({
      unix: `${date.getTime()}`,
      utc: `${date.toUTCString()}, `
    });
  } else {
    const unixTimestamp = Number(req.params.date);
    const date = new Date(unixTimestamp);
    res.json({
      unix: `${date.getTime()}`,
      utc: `${date.toUTCString()}`
    });
  }
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
