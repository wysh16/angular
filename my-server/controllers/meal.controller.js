// controllers/mealController.js

const Meal = require('../models/Meal')

// Thêm một thực đơn mới
// exports.createMeal = async (req, res) => {
//   const meal = new Meal(req.body);
//   try {
//     const savedMeal = await meal.save();
//     res.status(201).json(savedMeal);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


// exports.createMeal = async (req, res) => {
//   try {
//     const newMeal = new Meal(req.body);
//     await newMeal.save();
//     res.status(201).json(newMeal);
//   } catch (err) {
//     console.error('Error creating meal:', err); // Log lỗi để theo dõi
//     res.status(400).json({ message: err.message });
//   }
// };

exports.createMeal = async (req, res) => {
  try {
    const { mealType, mealName, mealCalories, mealIngredients, mealImage, mealRecipe } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!mealType || !mealName || !mealCalories || !mealIngredients || !mealImage || !mealRecipe) {
      return res.status(400).json({ message: 'Missing required meal information' });
    }

    const newMeal = new Meal(req.body);
    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (err) {
    console.error('Error creating meal:', err); // Log lỗi để theo dõi
    res.status(400).json({ message: err.message });
  }
};



// Lấy tất cả thực đơn
exports.getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lấy tất cả các mealIngredients duy nhất
exports.getUniqueIngredients = async (req, res) => {
  try {
    const meals = await Meal.find();
    const ingredientsSet = new Set();

    meals.forEach(meal => {
      const ingredients = meal.mealIngredients.split('\n');
      ingredients.forEach(ingredient => ingredientsSet.add(ingredient.trim()));
    });

    const uniqueIngredients = Array.from(ingredientsSet);
    res.json(uniqueIngredients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



// exports.getMealPlan = async (req, res) => {
//   try {
//     const { dailyCalories, excludeIngredients, days } = req.body;

//     // Lấy tất cả các bữa ăn từ cơ sở dữ liệu
//     const meals = await Meal.find();

//     // Lọc các bữa ăn không chứa nguyên liệu không mong muốn
//     const filteredMeals = meals.filter(meal => {
//       const ingredients = meal.mealIngredients.split('\n').map(i => i.trim());
//       return !excludeIngredients.some(ingredient => ingredients.includes(ingredient));
//     });

//     // Tạo tất cả các kết hợp của 3 bữa ăn
//     const mealCombinations = [];
//     for (let i = 0; i < filteredMeals.length; i++) {
//       for (let j = i + 1; j < filteredMeals.length; j++) {
//         for (let k = j + 1; k < filteredMeals.length; k++) {
//           mealCombinations.push([filteredMeals[i], filteredMeals[j], filteredMeals[k]]);
//         }
//       }
//     }

//     // Tìm ra kết hợp 3 bữa có tổng calo gần nhất với dailyCalories
//     let bestCombination = null;
//     let minDifference = Infinity;

//     mealCombinations.forEach(combination => {
//       const totalCalories = combination.reduce((sum, meal) => sum + meal.mealCalories, 0);
//       const difference = Math.abs(totalCalories - dailyCalories);

//       if (difference < minDifference) {
//         minDifference = difference;
//         bestCombination = combination;
//       }
//     });

//     // Xử lý số ngày
//     const mealPlan = bestCombination ? bestCombination : [];
//     const mealPlanForDays = [];
//     for (let i = 0; i < days; i++) {
//       mealPlanForDays.push(...mealPlan);
//     }

//     res.json({ mealPlans: mealPlanForDays });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };




// exports.getMealPlan = async (req, res) => {
//   try {
//     const { goal, excludedIngredients, days } = req.body;

//     console.log('Request body:', req.body); // Kiểm tra dữ liệu nhận được từ frontend

//     const dailyCalories = calculateCaloriesBasedOnGoal(goal); // Tính toán lượng calo

//     const meals = await Meal.find({
//       calories: { $lte: dailyCalories / 3 }, // Tìm bữa ăn phù hợp
//       ingredients: { $nin: excludedIngredients }, // Lọc nguyên liệu không mong muốn
//     }).limit(3 * days);

//     console.log('Meals fetched:', meals); // Xem kết quả truy vấn cơ sở dữ liệu

//     if (!meals || meals.length === 0) {
//       return res.status(404).json({ message: 'No suitable meals found' });
//     }

//     res.json({ mealPlans: meals });
//   } catch (err) {
//     console.error('Error in getMealPlan:', err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


exports.getMealPlan = async (req, res) => {
  try {
    const { goal, excludedIngredients, days, dailyCalories } = req.body;

    if (!goal || !excludedIngredients || !days || !dailyCalories) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    // 1. Lấy tất cả món ăn từ MongoDB và loại bỏ món chứa nguyên liệu bị loại trừ
    const meals = await Meal.find({
      mealIngredients: { $not: { $regex: excludedIngredients.join('|'), $options: 'i' } },
    });

    // 2. Phân loại món ăn theo bữa (sáng, trưa, tối)
    const breakfastMeals = meals.filter(meal => meal.mealType === 'Bữa sáng');
    const lunchMeals = meals.filter(meal => meal.mealType === 'Bữa trưa');
    const dinnerMeals = meals.filter(meal => meal.mealType === 'Bữa tối');

    if (!breakfastMeals.length || !lunchMeals.length || !dinnerMeals.length) {
      return res.status(404).json({ message: 'Không đủ món ăn phù hợp cho thực đơn' });
    }

    // 3. Tạo thực đơn theo số ngày yêu cầu
    // const mealPlan = [];
    // for (let i = 0; i < days; i++) {
    //   mealPlan.push({
    //     day: i + 1,
    //     breakfast: getRandomMeal(breakfastMeals),
    //     lunch: getRandomMeal(lunchMeals),
    //     dinner: getRandomMeal(dinnerMeals),
    //   });
    // }

    const mealPlan = [];
    for (let i = 0; i < days; i++) {
      const breakfast = getClosestMeal(breakfastMeals, dailyCalories / 3);
      const lunch = getClosestMeal(lunchMeals, dailyCalories / 3);
      const dinner = getClosestMeal(dinnerMeals, dailyCalories / 3);
      
      mealPlan.push({
        day: i + 1,
        breakfast,
        lunch,
        dinner,
      });
    }

    res.status(200).json({ goal, days, mealPlan });
  } catch (error) {
    console.error('Error creating meal plan:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Hàm tìm bữa ăn có tổng calo gần nhất với calo mục tiêu
function getClosestMeal(meals, targetCalories) {
  let closestMeal = null;
  let closestDifference = Infinity;

  meals.forEach(meal => {
    const difference = Math.abs(meal.mealCalories - targetCalories);
    if (difference < closestDifference) {
      closestDifference = difference;
      closestMeal = meal;
    }
  });

  return closestMeal;
}


