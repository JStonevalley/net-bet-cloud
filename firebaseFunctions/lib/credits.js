import {db} from './firestoreUtilities'

export const getAvailableCredits = async (userId) => {
  const betSnaps = await db.collection('bet')
    .where('userId', '==', userId)
    .get()
  const usedCredits = betSnaps.docs
    .map((bet) => bet.get('credits'))
    .reduce((sum, credits) => sum + credits, 0)
  const depositSnaps = await db.collection('deposit')
    .where('userId', '==', userId)
    .get()
  const depositedCredits = depositSnaps.docs
    .map((deposit) => deposit.get('credits'))
    .reduce((sum, credits) => sum + credits, 0)
  return depositedCredits - usedCredits
}
