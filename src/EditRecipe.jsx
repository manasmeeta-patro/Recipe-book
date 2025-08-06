import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Recipe not found");
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setImage(data.image);
        setIngredients(data.ingredients);
        setSteps(data.steps);
      })
      .catch((err) => {
        alert("Error loading recipe",err);
        navigate("/");
      });
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      name,
      image,
      ingredients,
      steps,
    };

    const res = await fetch(`http://localhost:3000/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    });

    if (res.ok) {
      alert("Recipe updated!");
      navigate(`/recipes/${id}`); // or wherever you list recipes
    } else {
      alert("Update failed");
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Edit Recipe</h2>
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

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}
