const Order = require('../Models/Order')

exports.UpdateOrderStatus = async (req, res) => {
  const { user_id } = req.user
  const { _id, status } = req.body

  const updatedOrderStatus = await Order.findByIdAndUpdate(
    { _id },
    {
      orderStatus: status,
    },
    { new: true },
  ).exec()
  res.json(updatedOrderStatus)
  console.log(updatedOrderStatus)
}

exports.GetAllOrdersAdmion = async (req, res) => {
  const Orders = await Order.find({}).sort('createdAt').populate().exec()
  res.json(Orders)
}
