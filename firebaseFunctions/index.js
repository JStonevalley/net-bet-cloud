import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import {FirestoreUtils} from './lib/firestoreUtilities'
import {requireAuth} from './lib/cloudFunctionUtilities'
import {asJS} from './lib/translations'

admin.initializeApp(functions.config().firebase)

const db = new FirestoreUtils(admin.firestore())

export const placeBet = functions.https.onCall(
  requireAuth(
    async ({credits, teamId, fixtureId, leagueId}, {auth: {uid}}) => {
      const betSnaps = await db.collection('bet')
        .where('userId', '==', uid)
        .get()
      const usedCredits = betSnaps.docs
        .map((bet) => bet.get('credits'))
        .reduce((sum, credits) => sum + credits, 0)
      const depositSnaps = await db.collection('deposit')
        .where('userId', '==', uid)
        .get()
      const depositedCredits = depositSnaps.docs
        .map((deposit) => deposit.get('credits'))
        .reduce((sum, credits) => sum + credits, 0)
      const availableCredits = depositedCredits - usedCredits
      console.log(depositedCredits, usedCredits, availableCredits)
      if (availableCredits < credits) throw new functions.https.HttpsError({credits: 'Unsufficient amount of credits'})
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
