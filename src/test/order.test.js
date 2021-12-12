import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../index.js'

chai.should()

chai.use(chaiHttp)

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtlbnNlbGFzaWVAZ21haWwuY29tIiwidXNlcl9pZCI6IjYxYjUzOGJlMGRmYjg4MjFkOTA4ZWJjZiIsImlhdCI6MTYzOTM0NTYxNiwiZXhwIjoxNjM5MzgxNjE2fQ.Zt6yJ6rbCkk-tPZfpEuueKz3RpwNfxvHpjZLgqqdm3w"
const order = {
    menu_id: "61b551563eabe49651f30208",
    quantity: "100"
}

describe('Orders API', () => {

    describe("GET /api/order", () => {
        it('It should get all the pizza orders', (done) => {
            
            chai.request(server)
                .get(`/api/order`)
                .auth(token, {type: 'bearer'})
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })

        })
    })

    describe("POST /api/order", () => {
        it('Should add an order', (done) => {
            chai.request(server)
                .post('/api/order')
                .send(order)
                .auth(token, {type: 'bearer'})
                .end((err, response) => {
                    response.should.have.status(201)
                    response.body.should.be.a('object')
                    response.body.should.have.property('receiptSent')
                    response.body.should.have.property('order')
                    done()
                })

        })
    })

})