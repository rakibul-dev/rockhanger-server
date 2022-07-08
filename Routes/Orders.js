const express = require('express')

const router = express.Router()

const { AdminAuthMiddleWare } = require('../Middlewares/AdminAuthMiddleWare')
const { AuthCheck } = require('../Middlewares/AuthMiddleWar')
const {
  UpdateOrderStatus,
  GetAllOrdersAdmion,
} = require('../Controllers/OrderController')
router.put(
  '/update-order/status',
  AuthCheck,
  AdminAuthMiddleWare,
  UpdateOrderStatus,
)

router.get(
  '/get-all-orders/admin',
  AuthCheck,
  AdminAuthMiddleWare,
  GetAllOrdersAdmion,
)

module.exports = router
