import { db } from './db'

const createCustomer = async data => {
  try {
    await db.customers.add(data)
  } catch (err) {
    console.err(err)
  }
}

const updateCustomer = async (id, data) => {
  try {
    await db.customers.update(id, data)
  } catch (err) {
    console.err(err)
  }
}

const deleteCustomer = async id => {
  try {
    await db.customers.delete(id)
  } catch (err) {
    console.err(err)
  }
}

export {
  createCustomer,
  updateCustomer,
  deleteCustomer
}
