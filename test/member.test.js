
const request = require('supertest-as-promised')
const HttpStatus = require('http-status')
const chai = require('chai')
const expect = chai.expect
const app = require('../src/index')

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

    it('should report error with message - Not found, when member does not exists', (done) => {
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
      member.name = 'KK'
      request(app)
        .put(`/api/members/${member._id}`)
        .send(member)
        .expect(HttpStatus.OK)
        .then((res) => {
          expect(res.body.data.name).to.equal('KK')
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
          expect(res.body.data.name).to.equal('KK')
          expect(res.body.data.email).to.equal(member.email)
          done()
        })
        .catch(done)
    })
  })

})
