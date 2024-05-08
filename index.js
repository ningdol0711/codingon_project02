const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/style', express.static('./static/style'));

app.get('/', (req, res) => {
  res.render('index');
})

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}...`);
})