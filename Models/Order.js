const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: 'Product',
        },
        count: Number,
        size: String,
      },
    ],
    orderStatus: {
      type: String,
      default: 'Not processing',
      enum: [
        'Not processing',
        'Processing',
        'Canceld',
        'Deliverd',
        'Completed',
      ],
    },
    orderdBy: {
      type: ObjectId,
      ref: 'User',
    },
    cartTotal: {
      type: Number,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Order', OrderSchema)
