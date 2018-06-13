export const FirestoreUtils = class {
  constructor (db) {
    this.db = db
    /**
    * add object to collection
    */
    this.add = async (collection, data) => {
      const docRef = await this.db.collection(collection).add(data)
      return docRef.get()
    }
  }
}
