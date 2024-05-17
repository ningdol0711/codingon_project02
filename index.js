const express = require('express');
const app = express();
const router = require('./routes/Mainroute');
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/style', express.static('./static/style'));
app.use('/src', express.static('./src'));
app.use('/img', express.static('./img'));

app.use('/', router);
app.use('/circuits', router);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
})