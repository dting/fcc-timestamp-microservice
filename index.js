var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

app.get('/', function(req, res) {
    res.send("FCC Timestamp Microservice");
});

app.get('/:t', function(req, res) {
    if (req.url === '/favicon.ico') return;
    var result = {"unix": null, "natural": null};
    if (req.params.t) {
        var decoded = decodeURI(req.params.t);
        if (!isNaN(decoded)) {
            decoded = +decoded * 1000;
        }
        var parsed = new Date(decoded);
        if (!isNaN(parsed.valueOf())) {
            result.unix = parsed.valueOf() / 1000 | 0;
            result.natural =
                monthNames[parsed.getUTCMonth()] + " " +
                parsed.getUTCDate() + ", " +
                parsed.getUTCFullYear();
        }
    }
    res.json(result);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
