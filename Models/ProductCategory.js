const mongoose = require('mongoose')

const ProductCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      minlength: 2,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      maxlength: 50,
      minlength: 2,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      maxlength: 50,
      minlength: 2,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      maxlength: 50,
      minlength: 2,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('ProductCategory', ProductCategorySchema)
