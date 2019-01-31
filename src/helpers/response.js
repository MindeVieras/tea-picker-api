
import HttpStatus from 'http-status'

export function jsonResponse(res, data, status = HttpStatus.OK) {

  const responseData = {
    status,
    message: HttpStatus[status],
    data
  }
  
  return res.status(status).send(responseData)
}
