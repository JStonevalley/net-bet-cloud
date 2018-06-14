import * as functions from 'firebase-functions'
import {db} from './lib/firestoreUtilities'
import {requireAuth} from './lib/cloudFunctionUtilities'
import {asJS} from './lib/translations'
import {getAvailableCredits} from './lib/credits'

export const placeBet = functions.https.onCall(
  requireAuth(
    async ({credits, teamId, fixtureId, leagueId}, {auth: {uid}}) => {
      const availableCredits = await getAvailableCredits(uid)
      console.log(availableCredits, credits)
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

export const availableCredits = functions.https.onCall(
  requireAuth(
    async (_, {auth: {uid}}) => {
      const availableCredits = await getAvailableCredits(uid)
      return availableCredits
    }
  )
)
