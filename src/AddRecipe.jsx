import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image, ingredients, steps })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Recipe added successfully!");
      navigate("/recipes");
    } catch (err) {
      console.error("Failed to add recipe:", err);
      alert("Error adding recipe");
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" required placeholder="Recipe Name" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" required placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
        <textarea required placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
        <textarea required placeholder="Steps" value={steps} onChange={e => setSteps(e.target.value)} />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
