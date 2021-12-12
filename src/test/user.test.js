import chai from 'chai'
import chaiHttp from 'chai-http'
import server from '../index.js'

chai.should()

chai.use(chaiHttp)

describe('Users API', () => {


    describe("GET /api/user", () => {
        it('It should get all the users', (done) => {
            chai.request(server)
                .get('/api/user')
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })

        })
    })

    describe("GET /api/user/:id", () => {
        it('It should get user by ID', (done) => {
            const user_id = '61b538be0dfb8821d908ebcf'
            chai.request(server)
                .get(`/api/user/${user_id}`)
                .end((err, response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object')
                    response.body.should.have.property('message')
                    response.body.should.have.property('data')
                    done()
                })

        })
    })


})