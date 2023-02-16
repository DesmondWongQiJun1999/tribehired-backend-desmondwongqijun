const express = require('express');
const routes = require('./routes/routes');


const app = express();

app.use('/api', routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})