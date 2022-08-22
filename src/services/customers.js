import { db } from './db'

const getCustomers = async ({ limit }) => {
  try {
    const response = await db.customers
      .limit(limit)
      .toArray()

    return response
  } catch (err) {
    console.error(err)
  }
}

const createCustomer = async data => {
  try {
    await db.customers.add(data)
  } catch (err) {
    console.error(err)
  }
}

const updateCustomer = async (id, data) => {
  try {
    await db.customers.update(id, data)
  } catch (err) {
    console.error(err)
  }
}

const deleteCustomer = async id => {
  try {
    await db.customers.delete(id)
  } catch (err) {
    console.error(err)
  }
}

export {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
