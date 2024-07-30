// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204W

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Middleware for exposing api endpoint
app.use('/api', function(req, res, next){
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get("/api/:date?", function (req, res, next){
  let targetDate = req.params.date;
  const otherDateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
  const unixRegex = /^\d+$/;
  let unix;
  let utc;
  if (unixRegex.test(targetDate) == true){
    targetDate = Number(targetDate);
  }

  const date = targetDate == null 
    ? new Date()
    : new Date(targetDate);

  if (isNaN(date)){
    console.log(Number(targetDate));
    res.json({
      error: 'Invalid Date'
    });
    //Check for unix time stamp before throwing error..
  } else {
    console.log(date);
    unix = date.getTime();
    utc = date.toUTCString();
    res.json({
      unix: `${unix}`,
      utc: `${utc}`
    });
  }

  
  //TODO: if in yyyy-mm-dd format, convert to readable format before submitting
  /*if (targetDate == null){
    const dummyDate = new Date('boacowejowrjwoeifjwifjoewjoijf');
    console.log(dummyDate);
    const date = new Date();
    res.json({
      unix: `${date.getTime()}`,
      utc: `${date.toUTCString()}`
    });
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
  }*/
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
