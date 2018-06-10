import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {FirestoreUtils} from './firestoreUtilities'
import {requireAuth} from './cloudFunctionUtilities'
import {asJS} from './translations'

admin.initializeApp(functions.config().firebase)

const db = new FirestoreUtils(admin.firestore())

export const placeBet = functions.https.onCall(
  requireAuth(
    async ({credits, teamId, fixtureId, leagueId}, {auth: {uid}}) => {
      const snapshot = await db.add(
        'bet',
        {
          userId: uid,
          credits,
          leagueId,
          fixtureId,
          teamId
        }
      )
      return asJS(snapshot)
    }
  )
)
