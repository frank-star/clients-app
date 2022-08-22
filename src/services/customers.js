import { db } from './db'

const getCustomers = async ({ limit, filter, currentPage }) => {
  try {
    const response = await db.customers
      .filter((item) => item.firstName.indexOf(filter) !== -1)
      .offset(limit * currentPage - limit)
      .limit(limit)
      .toArray()

    return response
  } catch (err) {
    console.error(err)
  }
}

const getCustomersCount = async ({ filter }) => {
  try {
    const response = await db.customers
      .filter((item) => item.firstName.indexOf(filter) !== -1)
      .count()

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
