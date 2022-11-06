const uuid = require('uuid');
const crypto = require('../crypto.js');

const userDataBase = {
    '0001' : {
        'password': '',
        'salt': '',
        'userName': ''
    }
};

const registerUser = (userName, password) => {
    crypto.hashPassword(password, (err, result) => {
        // Guardar en la base de datos nuestro usuario
        usersDataBase[uuid.v4()] = {
            userName: userName,
            password: crypto.hashPassword(password)
        }
    });
};

const checkUserCredentials = (userId, password) => {
    // Comprobar que las credenciales son correctas
    let user = userDataBase[userId];
    crypto.comparePassword(password, user.password, done);
};
