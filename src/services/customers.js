import { db } from './db'

const getCustomers = async ({ limit, startsWith }) => {
  try {
    const response = await db.customers
      .where('firstName')
      .startsWith(startsWith)
      .limit(limit)
      .toArray()

    return response
  } catch (err) {
    console.error(err)
  }
}

const getCustomersCount = async () => {
  try {
    const response = await db.customers.count()

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
  getCustomersCount,
  createCustomer,
  updateCustomer,
  deleteCustomer
}
