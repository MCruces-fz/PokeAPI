/*
    *  Suit de prueba e2e o de integración.
*/ 
const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('node:test');

chai.use(chaiHttp);

const app = require('../app').app;

describe('Suite de prueba e2e para el curso', () => {
    it('should return hello world', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                console.log('A')
                chai.assert.equal(res.text, 'Hello World!')
                // Esto es para enviar la señal de test terminado y que continúe ejecutando la parte B
                done();
            });
        console.log('B');
    });
});
