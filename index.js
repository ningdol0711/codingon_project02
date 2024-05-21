const express = require('express');
const app = express();
const router = require('./routes/Mainroute');
const bodyParser = require('body-parser');
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/style', express.static('./static/style'));
app.use('/scripts', express.static('./static/scripts'));
app.use('/src', express.static('./src'));
app.use('/img', express.static('./img'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/', router);
app.use('/circuits', router);
app.use('/circuit', router);
app.use('/api', router);
app.use('/teams', router);
app.use('/team&?', router);
app.use('/driver&?', router);
app.use('/mypage&?', router);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
})