import Recipe from './Recipe';

function Recipes(props) {
    
    return (
    <div>
      <h1 className="midHeading">Recipes</h1>
      <div className="allRecipes">
          {props.recipes.map( recipe => (
            <div key={recipe.id} className="recipe">
                <Recipe recipe={recipe} setError={props.setError} setUpdate={props.setUpdate} recipeID={recipe.id} 
                shoppingList={props.shoppingList} setSL={props.setSL}/>
            </div>
          ))}  
      </div>
    </div>
    );
}

export default Recipes;

//