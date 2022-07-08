const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const ProductScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      minlength: 3,
      text: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      index: true,
      maxlength: 3200,
      text: true,
    },
    category: {
      type: ObjectId,
      ref: 'ProductCategory',
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    sale: {
      type: Number,
      trim: true,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    stock: {
      type: Number,
      trim: true,

      minlength: 1,
      maxlength: 20,
    },

    image: {
      filename: String,
      path: String,
    },
    sold: Number,
    rating: [
      {
        star: Number,
        review: {
          type: String,
          minlength: 4,
          maxlength: 300,
          trim: true,
        },
        postedby: {
          type: ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Product', ProductScheme)
