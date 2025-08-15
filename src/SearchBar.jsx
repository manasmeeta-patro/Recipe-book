export default function SearchBar({ searchTerm, onSearch, onButtonClick }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={searchTerm}
        placeholder="Search recipes..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: "8px", width: "250px", marginRight: "10px" }}
      />
      <button onClick={onButtonClick} style={{ padding: "8px 12px" }}>
        🔍 Search
      </button>
    </div>
  );
}
 