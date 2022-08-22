import Dexie from 'dexie'

const db = new Dexie('CustomersDB');

db.version(1).stores(
  { customers: "++id,firstName,lastName,email,date" }
)

export {
  db
}
