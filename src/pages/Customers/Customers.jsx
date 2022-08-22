import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { debounce } from 'lodash'

import { getCustomers, getCustomersCount } from '../../services/customers'

import {
  CustomerModalActions,
  CustomerModalConfirm,
  Pagination,
  SearchCustomer
} from '../../components'

const Customers = () => {
  const [isVisibleModalActions, setIsVisibleModalActions] = useState(false)
  const [isVisibleModalConfirm, setIsVisibleModalConfirm] = useState(false)
  const [customerId, setCustomerId] = useState(null)
  const [customerData, setCustomerData] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [fieldSearch, setFieldSearch] = useState('')

  const customersList = useLiveQuery(() => getCustomers({
    limit: 5,
    startsWith: fieldSearch
  }), [fieldSearch]) || []

  const customersCount = useLiveQuery(() => getCustomersCount()) || 0

  const handleOpenModalActions = () => {
    setIsVisibleModalActions(true)
  }

  const handleCloseModalActions = () => {
    setIsVisibleModalActions(false)
    setCustomerData(null)
  }

  const handleOpenModalConfirm = () => {
    setIsVisibleModalConfirm(true)
  }

  const handleCloseModalConfirm = () => {
    setIsVisibleModalConfirm(false)
    setCustomerId(null)
  }

  const updateCustomer = customer => {
    handleOpenModalActions()
    setCustomerData(customer)
  }

  const deleteCustomer = id => {
    handleOpenModalConfirm()
    setCustomerId(id)
  }

  const handleCurrentPage = page => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    setCurrentPage(prev => prev - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const handleSearch = debounce((value) => {
    setFieldSearch(value)
  }, 1000)

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center border-b-2 border-gray-100 py-6">
        <div className="flex justify-start lg:w-0 lg:flex-1">
          <h2 className="text-4xl tracking-tight font-bold text-gray-700">
            Customers
          </h2>
        </div>

        <button
          type="button"
          onClick={handleOpenModalActions}
          className="bg-violet-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Create new
        </button>
      </div>

      <SearchCustomer onChange={handleSearch} />

      <div className="mt-6 border border-gray-200 rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Id
              </th>

              <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of birth
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {customersList.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{customer.id}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{customer.firstName}</td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{customer.lastName}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{customer.email}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{customer.date}</td>
                <td className="px-4 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      className="bg-slate-200 border border-transparent rounded-md py-2 px-4 flex items-center justify-center font-medium text-slate-600 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
                      onClick={() => updateCustomer(customer)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="bg-rose-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                      onClick={() => deleteCustomer(customer.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          total={customersCount}
          currentPage={currentPage}
          onCurrent={handleCurrentPage}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
        />
      </div>

      <CustomerModalActions
        show={isVisibleModalActions}
        onClose={handleCloseModalActions}
        customerData={customerData}
      />

      <CustomerModalConfirm
        show={isVisibleModalConfirm}
        onClose={handleCloseModalConfirm}
        customerId={customerId}
      />
    </div>
  )
}

export default Customers
