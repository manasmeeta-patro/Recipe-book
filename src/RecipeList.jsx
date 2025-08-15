import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RecipeList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`${API_URL}/recipes`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error("Failed to load recipes:", err);
        alert("Error fetching recipes");
      }
    };
    fetchRecipes();
  }, [API_URL]);

  const filteredRecipes = recipes.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Recipes</h2>
      <input
        type="text"
        placeholder="Search recipe"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {filteredRecipes.map(r => (
          <div key={r.id}>
            <h3>{r.name}</h3>
            <img src={r.image} alt={r.name} width={200} />
            <p><Link to={`/recipes/${r.id}/edit`}>Edit</Link></p>
          </div>
        ))}
      </div>
    </div>
  );
}
