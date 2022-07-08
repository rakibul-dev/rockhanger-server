const User = require('../Models/User')
const Cart = require('../Models/Cart')
const Order = require('../Models/Order')
const Product = require('../Models/ProductModel')

exports.CreateOrUpdateUser = async (req, res) => {
  const { email, name, user_id } = req.user
  console.log(req.headers)
  // const { name } = req.body.data
  const user = await User.findOneAndUpdate(
    { email },
    { name, email, userId: user_id },
    { new: true },
  )
  if (user) {
    res.json(user)
  } else {
    const newUser = await new User({ name, email, userId: user_id }).save()
    res.json(newUser)
  }
}

exports.CurrentUser = (req, res) => {
  // console.log("user", req.user);
  const { email } = req.user
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err)
    res.json(user)
  })
}

// Create Cart
exports.CreateCart = async (req, res) => {
  const { cart } = req.body
  const { user_id } = req.user
  // console.log(req.user)
  // console.log(req.headers)
  console.log(cart)

  const user = await User.findOne({ userId: user_id }).exec()
  console.log('user', user)
  let isCartExist = await Cart.findOne({ orderdBy: user._id }).exec()
  if (isCartExist) {
    isCartExist.remove()
    console.log('old cart removed')
  }
  let products = []
  for (let index = 0; index < cart.length; index++) {
    const object = {}
    object.product = cart[index]._id
    object.count = cart[index].count
    object.size = cart[index].size
    let { price } = await Product.findById(cart[index]._id)
      .select('price')
      .exec()

    object.price = price
    products.push(object)
  }

  let cartTotal = 0
  for (let index = 0; index < products.length; index++) {
    cartTotal = cartTotal + products[index].price * products[index].count
  }

  const newcart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save()

  res.json(newcart)
}
// Get Cart
exports.GetUserCart = async (req, res) => {
  const { user_id } = req.user
  const user = await User.findOne({ userId: user_id }).exec()

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate('products.product', '_id name price')
    .exec()

  if (cart) {
    const { products, cartTotal } = cart
    res.json({ products, cartTotal })
  } else {
    res.json(false)
  }
}

// Empty cart
exports.EmptyUserCart = async (req, res) => {
  const { user_id } = req.user
  const user = await User.findOne({ userId: user_id }).exec()
  const cart = await Cart.findOneAndDelete({ orderdBy: user._id }).exec()
  res.json(cart)
}

// Add user Address
exports.UserAddress = async (req, res) => {
  const { user_id } = req.user
  const { phoneNumber, address } = req.body.data
  console.log('req. body ============>>>>>', req.body)
  const userAddress = await User.findOneAndUpdate(
    { userId: user_id },
    {
      phoneNumber: phoneNumber,
      address: address,
    },
    { new: true },
  ).exec()

  res.json(userAddress)
}

// Create Order
exports.CreateOrder = async (req, res) => {
  const { user_id } = req.user
  const user = await User.findOne({ userId: user_id }).exec()

  const cart = await Cart.findOne({ orderdBy: user._id }).exec()

  const { products, cartTotal } = cart
  console.log('products ', products)
  const order = await new Order({
    products: products,
    cartTotal: cartTotal,
    orderdBy: user._id,
  }).save()

  res.json(order)
}

// Get Orders

exports.GetOrders = async (req, res) => {
  const { user_id } = req.user
  const user = await User.findOne({ userId: user_id }).exec()

  const { _id } = user
  const orders = await Order.find({ orderdBy: _id })
    .populate('products.product')
    .exec()

  res.json(orders)
}
