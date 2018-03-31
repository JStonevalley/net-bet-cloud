import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {FirestoreUtils} from './firestoreUtilities'
import {asJS} from './translations'

admin.initializeApp(functions.config().firebase)

const db = new FirestoreUtils(admin.firestore())

export const createUser = functions.https.onRequest(async ({body: {firstName, lastName}}, response) => {
  try {
    const snapshot = await db.add(
      'user',
      {
        firstName,
        lastName
      }
    )
    response.json(asJS(snapshot))
  } catch (error) {
    response.status(500).json({error})
  }
  return
})
