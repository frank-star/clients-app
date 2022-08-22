import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

const Pagination = ({
  total,
  perPage = 5,
  currentPage,
  onCurrent,
  onPrev,
  onNext
}) => {
  const pages = Array.from({ length: Math.ceil(total / perPage) }, (_, index) => index + 1)

  return (
    <div className="flex justify-center pt-6 pb-6 border-t-2 border-gray-100">
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={onPrev}
          disabled={currentPage === pages[0]}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        {pages.map(page => (
          <button
            key={page}
            type="button"
            className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            onClick={() => onCurrent(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          onClick={onNext}
          disabled={currentPage === pages[pages.length-1]}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </nav>
    </div>
  )
}

export default Pagination
