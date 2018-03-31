import {firestore} from 'firebase-admin'

export const FirestoreUtils = class {
  private db: firestore.Firestore
  constructor (db: firestore.Firestore) {
    this.db = db
  }

  /**
   * add object to collection
   */
  public async add(collection: string, data: object) {
    const docRef = await this.db.collection(collection).add(data)
    return await docRef.get()
  }
}