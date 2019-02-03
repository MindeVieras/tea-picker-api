
import HttpStatus from 'http-status'

/**
 * @extends Error
 */
class ErrorWrapper extends Error {
  constructor(message, status) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    this.status = status
    Error.captureStackTrace(this, this.constructor.name)
  }
}

/**
 * API error Class.
 * @extends ErrorWrapper
 */
class APIError extends ErrorWrapper {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor(message, status = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status)

    // if first paramater object - set as input errors
    if (typeof message === 'object') {
      this.message = 'Input error'
      this.status = HttpStatus.UNPROCESSABLE_ENTITY
      this.errors = message
    }
  }
}

export default APIError
