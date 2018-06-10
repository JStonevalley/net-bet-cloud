import {https} from 'firebase-functions'
export const requireAuth = (handler) => (data, context) => {
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new https.HttpsError('failed-precondition', 'The function must be called ' +
        'while authenticated.')
  }
  return handler(data, context)
}
