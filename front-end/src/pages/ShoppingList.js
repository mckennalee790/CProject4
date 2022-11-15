import axios from 'axios';
import { useState, useEffect } from 'react';
import Ingredient from './Ingredient';

function ShoppingList(props) {
    
    const clearList = async() => {
        props.setSL([]);
        console.log("in clearList");
    }
    
    return (
        <div className="shopPage">
            <h1 className="midHeading">Shopping List</h1>
                <div className ="shopList">
                    {props.shoppingList.map( ingredient => (
                      <div key={ingredient._id} className="ingredient">
                          <Ingredient ingredient={ingredient} setError={props.setError} setUpdate={props.setUpdate} ingredientID={ingredient._id}/>
                      </div>
                    ))} 
                </div>
            <button className="clearBtn" onClick={clearList}>Clear List</button>
        </div>
    );
}

export default ShoppingList;