const ProductCategory = require('../Models/ProductCategory')
const slugify = require('slugify')

// Price: '100',
// SalePrice: '0',
// Stock: '100',
// ProductName: 'New Product',
// ProductCategory: '62b8e924cf76ce820921acaa',
// Details: 'This is new product description'

// Create Product Category
exports.CreateProductCategory = async (req, res) => {
  const { name } = req.body.data
  console.log(req.body)
  // const slug = slugify(name)

  try {
    const category = await new ProductCategory({
      name: name,
      slug: slugify(name),
      label: name,
      value: name,
    }).save()
    res.json(category)
  } catch (error) {
    res
      .status(404, '"Product category create failed or already exist"')
      .json('Product category create failed or already exist')
  }
}

// Read All Product Categories
exports.GetProductCategories = async (req, res) => {
  try {
    const Allcategory = await ProductCategory.find()
    res.send(Allcategory)
  } catch (error) {
    res.json(error)
  }
}

// Update Product Category
exports.UpdateProductCategory = async (req, res) => {
  const { id } = req.params
  const { data } = req.body
  // console.log('product category id ===>', req)
  // console.log('product category body ===>', req.body)
  const slug = slugify(data)
  try {
    const UpdatedProductCategory = await ProductCategory.findByIdAndUpdate(
      id,
      {
        name: data,
        label: data,
        value: data,
        slug: data,
      },
      { new: true },
    )
    res.send(UpdatedProductCategory)
  } catch (error) {
    res.json(error)
  }
}

// Delete Product Category
exports.DeleteProductCategory = async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const deletedCategory = await ProductCategory.findByIdAndDelete(id).exec()
    res.json(deletedCategory)
    console.log(deletedCategory)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}
