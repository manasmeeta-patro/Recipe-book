import { Routes, Route } from "react-router-dom";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
import AddRecipe from "./AddRecipe";
import EditRecipe from "./EditRecipe";
import PageNotFound from "./PageNotFound";

export default function App() {
  return (
    <div className="App">
      <h1 style={{textAlign:'center'}}>🍲 Recipe Book</h1>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/edit/:id" element={<EditRecipe />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
