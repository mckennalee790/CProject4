import axios from 'axios';
import { useState, useEffect } from 'react';

function Ingredient(props) {
    
    return (
        <div className="ingredients">
           <ul>{props.ingredient.iQuantity} {props.ingredient.iName}</ul>
        </div>
    );
}

export default Ingredient;