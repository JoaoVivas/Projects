const express = require('express');
const app = express();
app.listen(5000);
console.log('Listening on 5000');
app.use(express.static('public'));