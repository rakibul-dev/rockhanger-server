const express = require('express')
const router = express.Router()

// Imported middlewares
const { AuthCheck } = require('../Middlewares/AuthMiddleWar')
const { AdminAuthMiddleWare } = require('../Middlewares/AdminAuthMiddleWare')
// Imported Controllers
// ok
const {
  CreateProductCategory,
  GetProductCategories,
  UpdateProductCategory,
  DeleteProductCategory,
} = require('../Controllers/ProductCategoryController')

// CreateProduct category
router.post(
  '/create-product-category',
  AuthCheck,
  AdminAuthMiddleWare,
  CreateProductCategory,
)
// Read all product category
router.get(
  '/get-all-category',
  // AuthCheck,
  // AdminAuthMiddleWare,
  GetProductCategories,
)
// Update Product category
router.put('/update-product-category/:id', UpdateProductCategory)
// Delete Product  category
router.delete(
  '/delete-product-category/:id',
  AuthCheck,
  AdminAuthMiddleWare,
  DeleteProductCategory,
)
module.exports = router
