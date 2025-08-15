import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./RecipeDetails.css"; // Make sure to create this file

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  // for deploy environment variable
const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    fetch(`${API_URL}recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id,API_URL]);

  if (!recipe) {
    return <h2 className="loading">Loading recipe details...</h2>;
  }

  return (
    <div className="recipe-details-container">
      <h2 className="recipe-title">{recipe.name}</h2>
      <p><strong>Cuisine:</strong> {recipe.cuisine}</p>
      <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
      <p><strong>Cooking Time:</strong> {recipe.cookTime} minutes</p>
      <p><strong>Servings:</strong> {recipe.servings}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>🧂 {item}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p className="instructions">{recipe.instructions}</p>

      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}
