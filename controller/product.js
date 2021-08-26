const Product = require('../models/product')

//get
const getProducts = (req, resp, next) => {
  Product.find({}, (err, products) => {
    if (err) return resp.status(500).send({ message: `Error with product findById: ${err}`})
    if (!products) return res.status(404).send({ message: `There are not products.` })
    resp.send(200, { products })
  })
  
}

// get by Id 
const getProductId = (req, resp, next) => {
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
      if (err) return resp.status(500).send({ message: `Error with product findById: ${err}`})
      if (!product) return resp.status(404).send({ message: `The product doesn't exist.` })

      resp.status(200).send({ product })

    })
}

//post
const createProduct = async (req, resp, next) => {
  let product = {
    name : req.body.name,
    price : req.body.price,
    image : req.body.image,
    type : req.body.type,
    dateEntry : new Date()
  }

  Product.create(product, (err, productStored) => { //cuando se almacene, mongodb le adiciona un id
    if (Object.entries(req.body).length === 0) return next(400);
    else { resp.status(200).send( productStored ) }
  }) 
}

//put
const updateProduct = (req, resp, next) => {
  let productId = req.params.productId
  let bodyUpdated = req.body
  // son 2 argumentos, el 2do es un objeto con los campos que deseo actualizar
  Product.findByIdAndUpdate(productId, bodyUpdated, (err, productUpdated) => {
    if (err) resp.status(500).send({ message: `There is a mistake trying to update the product: ${err}` })

    resp.status(200).send({ product: productUpdated })
  })
}

//delete
const deleteProduct = (req, resp, next) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) resp.status(500).send({ message: `There is a mistake trying to delete the product: ${err}` })
    
    product.remove(err => {
      if (err) resp.status(500).send({ message: `There is a mistake trying to delete the product: ${err}` })
      resp.status(200).send({ message: 'The product has been removed succesfully.' })
    })
  })
}

module.exports = {
    getProducts,
    getProductId,
    createProduct,
    updateProduct,
    deleteProduct
}