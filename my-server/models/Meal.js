// models/meal.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  mealType: { type: String, required: true },
  mealName: { type: String, required: true },
  mealCalories: { type: Number, required: true },
  mealIngredients: { type: String, required: true },
  mealImage: { type: String, required: true },
  mealRecipe: { type: String, required: true }
});

module.exports = mongoose.model('Meal', mealSchema);

