import axios from 'axios';
import { useState } from 'react';
import Ingredient from './Ingredient';

function Recipe(props) {
    
  const [ingredients, setIngredients] = useState([]);
  
  const deleteRecipe = async(id)=> {
    try {
      await axios.delete("/api/recipes/" + id);
      props.setUpdate(true);
    }
    catch(error) {
      props.setError("error deleting recipe: " + error); 
    }
  }
  
    const viewRecipe = async(id)=> {
        try {
          const response = await axios.get("/api/ingredients/" + id);
          setIngredients(response.data);
          props.setUpdate(true);
        }
        catch(error) {
          props.setError("error getting ingredients: " + error); 
        }
      }
    
    const addToList = async(id) => {
       try {
          const response = await axios.get("/api/ingredients/" + id);
          for(let i = 0; i < response.data.length; i++){
            props.setSL(previous => [...previous, response.data[i]]);
          }
        }
        catch(error) {
          props.setError("error adding to Shopping List: " + error); 
        }
    }
    
    return (
          <div className="oneRecipe">
            <p className="recipeName">{props.recipe.name}</p>
            {ingredients.map( ingredient => (
              <div key={ingredient._id} className="ingredient">
                  <Ingredient ingredient={ingredient} setError={props.setError} setUpdate={props.setUpdate} ingredientID={ingredient._id}/>
              </div>
            ))} 
            <div><button className="btn1" onClick={() => viewRecipe(props.recipe.id)}>View Recipe</button></div>
            <div><button className="btn2" onClick={() => addToList(props.recipe.id)}>Add to Shopping List</button></div>
            <div><button className="btn3" onClick={() => deleteRecipe(props.recipe.id)}>Delete</button></div>
          </div>
    );
}

export default Recipe;