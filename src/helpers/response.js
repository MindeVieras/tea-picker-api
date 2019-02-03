
import HttpStatus from 'http-status'

/**
 * Fromatted JSON response.
 * @property {Func} res - Express App res.
 * @property {Object} data - Data for success response.
 * @property {Number} code - Http status code.
 * @returns {JsonResponse}
 */
export function jsonResponse(res, data, status = HttpStatus.OK) {

  const responseData = {
    status,
    message: HttpStatus[status],
    data
  }
  
  return res.status(status).send(responseData)
}
