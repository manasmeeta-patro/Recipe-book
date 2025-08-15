import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`${API_URL}/recipes/${id}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setName(data.name);
        setImage(data.image);
        setIngredients(data.ingredients);
        setSteps(data.steps);
      } catch (err) {
        console.error("Failed to load recipe:", err);
        alert("Error loading recipe");
        navigate("/recipes");
      }
    };
    fetchRecipe();
  }, [id, navigate, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/recipes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image, ingredients, steps })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      alert("Recipe updated!");
      navigate("/recipes");
    } catch (err) {
      console.error("Failed to update recipe:", err);
      alert("Error updating recipe");
    }
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" required value={name} onChange={e => setName(e.target.value)} />
        <input type="text" required value={image} onChange={e => setImage(e.target.value)} />
        <textarea required value={ingredients} onChange={e => setIngredients(e.target.value)} />
        <textarea required value={steps} onChange={e => setSteps(e.target.value)} />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}
