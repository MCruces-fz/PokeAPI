const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // req es la request
    // res es la response
    console.log(req);
    res.status(200).send('Hello World!');
});

app.listen(port, () => {
    console.log('Server started at port 3000.');
});