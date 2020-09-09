const express = require('express');
const app = express();
app.use(express.json());

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.listen(4000,()=>console.log('App running at localhost:4000'));