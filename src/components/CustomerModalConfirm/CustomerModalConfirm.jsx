import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { deleteCustomer } from '../../services/customers'

const CustomerModalConfirm = ({ show, onClose, customerId }) => {
  const handleDeleteCustomer = () => {
    if (customerId) {
      deleteCustomer(customerId)
    }

    onClose()
  }

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
                <Dialog.Title as="h3" className="text-center text-2xl tracking-tight font-bold text-gray-900">
                  Are you sure you want to delete the customer?
                </Dialog.Title>

                <div className="mt-6 flex items-center justify-end gap-2">
                  <button
                    className="w-full bg-rose-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    onClick={handleDeleteCustomer}
                  >
                    Yes, delete
                  </button>

                  <button
                    type="button"
                    className="w-full bg-slate-200 border border-transparent rounded-md py-3 px-8 flex items-center justify-center font-medium text-slate-600 hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300"
                    onClick={onClose}
                  >
                    No
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

export default CustomerModalConfirm
