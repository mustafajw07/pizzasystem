const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

require("./routes/web")(app);

app.listen(PORT, () => console.log('Server Started'));