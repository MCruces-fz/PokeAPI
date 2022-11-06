const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de pruebas auth', () => {
    it('should return 401 when no jwt token available.', (done) => {
        // Cuando no tiene correctamente la llave
        chai.request(app)
            .get('/team')
            .end((err, res) => {
                chai.assert.equal(res.statusCode, 401);
                done();
            });
    });
    it('should return 200 when jwt token is valid.', (done) => {
        // Cuando tiene la llave correcta
        chai.request(app)
            .post('/login')
            .end((err, res) => {
                chai.request(app)
                    .get('/team')
                    .set('Authorization', `JWT ${res.body.token}` /*JWT token*/)
                    .end((err, res) => {
                        chai.assert.equal(res.statusCode, 200);
                        done();
                    });
            });
    });
    /*
    it('should return 403', (done) => {
        // Cuando no tiene autorización
        done();
    });
    */
});