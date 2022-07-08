const express = require('express')
const rand = require('random-key')
const multer = require('multer')
const router = express.Router()
const {
  CreateProduct,
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
  GetSingleProduct,
} = require('../Controllers/ProductController')

// const upload = multer({ dest: '../public/images' }).single('demo_image')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    cb(null, rand.generate(10) + Date.now() + file.originalname)
  },
})
var upload = multer({ storage: storage })

// MiddleWares
const { AuthCheck } = require('../Middlewares/AuthMiddleWar')
const { AdminAuthMiddleWare } = require('../Middlewares/AdminAuthMiddleWare')

// Create product
router.post(
  '/create-product',
  AuthCheck,
  AdminAuthMiddleWare,
  upload.single('file'),
  CreateProduct,
)

// Read Product
router.get('/get-product/:id', GetSingleProduct)

// Read All Product
router.get('/get-all-products', GetAllProducts)

// Update Product
router.put(
  '/update-product/:id',
  AuthCheck,
  AdminAuthMiddleWare,
  upload.single('file'),
  UpdateProduct,
)

// Delete Product
router.delete(
  '/delete-product/:id',
  AuthCheck,
  AdminAuthMiddleWare,
  DeleteProduct,
)

module.exports = router
