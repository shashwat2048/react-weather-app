function SearchBar({ search, onSearchChange, onSearchSubmit }) {
  return (
    <div className="flex items-center mb-4 z-10 max-w-sm w-full mx-auto text-black">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearchSubmit();
          }
        }}
        placeholder="Enter city name..."
        className="border p-2 mr-2 flex-1 rounded"
      />
      <button
        onClick={onSearchSubmit}
        className="bg-[#00C2D1] text-white p-2 rounded"
      >
        Search
      </button>
    </div>
  );
}
export default SearchBar