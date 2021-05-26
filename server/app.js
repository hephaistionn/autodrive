const express = require('express');
const path = require('path');
const config = require('./config');
const app = express();

app.set('view engine', config.viewEngine);
app.set('views', config.viewsDirectory);

app.use('/', express.static(path.normalize('.dist')));
app.use('/assets', express.static(path.normalize('client/assets')));
app.get('/', function(req, res) {
  res.render('index.ejs', {});
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Server listening on port '+port);
});
