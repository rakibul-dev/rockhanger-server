const mongoose = require('mongoose')
const { ObjectId } = mongoose

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: String,
    },
    role: {
      type: String,
      default: 'customer',
    },
    // cart: {
    //   type: Array,
    //   default: [],
    //   ref: 'Product',
    // },
    cart: [
      {
        product: { type: ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        price: { type: Number },
      },
    ],
    wishlist: {
      type: ObjectId,
      ref: 'Product',
    },
    //   wishlist: {
    //     type: ObjectId,
    //     ref: "Product",
    //   },
    address: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      minlength: 11,
      maxlength: 11,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
