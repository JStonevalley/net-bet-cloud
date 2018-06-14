import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
admin.initializeApp(functions.config().firebase)

const FirestoreUtils = class {
  constructor (db) {
    this.db = db
    /**
    * add object to collection
    */
    this.add = async (collection, data) => {
      const docRef = await this.db.collection(collection).add(data)
      return docRef.get()
    }

    this.collection = this.db.collection
  }
}

export const db = new FirestoreUtils(admin.firestore())
