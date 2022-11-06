const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: 'secretPassword' // TODO Debería estar en una variable de entorno
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        return done(null, decoded); // devolver el callback con null si hay error y el usuario (decodificado)
    }));
}