const bcrypt = require('bcrypt');

const hashPassword = (plainTextPwd, done) => {
    // Se toma la función hash de la documentación de crypt
    bcrypt.hash(plainTextPwd, 10, function(err, hash) {
        done(err, hash);
    });
    /* Nota: Es equivalente a hacer
        bcrypt.hash(plainTextPwd, 10, done);
    porque devuelve directamente los parámetros.
    */
};

const comparePassword = (plainPassword, hashPassword, done) => {
    // Se toma compare de la documentación de crypto
    bcrypt.compare(plainPassword, hashPassword, done);
};