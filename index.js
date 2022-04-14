const express = require('express');
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

// set template engine
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// database connection
main().catch(err => console.log("Connection failed",err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/pizza');
}

// server
require("./routes/web")(app);

// PORT
app.listen(PORT, () => console.log('Server Started'));