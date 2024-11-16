

const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');

router.post('/meal-plan', mealController.getMealPlan);

module.exports = router;
