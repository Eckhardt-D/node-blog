const mongoose = require('mongoose');

// Connect Database
mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
.then(_ => console.log('Database connection established'))
.catch(err => console.log('Database connection failed', '=>', err));

module.exports = mongoose;