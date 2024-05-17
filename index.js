const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/style', express.static('./static/style'));
app.use('/src', express.static('./src'));
app.use('/img', express.static('./img'));

app.get('/', (req, res) => {
  res.render('index', {title: 'Main'});
})

app.get('/teams', (req, res) => {
  res.render('teams', {title: 'Teams'});
})

app.get('/circuits', (req, res) => {
  res.render('circuits', {title: 'Circuits'});
})

app.get('/schedule', (req, res) => {
  res.render('schedule', {title: 'Schedule'});
})

app.get('/social', (req, res) => {
  res.render('social', {title: 'Social'});
})

app.get('/circuit', (req, res) => {
  res.render('circuit', {title: 'Circuit'});
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
})