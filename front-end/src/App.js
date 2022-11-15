import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Layout from './pages/Layout';
import ShoppingList from './pages/ShoppingList';

function App() {
  // setup state
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [ingredientName, setIngredientN] = useState("");
  const [ingredientQ, setIngredientQ] = useState("");
  const [update, setUpdate] = useState(true);
  const [shoppingList, setSL] = useState([]);
  

  const fetchRecipes = async() => {
    try {      
      const response = await axios.get("/api/recipes");
      setRecipes(response.data.recipes);
    } catch(error) {
      setError("error retrieving recipes: " + error);
    }
  }
  
  // fetch recipes
  useEffect(() => {
    if(update){
      fetchRecipes();
      setUpdate(false);
    }
  },[update]);

  // render results
  return (
    <BrowserRouter basename="/CProject4/front-end/build/">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home recipes={recipes} name={name} setName={setName} 
                                      setError={setError} error={error} 
                                      ingredientName={ingredientName} setIngredientN={setIngredientN}
                                      ingredientQ={ingredientQ} setIngredientQ={setIngredientQ}
                                      setUpdate={setUpdate}/>} />
          <Route path="recipes" element={<Recipes name={name} setError={setError} recipes={recipes} setRecipes={setRecipes}
                                          ingredientName={ingredientName} setIngredientN={setIngredientN} 
                                          ingredientQ={ingredientQ} setIngredientQ={setIngredientQ}
                                          shoppingList={shoppingList} setSL={setSL}
                                          update={update} setUpdate={setUpdate}/>} />
          <Route path="shopping" element={<ShoppingList name={name} setError={setError} recipes={recipes} setRecipes={setRecipes}
                                          ingredientName={ingredientName} setIngredientN={setIngredientN} 
                                          ingredientQ={ingredientQ} setIngredientQ={setIngredientQ}
                                          shoppingList={shoppingList} setSL={setSL}
                                          update={update} setUpdate={setUpdate}/>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
    

  );
}

export default App;

    // <div>
    //   <Home name={name} error={error} setName={setName} ingredients={ingredients} setIngredients={setIngredients}/>
    //   <Recipes name={name} setError={setError} recipes={recipes} ingredients={ingredients} setRecipes={setRecipes}/>
    // </div>
    
    //          