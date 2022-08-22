const Customers = () => {
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
          className="bg-violet-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        >
          Create new
        </button>
      </div>
    </div>
  )
}

export default Customers
