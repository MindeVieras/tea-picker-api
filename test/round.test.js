
import HttpStatus from 'http-status'
import request from 'supertest'
import chai from 'chai'

import app from '../src/index'

const expect = chai.expect
chai.config.includeStack = true

describe('## Round APIs', () => {
  let round = {
    participants: ['Minde V', 'John B', 'Tom E']
  }

  describe('# POST /api/rounds/picker', () => {
    it('should pick random tea maker', (done) => {
      request(app)
        .post('/api/rounds/picker')
        .send(round)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data.makerName).to.be.a('string')
          expect(res.body.data.participants).to.be.an('array')
          round = res.body.data
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/rounds', () => {
    it('should get all rounds', (done) => {
      request(app)
        .get('/api/rounds')
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.an('array')
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/rounds/:id', () => {
    it('should get a round', (done) => {
      request(app)
        .get(`/api/rounds/${round._id}`)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data.makerName).to.equal(round.makerName)
          expect(res.body.data.participants).to.be.an('array')
          done()
        })
        .catch(done)
    })

    it('should report error message Round not found if round not found', (done) => {
      request(app)
        .get('/api/rounds/5c538aad126ee208db68b68a')
        .expect(HttpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Round not found')
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/rounds', () => {
    it('should delete round', (done) => {
      request(app)
        .delete(`/api/rounds/${round._id}`)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data.makerName).to.equal(round.makerName)
          expect(res.body.data.participants).to.be.an('array')
          done()
        })
        .catch(done)
    })
  })

})
