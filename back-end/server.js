const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var Double = require("mongodb").Double;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//subSchema ingredient
const ingredientSchema = new mongoose.Schema({
  iName: {
    type: String
  },
  iQuantity: {
    type: String
  },
});

//schema for recipe
const recipeSchema = new mongoose.Schema({
    name : {
       type : String
    },
    ingredients : [ingredientSchema]
});

//converts _id into id
recipeSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

ingredientSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
 
 //when documents are serialized into JSON objects, virtual properties are included 
 recipeSchema.set('toJSON', {
  virtuals: true
});
 ingredientSchema.set('toJSON', {
  virtuals: true
});

//create a model for recipe using the schema
const Recipe = mongoose.model('Recipe', recipeSchema);
const Ingredient = mongoose.model('Ingredient', ingredientSchema);

//get recipes
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send({recipes: recipes});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//adds recipes to database
app.post('/api/recipes', async (req, res) => {
    const recipe = new Recipe({
    name: req.body.name,
    ingredients: []
  });
  try {
    await recipe.save();
    res.send({recipe: recipe});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
  
//deletes recipes
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//add ingredients
app.post('/api/ingredients/:RecipeId', async (req, res) => {
    try {
        await Recipe.findOne({_id: req.params.RecipeId})
        const recipe = await Recipe.findOneAndUpdate(
          {"_id": req.params.RecipeId}, 
          {"$push": {ingredients:
            {"iName": req.body.iName,
            "iQuantity": req.body.iQuantity}
            }
          }, {new:true})

        if (!recipe){
            return res.status(404).json({})}
        else
            return res.status(200).json(recipe)
    } catch (error) {
        return res.status(500).json({"error":error})
    }
});
//https://stackoverflow.com/questions/66401694/how-should-i-store-data-in-subschemas-in-mongodb-and-node-js

//get ingredients works
app.get('/api/ingredients/:id', async (req, res) => {
    try {
        const id = req.params.id 
        const recipe = await Recipe.findOne({_id: id})
        let recipeIngredients = [];
        for (let index = 0; index < recipe.ingredients.length; index++) {
          recipeIngredients.push(recipe.ingredients[index]);
        }
        return res.status(200).json(recipeIngredients);
    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

app.listen(3000, () => console.log('Server listening on port 3000!'));
