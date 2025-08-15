import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      name,
      image,
      ingredients,
      steps,
    };

    const res = await fetch("http://localhost:3000/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    });

    if (res.ok) {
      alert("Recipe added successfully!");
      navigate("/recipes"); // navigate to recipe list page (adjust as needed)
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipe Name: </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Image URL: </label>
          <input
            type="text"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div>
          <label>Ingredients: </label>
          <textarea
            required
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <div>
          <label>Steps: </label>
          <textarea
            required
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />
        </div>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}
