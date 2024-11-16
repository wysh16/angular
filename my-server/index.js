const express = require('express');
const app = express();
const port = 3000;

const db = require('./config/db');
db.connect();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Import các route
const productController = require('./controllers/product.controller');

app.get('/', (req, res) => {
  res.send('Ok');
});

// Route lấy tất cả các danh mục sản phẩm (distinct)
app.get('/categories', productController.getCategories);

// Route lấy sản phẩm theo danh mục hoặc lọc theo giá
app.get('/products', productController.getProducts);

// Route lấy chi tiết sản phẩm theo ID
app.get('/products/:id', productController.getProductDetail);

// Import các route giỏ hàng
const cartRoutes = require('./routes/cart.routes'); 

// Sử dụng routes giỏ hàng
app.use('/cart', cartRoutes);


const mealRoutes = require('./routes/meal.routes');
app.use('/meal', mealRoutes);


const mealplanRoutes = require('./routes/mealplan.routes');
app.use('/meal-plan', mealplanRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
