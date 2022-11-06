const express = require('express');
const passport = require('passport');
require('./auth')(passport); // funcion passport de auth.js exportada

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // req es la request
    // res es la response
    // console.log(req);
    res.status(200).send('Hello World!');
});

// Añadir un token al login
app.post('/login', (req, res) => {
    /* 
    Comprobamos las credenciales del usuario
     - Si no son válidas, error
     - Si son válidas, generamos un JWT y lo devolvemos.
    */
    res.status(200).json( // body
        {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.zX5MPQtbjoNAS7rpsx_hI7gqGIlXOQq758dIqyBVxxY'}
    )
});

// Añadir un pokemon al equipo
app.post('/team/pokemons', () => {
    res.status(200).send('Hello POST!');
});

// Consultar equipo
app.get('/team', // ENDPOINT
    passport.authenticate('jwt', {session: false}), // MIDDLEWAREs de la librería para autenticar
    (req, res) => { // HANDLER
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