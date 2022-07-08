const Product = require('../Models/ProductModel')
// Create PRoduct

// Price: '100',
// SalePrice: '0',
// Stock: '100',
// ProductName: 'New Product',
// ProductCategory: '62b8e924cf76ce820921acaa',
// Details: 'This is new product description'
exports.CreateProduct = async (req, res) => {
  const {
    Price,
    SalePrice,
    Stock,
    ProductName,
    Details,
    ProductCategory,
  } = req.body
  console.log(req.file)
  console.log(req.body)

  try {
    const Products = await new Product({
      name: ProductName,
      slug: ProductName,
      description: Details,
      category: ProductCategory,
      price: Price,
      stock: Stock,
      sale: SalePrice,
      image: {
        filename: req.file.filename,
        path: req.file.path,
      },
    }).save()
    //   .populate('ProductCategory')
    // Products = await Product.populate('category').execPopulate()
    // res.json(Products)

    Product.populate(Products, { path: 'category' }, function (
      err,
      CreatedProduct,
    ) {
      res.json(CreatedProduct)
    })
    // console.log(Product)
    // res.json(Products)
  } catch (error) {
    res.json(error)
  }
}

// Get Single Product
exports.GetSingleProduct = async (req, res) => {
  const { id } = req.params
  try {
    const gotProduct = await Product.findById(id)
    res.json(gotProduct)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}

// Get All Product
exports.GetAllProducts = async (req, res) => {
  try {
    const AllProducts = await Product.find().populate('category')
    res.json(AllProducts)
  } catch (error) {
    res.json(error)
  }
}

// Update PRoduct
exports.UpdateProduct = async (req, res) => {
  const { id } = req.params
  console.log(req.body)
  console.log(id)
  const {
    Price,
    SalePrice,
    Stock,
    ProductName,
    Details,
    ProductCategory,
    ImagePath,
    filename,
  } = req.body

  const isFileExist = () => {
    if (req.file === undefined) {
      const filedetails = {
        path: ImagePath,
        filename: filename,
      }
      return filedetails
    } else {
      const filedetails = {
        path: req.file.path,
        filename: req.file.filename,
        console: console.log('file recived man'),
      }
      return filedetails
    }
  }
  isFileExist()
  console.log(isFileExist().filename)
  try {
    const UpdatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: ProductName,
        slug: ProductName,
        description: Details,
        category: ProductCategory,
        price: Price,
        stock: Stock,
        sale: SalePrice,
        image: {
          filename: isFileExist().filename,
          path: isFileExist().path,
        },
      },
      // { new: true },
    ).exec()

    Product.populate(UpdatedProduct, { path: 'category' }, function (
      err,
      ResUpdatedProduct,
    ) {
      res.json(ResUpdatedProduct)
    })
    // .populate('category')

    // res.send(UpdatedProduct)
  } catch (error) {
    res.json(error)
  }
}

// Delete Product
exports.DeleteProduct = async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const DeletedProduct = await Product.findByIdAndDelete(id).exec()
    res.json(DeletedProduct)
  } catch (error) {
    res.json(error)
  }
}
