const express = require('express')
const router = express.Router()

// Import controllers
const {
  CreateOrUpdateUser,
  CurrentUser,
  CreateCart,
  GetUserCart,
  UserAddress,
  EmptyUserCart,
  CreateOrder,
  GetOrders,
} = require('../Controllers/UserController')
// import Middlewares
const { AuthCheck } = require('../Middlewares/AuthMiddleWar')

// // Routes

router.post('/create-or-update-user', AuthCheck, CreateOrUpdateUser)
router.post('/currentuser', AuthCheck, CurrentUser)

//Create Cart
router.post('/user/cart', AuthCheck, CreateCart)
//
router.get('/get-user/cart', AuthCheck, GetUserCart)
// Delete Cart
router.delete('/delete-user/cart', AuthCheck, EmptyUserCart)
// Save address
router.put('/addres-user/clent', AuthCheck, UserAddress)

// Create order
router.post('/create-order/user', AuthCheck, CreateOrder)

router.get('/get-orders/user', AuthCheck, GetOrders)
module.exports = router
