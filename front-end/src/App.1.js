import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // setup state
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const fetchRecipes = async() => {
    try {      
      const response = await axios.get("/api/recipes");
      setRecipes(response.data.recipes);
    } catch(error) {
      setError("error retrieving recipes: " + error);
    }
  }
  
  const createRecipe = async() => {
    try {
      await axios.post("/api/recipes", {name: name, ingredients: ingredients});
    } catch(error) {
      setError("error adding a recipe: " + error);
    }
  }
  
  const deleteOneRecipe = async(recipe) => {
    try {
      await axios.delete("/api/recipes/" + recipe.id);
    } catch(error) {
      setError("error deleting a recipe" + error);
    }
  }
  
  const addIngredient = async(recipe) => {
    try {
      await axios.delete("/api/recipes/" + recipe.id);
    } catch(error) {
      setError("error adding an ingredient" + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    fetchRecipes();
  },[]);

  const addRecipe = async(e) => {
    e.preventDefault();
    await createRecipe();
    fetchRecipes();
    setName("");
    setIngredients("");
  }

  const deleteRecipe = async(recipe) => {
    await deleteOneRecipe(recipe);
    fetchRecipes();
  }

  // render results
  return (
    <div className="App">
      {error}
      <h1>Add a Recipe</h1>
      <form onSubmit={addRecipe}>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Ingredient:
            <textarea value={ingredients} onChange={e=>setIngredients(e.target.value)}></textarea>
            <button onClick={e => setIngredients(e)}>Add Ingredient</button>
          </label>
        </div>
        <input type="submit" value="SubmitRecipe" />
      </form>
      <h1>Recipes</h1>
      {recipes.map( recipe => (
        <div key={recipe.id} className="recipe">
          <div className="ingredient">
            <p>{recipe.ingredients}</p>
            <p><i>-- {recipe.name}</i></p>
          </div>
          <button onClick={e => deleteRecipe(recipe)}>Delete</button>
        </div>
      ))}
      
    </div>
  );
}

export default App;