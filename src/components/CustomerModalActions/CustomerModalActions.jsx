import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { createCustomer, updateCustomer } from '../../services/customers'
import { validator } from '../../helpers'

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  date: ''
}

const formValidate = (name, value) => {
  if (name === 'firstName' || name === 'lastName') {
    return validator.validateFieldText(value)
  } else if (name === 'email') {
    return validator.validateFieldEmail(value)
  }

  return false
}

const CustomerModalActions = ({ show, onClose, customerData }) => {
  const [formData, setFormData] = useState({ ...initialFormData })
  const [formErrors, setFormErrors] = useState([])

  useEffect(() => {
    if (customerData) {
      setFormData(customerData)
    }
  }, [customerData])

  const handleFormData = (e) => {
    const { name, value } = e.target
    const isError = formValidate(name, value)
    const isInclude = formErrors.includes(name)

    if (!isError && isInclude) {
      setFormErrors(formErrors.filter(field => field !== name))
    }

    if (isError && !isInclude) {
      setFormErrors([...formErrors, name])
    }

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const actionCustomer = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.date) {
      return
    }

    if (!formErrors.length) {
      if (formData.id) {
        updateCustomer(formData.id, formData)
      } else {
        createCustomer(formData)
      }

      setFormData({ ...initialFormData })
      onClose()
    }
  }

  const isFieldError = name => formErrors.includes(name)

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h2" className="text-center text-3xl tracking-tight font-bold text-gray-900">
                  {formData.id ? 'Update' : 'New'} customer
                </Dialog.Title>

                <div className="mt-3">
                  <div className="py-2 pb-2">
                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      First name <span className="text-sm text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      id="first-name"
                      className="mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleFormData}
                      value={formData.firstName}
                    />

                    {isFieldError('firstName') && (
                      <p className="text-sm text-red-600">
                        Contains special characters. The maximum length is 40 characters
                      </p>)}
                  </div>

                  <div className="py-2 pb-2">
                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                      Last name <span className="text-sm text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      id="last-name"
                      className="mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleFormData}
                      value={formData.lastName}
                    />

                    {isFieldError('lastName') && (
                      <p className="text-sm text-red-600">
                        Contains special characters. The maximum length is 40 characters
                      </p>)}
                  </div>

                  <div className="py-2 pb-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address <span className="text-sm text-red-600">*</span>
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleFormData}
                      value={formData.email}
                    />

                    {isFieldError('email') && (
                      <p className="text-sm text-red-600">
                        Not valid email. The maximum length is 255 characters
                      </p>)}
                  </div>

                  <div className="py-2 pb-2">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date of birth <span className="text-sm text-red-600">*</span>
                    </label>

                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="mt-1 focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      onChange={handleFormData}
                      value={formData.date}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="mt-4 w-full bg-violet-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                    onClick={actionCustomer}
                  >
                    Send
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomerModalActions
