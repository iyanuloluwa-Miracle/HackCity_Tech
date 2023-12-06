// routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken } = require('../utils/authUtils');


// Define category routes
router.post('/category/create', verifyToken, categoryController.createCategory);
router.get('/category/list', verifyToken,categoryController.listCategories);
router.put('/category/:id', verifyToken,categoryController.editCategory);
router.delete('/category/:id',verifyToken, categoryController.deleteCategory);

module.exports = router;
