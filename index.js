const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    // Adding one recipe
    let oneRecipe = { title:'Tiramisu', level:'Easy Peasy', cuisine:'Italian', dishType:'dessert'}
    return Recipe.create(oneRecipe)
  })
  .then(recipe => {
    console.log('A new recipe was added:', recipe.title)
    // Adding multiple recipes at once
    return Recipe.insertMany(data)
  })
  .then(recipe => {
    recipe.forEach(recipeAdded => console.log(`New recipe added : ${recipeAdded.title}`))
  // Updating a recipe
    return Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'},{duration: 100})
  })
  .then(() => {
    console.log('Recipe was successfully updated')
  // Removing a recipe
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(() => {
    console.log('Recipe was successfully removed')
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  // Closing the connection
  mongoose
    .connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0)
    })