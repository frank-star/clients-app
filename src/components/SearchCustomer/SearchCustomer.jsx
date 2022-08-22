const SearchCustomer = ({ onChange }) => (
  <div className="mt-4">
    <input
      type="text"
      className="focus:ring-violet-500 focus:border-violet-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      placeholder='Search...'
      onChange={e => onChange(e.target.value)}
    />
  </div>
)

export default SearchCustomer
