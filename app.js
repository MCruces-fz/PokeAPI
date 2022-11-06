const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // req es la request
    // res es la response
    console.log(req);
    res.status(200).send('Hello World!');
});


// Añadir un pokemon al equipo
app.post('/team/pokemons', () => {
    res.status(200).send('Hello POST!');
});

// Consultar equipo
app.get('/team', (req, res) => {
    res.status(200).send('Hello GET!');
});

// Eliminar un pokemon del equipo
app.delete('/team/pokemons/:pokeid', () => {
    res.status(200).send('Hello DELETE!');
});

// Intercambiar el orden de nuestros pokemon
app.put('/team', () => {
    res.status(200).send('Hello PUT!');
});


app.listen(port, () => {
    console.log('Server started at port 3000.');
});

// Exportamos app para poder ofrecer este objeto a cualquier módulo externo
exports.app = app;