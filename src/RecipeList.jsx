import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  // ✅ Always filter based on current searchTerm (live)
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Optional: Search button functionality (can be used for analytics, etc.)
  const handleButtonClick = () => {
    console.log("Search button clicked with:", searchTerm);
    // You can even add category/ingredient-based logic here later
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Recipes</h2>

      <SearchBar
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        onButtonClick={handleButtonClick}
      />

      {filteredRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            style={{
              border: "1px solid gray",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{recipe.name}</h3>
            <img src={recipe.image} alt={recipe.name} width={150} />
            <p>{recipe.ingredients}</p>
            <Link to={`/recipe/${recipe.id}`}>👀 View Details</Link>
          </div>
        ))
      )}

      <div style={{ marginTop: "30px" }}>
        <Link
          to="/add"
          style={{
            display: "inline-block",
            padding: "10px 15px",
            backgroundColor: "#28a745",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          ➕ Add New Recipe
        </Link>
      </div>
    </div>
  );
}
