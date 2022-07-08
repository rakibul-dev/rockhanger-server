const mongoose = require('mongoose')

const { ObjectId } = mongoose.Schema

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: {
          type: Number,
        },
        price: Number,
        size: String,
      },
    ],
    cartTotal: Number,
    orderdBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Cart', CartSchema)
