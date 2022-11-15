import { useState, useEffect } from 'react';
import axios from 'axios';
import meal1 from './images/meal1.jfif'
import meal2 from './images/meal2.jfif'
import meal3 from './images/meal3.jpg'
import meal4 from './images/meal4.jpg'
import meal5 from './images/meal5.jfif'
import "./styles.css";

function Home(props) {
  
  //state
  const [currentRecipe, setcurrent] = useState("");
  
  const createIngredient = async() => {
    try {
      let recipe = await axios.post("/api/ingredients/" + currentRecipe.data.recipe.id, {iName: props.ingredientName, iQuantity: props.ingredientQ});
      props.setUpdate(true);
      console.log(recipe);
    } catch(error) {
      props.setError("error adding an ingredient" + error);
    }
  }
  
  const addIngredient = async(e) => {
    console.log("in add ingredient");
    e.preventDefault();
    await createIngredient();
    props.setIngredientN("");
    props.setIngredientQ("");
  }
  
  const createRecipe = async() => {
    try {
      let cR = await axios.post("/api/recipes", {name: props.name});
      setcurrent(cR);
      props.setUpdate(true);
    } catch(error) {
      props.setError("error adding a recipe: " + error);
    }
  }
  
  const addRecipe = async(e) => {
    setcurrent("");
    console.log("in add recipe");
    e.preventDefault();
    await createRecipe();
    props.setName("");
  }
  
    //let currentRecipe = props.recipes.find(recipe => props.name == props.recipes.name);
    //console.log(currentRecipe);
  
    return (
    <div>
      <h1 className="bigHeading">Meal Management</h1>
      <div className="home">
        <div className="images">
            <img classname="image" src={meal1} width="350" />
            <img classname="image" src={meal2} width="350" />
          </div>
        <div className="inputs">
              <div className="enterName">
                <h2>Recipe:</h2>
                <label className="inputSection">
                  <div className="input">
                    <div className="label">Name:</div>
                    <input type="text" value={props.name} onChange={e => props.setName(e.target.value)} />
                  </div>
                  <button onClick={addRecipe}>Add Recipe</button>
                </label>
              </div>
              <div className="enterI">
                <h2>Ingredient:</h2>
                <label className="inputSection">
                  <div className="input">
                    <div className="label">Name:</div>
                    <input type="text" value={props.ingredientName} onChange={(e) => {props.setIngredientN(e.target.value)} } />
                  </div>
                  <div className="input">
                  <div className="label">Quantity:</div>
                  <input type="text" value={props.ingredientQ} onChange={(e) => {props.setIngredientQ(e.target.value)} } />
                  </div>
                  <button onClick={addIngredient}>Add Ingredient</button>
                </label>
              </div>
          </div>
          <div className="images">
            <img classname="image" src={meal5} width="350" />
            <img classname="image" src={meal3} width="350" />
          </div>
      </div>
      <footer className="footer"><a href="">GitHub Link</a></footer>
    </div>
    );
}

export default Home;