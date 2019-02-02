
import HttpStatus from 'http-status'
import request from 'supertest'
import chai from 'chai'

import app from '../src/index'

const expect = chai.expect
chai.config.includeStack = true

describe('## Member APIs', () => {
  let member = {
    name: 'Test User',
    email: 'test@test.com'
  }

  describe('# POST /api/members', () => {
    it('should create new member', (done) => {
      request(app)
        .post('/api/members')
        .send(member)
        .expect(HttpStatus.CREATED)
        .then((res) => {
          expect(res.body.data.name).to.equal(member.name)
          expect(res.body.data.email).to.equal(member.email)
          member = res.body.data
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/members', () => {
    it('should get all members', (done) => {
      request(app)
        .get('/api/members')
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.an('array')
          done()
        })
        .catch(done)
    })
  })

  describe('# GET /api/members/:id', () => {
    it('should get member', (done) => {
      request(app)
        .get(`/api/members/${member._id}`)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data.name).to.equal(member.name)
          expect(res.body.data.email).to.equal(member.email)
          done()
        })
        .catch(done)
    })

    it('should report error message Member not found if member not found', (done) => {
      request(app)
        .get('/api/members/5c538aad126ee208db68b68a')
        .expect(HttpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Member not found')
          done()
        })
        .catch(done)
    })
  })

  describe('# PUT /api/members/:id', () => {
    it('should update member details', (done) => {
      member.name = 'TU'
      request(app)
        .put(`/api/members/${member._id}`)
        .send(member)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data.name).to.equal('TU')
          expect(res.body.data.email).to.equal(member.email)
          done()
        })
        .catch(done)
    })
  })

  describe('# DELETE /api/members', () => {
    it('should delete member', (done) => {
      request(app)
        .delete(`/api/members/${member._id}`)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data.name).to.equal('TU')
          expect(res.body.data.email).to.equal(member.email)
          done()
        })
        .catch(done)
    })
  })

})
