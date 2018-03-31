import {firestore} from 'firebase-admin'
import {Response} from 'firebase-functions'

export const asJS = (snapshot: firestore.DocumentSnapshot): object => ({...snapshot.data(), id: snapshot.id})
